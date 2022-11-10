/**
 * file: pages/_app.tsx
 * description: file responsible for the application's configuration
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';

import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  session: Session;
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const {
    Component,
    session,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <CssBaseline />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
