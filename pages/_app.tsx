import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Supabase
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

// Mantine
import { MantineProvider } from '@mantine/core';

import { useState } from 'react';

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionContextProvider>
  );
}
