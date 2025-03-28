export const protectCursor = () => {
  // Ensure cursor is always visible
  const resetCursor = () => {
    document.body.style.cursor = 'default';
    
    // Force cursor on all elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      // Preserve interactive element cursors
      if (
        el.tagName === 'A' || 
        el.tagName === 'BUTTON' || 
        el.tagName === 'INPUT' || 
        el.tagName === 'TEXTAREA' || 
        el.tagName === 'SELECT' ||
        el.hasAttribute('data-clickable')
      ) {
        (el as HTMLElement).style.cursor = 'pointer';
      } else {
        (el as HTMLElement).style.cursor = 'default';
      }
    });
  };

  // Run on initial load
  resetCursor();

  // Protect against cursor hiding
  const preventCursorHiding = (e: Event) => {
    const target = e.target as HTMLElement;
    
    // Prevent cursor from being hidden
    if (target.style.cursor === 'none') {
      target.style.cursor = 'default';
    }
  };

  // Add event listeners
  document.addEventListener('mouseover', resetCursor);
  document.addEventListener('mouseenter', preventCursorHiding);

  // Clean up function
  return () => {
    document.removeEventListener('mouseover', resetCursor);
    document.removeEventListener('mouseenter', preventCursorHiding);
  };
};
