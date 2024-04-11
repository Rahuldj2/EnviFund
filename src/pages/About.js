// About.js
import React from "react";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white">
            <div className="text-center mt-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">About EnviFund</h1>
                <p className="text-lg text-gray-600 mb-8">EnviFund is a decentralized crowdfunding marketplace dedicated to supporting environmental initiatives.</p>
                <p className="text-lg text-gray-600 mb-8">Our platform empowers individuals and organizations to raise funds for projects that promote sustainability, conservation, and environmental protection.</p>
                <p className="text-lg text-gray-600 mb-8">Join us in making a positive impact on the planet!</p>
            </div>
        </div>
    );
};

export default About;
