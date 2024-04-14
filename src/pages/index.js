import React from "react";
import { useSession,signIn } from "next-auth/react";
import Welcome from "@/components/Welcome";
import Initiatives from "./Initiatives";
import About from "./About";
import GetMyProjects from "./GetMyProjects";

const Home = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    // Use the signIn function to initiate the Google authentication
    await signIn("google");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-themeBlack via-calmBlue to-tealBlue">
        <div className="text-center mt-8">
          {session ? (
            //DISPLAY WELCOME MESSAGE
            <>
            <div>
              <p className="mb-4 text-white">Welcome {session.user.name}</p>
              
            </div>
            <div id="dashboard" className="bg-white">
                {/* Dashboard content */}
              </div>
              <div id="investments" className="bg-white">
                {/* Investments content */}
              </div>
              <div id="projects" className="bg-white">
                {/* Investments content */}
                <GetMyProjects />
              </div>
              <div id="profile" className="bg-white">
                {/* Profile content */}
              </div>
            </>
          ) : (

            //DISPLAY RANDOM INFO ABOUT WEBSITE
            <div>
                {/* <Welcome /> */}
                
                <div id="home" className="min-h-screen bg-white">
                  {/* Home content */}
                  <Welcome />
                </div>
                <div id="initiatives" className="min-h-screen bg-white">
                  {/* Initiatives content */}
                  <Initiatives />
                </div>
                <div id="about" className="min-h-screen bg-white">
                  {/* About content */}
                  <About />
                </div>
            </div>
          )}
        </div>
      </div>
      {session ? (
        <>
          <div id="dashboard" className="min-h-screen bg-white">
            {/* Dashboard content */}
          </div>
          <div id="investments" className="min-h-screen bg-white">
            {/* Investments content */}
          </div>
          <div id="projects" className="min-h-screen bg-white">
            {/* Investments content */}
          </div>
          <div id="profile" className="min-h-screen bg-white">
            {/* Profile content */}
          </div>
        </>
      ) : (
        <>
          <div id="home" className="min-h-screen bg-white">
            {/* Home content */}
            <Welcome />
          </div>
          <div id="initiatives" className="min-h-screen bg-white">
            {/* Initiatives content */}
            <Initiatives />
          </div>
          <div id="about" className="min-h-screen bg-white">
            {/* About content */}
            <About />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
