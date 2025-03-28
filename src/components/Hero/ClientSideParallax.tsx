import React, { useState, useEffect } from 'react';

const ClientSideParallax: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxLayers = [
    { speed: 0.1, opacity: 0.7 },
    { speed: 0.2, opacity: 0.5 },
    { speed: 0.3, opacity: 0.3 }
  ];

  return (
    <>
      {parallaxLayers.map((layer, index) => (
        <div 
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${50 + Math.cos(index * 0.5) * 20}%`,
            transform: `translate(
              ${(mousePosition.x / window.innerWidth - 0.5) * layer.speed * -50}px, 
              ${(mousePosition.y / window.innerHeight - 0.5) * layer.speed * -50}px
            )`,
            opacity: layer.opacity,
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,100,255,0.3), rgba(100,0,255,0.1))',
            filter: 'blur(80px)',
            zIndex: -1
          }}
        />
      ))}
    </>
  );
};

export default ClientSideParallax;
