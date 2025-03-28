import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { protectCursor } from '../utils/cursorProtection';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Apply cursor protection
    const cleanup = protectCursor();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
