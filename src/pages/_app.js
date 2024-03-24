import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
  <SessionProvider session={pageProps.session}>
    <Navbar />
    <Component {...pageProps} />
  </SessionProvider>
  )
  // return <Component {...pageProps} />;
}