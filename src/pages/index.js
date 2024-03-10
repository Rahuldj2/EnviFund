import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";

const Home = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    // Use the signIn function to initiate the Google authentication
    await signIn("google");
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      
      <div className="text-center mt-8">
        {session ? (
          //DISPLAY WELCOME MESSAGE
          <div>
            <p className="mb-4" style={{color:'black'}}>Welcome {session.user.name}</p>
          </div>
        ) : (
          //DISPLAY RANDOM INFO ABOUT WEBSITE
          <div>
            <LandingPage/>
          </div>
        )}
      </div>
    </div>

    </>
  );
};

export default Home;
