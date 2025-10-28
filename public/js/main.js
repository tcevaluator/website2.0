// Main JavaScript for TCEvaluator

// Particles background using vanilla JS
function initParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    initParticlesArray();
  }

  function initParticlesArray() {
    particles = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() * - 0.5) * 1,
        size: Math.random() * 4 + 2
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      // Draw particle
      ctx.fillStyle = 'rgba(6, 216, 220, 0.6)';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x;
        const dy = particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          ctx.strokeStyle = `rgba(9, 174, 177, ${0.5 * (1 - distance / 200)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });

    animationId = requestAnimationFrame(drawParticles);
  }

  resize();
  drawParticles();

  window.addEventListener('resize', resize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}

// Video modal functionality
function initVideoModal() {
  const videoTriggers = document.querySelectorAll('[data-video-trigger]');
  const videoModal = document.getElementById('video-modal');
  const videoClose = document.getElementById('video-close');
  const videoIframe = document.getElementById('video-iframe');

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const videoUrl = trigger.getAttribute('data-video-url');
      if (videoIframe && videoUrl) {
        videoIframe.src = videoUrl;
      }
      if (videoModal) {
        videoModal.classList.remove('hidden');
        videoModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeVideo() {
    if (videoModal) {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
      document.body.style.overflow = 'unset';
    }
    if (videoIframe) {
      videoIframe.src = '';
    }
  }

  if (videoClose) {
    videoClose.addEventListener('click', closeVideo);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideo();
      }
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 0;
        const bannerHeight = document.getElementById('promo-banner')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight - bannerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Form submission handler for Supabase
async function handleFormSubmit(formId, edgeFunctionName) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn?.textContent;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const supabaseUrl = form.getAttribute('data-supabase-url');
      const supabaseKey = form.getAttribute('data-supabase-key');

      const response = await fetch(`${supabaseUrl}/functions/v1/${edgeFunctionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to success page if it exists
        const successUrl = form.getAttribute('data-success-url');
        if (successUrl) {
          window.location.href = successUrl;
        } else {
          alert('Form submitted successfully!');
          form.reset();
        }
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// Phone number formatting
function formatPhoneNumber(input) {
  const cleaned = input.value.replace(/\D/g, '');
  let formatted = '';

  if (cleaned.length > 0) {
    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  }

  input.value = formatted;
}

function initPhoneFormatting() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => formatPhoneNumber(input));
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initVideoModal();
  initSmoothScroll();
  initScrollAnimations();
  initPhoneFormatting();

  // Initialize particles on home page
  if (document.getElementById('particles-container')) {
    initParticles('particles-container');
  }

  // Initialize particles on stats section
  if (document.getElementById('particles-stats')) {
    initParticles('particles-stats');
  }
});
