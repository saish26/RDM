import "@/styles/globals.css";
import type { AppProps } from "next/app";
//import Layout from "../layouts/HomeLayout";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps | any) {
  // const getLayout = Component.getLayout ?? ((page) => page)
  const router = useRouter(); 
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <main>
     
      <MantineProvider>
        <Notifications />
        <div>{getLayout(<Component {...pageProps} />)}</div>
      </MantineProvider>
    </main>
  );
}
