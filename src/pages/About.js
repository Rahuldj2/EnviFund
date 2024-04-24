// About.js
import React from "react";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-800">
            <div className="text-center mt-16">
                <h1 className="text-4xl font-bold text-white mb-4">About EnviFund</h1>
                <p className="text-lg text-blue-100 text-justify px-12 py-0 mb-4">
                    EnviFund is a decentralized crowdfunding marketplace dedicated to supporting environmental initiatives. We are pioneersing a revolutionary crowdfunding platform powered by blockchain technology. It empowers users to drive impactful environmental conservation efforts through secure investments and collaborative project funding.
                </p>
                <p className="text-lg text-blue-200 text-justify px-12 py-0 mb-4">Conventional crowdfunding applications lack transparency and accountability, hindering effective environmental project funding.EnviFund enables users to propose, fund, and collaborate on impactful projects aimed at addressing pressing environmental challenges.</p>
                <p className="text-2xl text-themeBlueLight mb-8 bg-slate-700 hover:text-blue-300">Join us in making a positive impact on the planet !</p>
            </div>
        </div>
    );
};

export default About;
