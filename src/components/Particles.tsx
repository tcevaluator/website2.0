import { useCallback, useEffect, useState } from 'react';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';

interface ParticlesProps {
  className?: string;
}

function Particles({ className = '' }: ParticlesProps) {
  const [, setContainer] = useState<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    setContainer(container);
  }, []);

  useEffect(() => {
    const loadParticles = async () => {
      const { tsParticles } = await import('tsparticles-engine');
      await particlesInit(tsParticles);

      const container = await tsParticles.load({
        id: 'tsparticles',
        options: {
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#3b82f6',
            },
            links: {
              color: '#3b82f6',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        },
      });

      await particlesLoaded(container);
    };

    loadParticles();
  }, [particlesInit, particlesLoaded]);

  return <div id="tsparticles" className={className} />;
}

export default Particles;
