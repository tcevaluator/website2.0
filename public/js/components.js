// Shared Navigation Component
function createNavigation(activeLink = '') {
  const bannerVisible = !sessionStorage.getItem('promoBannerDismissed');

  return `
    ${bannerVisible ? `
    <div id="promo-banner" class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3">
      <div class="max-w-7xl mx-auto flex items-center justify-center">
        <div class="flex items-center gap-2">
          <svg class="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
          </svg>
          <p class="text-sm font-medium">
            <span class="hidden sm:inline">NACADA Conference Special: </span>
            Save up to $2,000 on setup fees!
            <a href="/nacada.html" class="underline font-semibold hover:text-blue-100">Learn more</a>
          </p>
        </div>
      </div>
    </div>
    ` : ''}

    <nav id="main-nav" class="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg shadow-sm" style="top: ${bannerVisible ? '48px' : '0px'}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <a href="/index.html" class="flex-shrink-0">
            <img src="/logo.svg" alt="TCEvaluator" class="h-8">
          </a>

          <div class="hidden md:flex items-center space-x-8">
            <a href="/index.html" class="${activeLink === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-medium">Home</a>
            <a href="/about.html" class="${activeLink === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-medium">About</a>
            <a href="/pricing.html" class="${activeLink === 'pricing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-medium">Pricing</a>
            <a href="/contact.html" class="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">Contact Us</a>
          </div>

          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 z-50 md:hidden transition-transform duration-500 ease-out translate-x-full height100">
        <div class="h-full w-full flex flex-col">
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <a href="/index.html">
              <img src="/logo.svg" alt="TCEvaluator" class="h-8 brightness-0 invert">
            </a>
            <button id="mobile-menu-close" class="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-6 py-12">
            <div class="space-y-2">
              <a href="/index.html" class="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-semibold text-white">Home</span>
                  <svg class="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
              <a href="/about.html" class="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-semibold text-white">About</span>
                  <svg class="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
              <a href="/pricing.html" class="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-semibold text-white">Pricing</span>
                  <svg class="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            </div>

            <div class="mt-12 space-y-4">
              <a href="/contact.html" class="group flex items-center justify-between w-full bg-white text-gray-900 px-8 py-5 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg">
                <span>Contact Us</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="p-6 border-t border-white/10">
            <div class="grid grid-cols-3 gap-4 text-center">
              <a href="/privacy.html" class="text-white/60 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="/terms.html" class="text-white/60 hover:text-white transition-colors text-sm">Terms</a>
              <a href="/security.html" class="text-white/60 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
}

// Shared Footer Component
function createFooter() {
  return `
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="col-span-1 md:col-span-2">
            <img src="/logo.svg" alt="TCEvaluator" class="h-8 mb-4 brightness-0 invert">
            <p class="text-gray-400 leading-relaxed">
              AI-powered transfer credit evaluation platform designed for modern higher education institutions.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Product</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="/about.html" class="hover:text-white transition-colors">About</a></li>
              <li><a href="/pricing.html" class="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/contact.html" class="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="/privacy.html" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms.html" class="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TCEvaluator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

// Initialize components on page load
function initializeComponents(activeLink = '') {
  // Inject navigation
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = createNavigation(activeLink);
    initializeNavigation();
  }

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = createFooter();
  }
}

// Navigation interactions
function initializeNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  function openMobileMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.style.overflow = 'unset';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking on links
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Handle scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const nav = document.getElementById('main-nav');

    if (currentScroll > 20) {
      nav?.classList.add('bg-white/80', 'backdrop-blur-lg', 'shadow-sm');
    } else {
      nav?.classList.remove('bg-white/80', 'backdrop-blur-lg', 'shadow-sm');
    }

    lastScroll = currentScroll;
  });
}
