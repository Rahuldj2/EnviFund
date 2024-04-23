import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Welcome from "@/components/Welcome";
import Initiatives from "./Initiatives";
import About from "./About";
import MyProjects from "./MyProjects";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkUserExists = async () => {
      console.log("here")
      if (session) {
        const response = await fetch(`/api/sign-up/check-if-user-exists?email_id=${session.user.email}`);
        const data = await response.json();
        if (!data.exists) {
          router.push("/signup"); // Redirect to signup form if user doesn't exist
        }
      }
    };

    checkUserExists();
  }, [session, router]);

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-themeBlack via-calmBlue to-tealBlue">
        <div className="text-center mt-8">
          {session ? (
            //DISPLAY WELCOME MESSAGE
            <>
              <div>
                <p className="mb-4 text-white">Welcome {session.user.name}</p>

              </div>
              <div id="dashboard" className="">
                {/* Dashboard content */}
              </div>
              <div id="investments" className="">
                {/* Investments content */}
              </div>
              <div id="projects" className="">
                {/* Investments content */}
                <MyProjects />
              </div>
              <div id="profile" className="">
                {/* Profile content */}
              </div>
            </>
          ) : (

            //DISPLAY RANDOM INFO ABOUT WEBSITE
            <div>
              {/* <Welcome /> */}

              <div id="home" className="min-h-screen ">
                {/* Home content */}
                <Welcome />
              </div>
              <div id="initiatives" className="min-h-screen">
                {/* Initiatives content */}
                <Initiatives />
              </div>
              <div id="about" className="min-h-screen">
                {/* About content */}
                <About />
              </div>
            </div>
          )}
        </div>
      </div>
      {session ? (
        <>
          <div id="dashboard" className="min-h-screen ">
            {/* Dashboard content */}
          </div>
          <div id="investments" className="min-h-screen ">
            {/* Investments content */}
          </div>
          <div id="projects" className="min-h-screen ">
            {/* Investments content */}
          </div>
          <div id="profile" className="min-h-screen ">
            {/* Profile content */}
          </div>
        </>
      ) : (
        <>
          <div id="home" className="min-h-screen ">
            {/* Home content */}
            <Welcome />
          </div>
          <div id="initiatives" className="min-h-screen ">
            {/* Initiatives content */}
            <Initiatives />
          </div>
          <div id="about" className="min-h-screen ">
            {/* About content */}
            <About />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
