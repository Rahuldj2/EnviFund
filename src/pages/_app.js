import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import Navbar from "@/components/Navbar";
import { MoralisProvider } from "react-moralis";
import { createContext } from "react";


export default function App({ Component, pageProps }) {
  return (
  <MoralisProvider initializeOnMount={false}>
    <SessionProvider session={pageProps.session}>
      <Navbar/>
      <Component {...pageProps} />
    </SessionProvider>
  </MoralisProvider>
  )
  // return <Component {...pageProps} />;
}