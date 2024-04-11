// _app.js
import "@/styles/globals.css";
import { SessionProvider,useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import { MoralisProvider } from "react-moralis";

export default function App({ Component,pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <ConditionalStatusBar />
      </SessionProvider>
    </MoralisProvider>
  );
}

function ConditionalStatusBar() {
  const { data: session } = useSession();

  if (!session) {
    return null; // Don't render StatusBar if there's no active session
  }

  return <StatusBar isConnected={false} />;
}
