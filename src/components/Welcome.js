// Welcome.js
import React from "react";
import Image from "next/image";

const Welcome = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/logo_bwless.png" // Update with your image path
        alt="EnviFund Image"
        width={200}
        height={200}
      />
      <div className="text-center mt-2">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to EnviFund
        </h1>
        <p className="text-lg text-grootGreen mb-8">
          Empowering Environmental Initiatives
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-calmBlue hover:bg-oceanBlue text-white px-6 py-3 rounded-md text-lg font-semibold border-collapse border-2 border-themeBlack">
            Get Started
          </button>
          <button className="bg-grootLightGreen hover:bg-grootGreen text-themeBlack px-6 py-3 rounded-md text-lg font-semibold border-collapse border-2 border-themeBlack">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
