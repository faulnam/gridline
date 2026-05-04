import { useEffect, useState } from 'react';

export function useScrollEffect() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

export function useParallax(speed = 0.5) {
  const scrollY = useScrollEffect();
  return scrollY * speed;
}

export function use3DScroll(ref, options = {}) {
  const { 
    rotateX = 15, 
    rotateY = 15, 
    scale = 1.05,
    perspective = 1000 
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateXValue = ((y - centerY) / centerY) * rotateX;
      const rotateYValue = ((centerX - x) / centerX) * rotateY;
      
      element.style.transform = `
        perspective(${perspective}px) 
        rotateX(${rotateXValue}deg) 
        rotateY(${rotateYValue}deg) 
        scale(${scale})
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, rotateX, rotateY, scale, perspective]);
}
