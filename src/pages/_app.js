// _app.js
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import { MoralisProvider } from "react-moralis";

export default function App({ Component,pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <StatusBar isConnected={false} />
      </SessionProvider>
    </MoralisProvider>
  );
}
