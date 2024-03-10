import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";

const LandingPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-white"> {/* Changed background color to white */}
        <div className="text-center mt-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Envifund</h1>
          <p className="text-lg text-gray-600 mb-8">Empowering Environmental Initiatives</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold">Get Started</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg font-semibold">Learn More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
