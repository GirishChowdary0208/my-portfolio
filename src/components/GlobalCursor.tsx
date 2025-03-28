import React, { useState, useEffect } from 'react';

export const FuturisticCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      console.log('Cursor Position:', e.clientX, e.clientY);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      console.log('Mouse entered');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      console.log('Mouse left');
    };

    // Add event listeners to the entire document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Log initial state
    console.log('Cursor Component Mounted');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      id="debug-cursor"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: isVisible ? 'block' : 'none',
        opacity: 0.7
      }}
    />
  );
};

export const GlobalCursorStyles = () => (
  <style jsx global>{`
    * {
      cursor: default !important;
    }
    body, html {
      cursor: default !important;
    }
  `}</style>
);
