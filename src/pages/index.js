import React from "react";
import { useSession,signIn,signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import Layout from "@/components/Layout";
import Head from "next/head";

const Home = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    // Use the signIn function to initiate the Google authentication
    await signIn("google");
  };

  return (
    <>

      <Head>
        <title>EnviFund</title>
        <meta name="description" content="EnviFund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' />

        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Orbitron&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
      </Head>

      {/* <Layout> */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">

        <div className="text-center mt-8">
          {session ? (
            //DISPLAY WELCOME MESSAGE
            <div>
              <p className="mb-4" style={{ color: 'black' }}>Welcome {session.user.name}</p>
            </div>
          ) : (
            //DISPLAY RANDOM INFO ABOUT WEBSITE
            <div>
              <LandingPage />
            </div>
          )}
        </div>
      </div>
      {/* </Layout> */}

    </>
  );
};

export default Home;
