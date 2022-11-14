import { Session } from "next-auth";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Head from "next/head";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CometChatProvider } from "../context/CometChatContext";
import { PataThemeProvider } from "../components/PataThemeProvider";


const queryClient = new QueryClient();



export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
          <PataThemeProvider>
            <CometChatProvider>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </CometChatProvider>
          </PataThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
