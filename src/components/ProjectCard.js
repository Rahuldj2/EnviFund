import React from "react";
import ProgressBar from "react-customizable-progressbar";
import Image from "next/image";
import EthereumLogo from "/public/icons/icons8-ethereum-logo-128.png";
import RupeeLogo from "/public/icons/icons8-rupee-100.png";

const ProjectCard = ({ project }) => {
    const {
        project_title,
        location,
        funding_type,
        funding_goal,
        funding_amount,
        funding_goal_reached,
    } = project;
    const isCryptoProject = funding_type === "cryptocurrency";
    const progress = (funding_amount / funding_goal) * 100;

    return (
        <div className={`flex flex-col relative bg-white pl-5 rounded-lg shadow-md mb-6 border-y-8 ${isCryptoProject ? "border-blue-500" : "border-yellow-500"} justify-start min-w-min`}>

            <div className="flex items-center">
                <h2 className={`text-[18px] leading-6 font-semibold ${isCryptoProject ? "text-blue-600" : "text-yellow-500"} text-balance text-left pl-4`}>
                    {project_title}
                </h2>
                <div className="w-min h-min relative flex justify-between">

                    <ProgressBar
                        radius={25}
                        progress={progress}
                        strokeWidth={8}
                        strokeColor={isCryptoProject ? "#2563eb" : "#eab308"}
                        trackStrokeWidth={8}
                        trackStrokeColor="#D1D5DB"
                        transition="1.5s"
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm text-gray-800">
                        {progress.toPrecision(2)}
                    </div>

                </div>

            </div>
            <div className="flex flex-col text-start mb-4 ml-4">
                <p className={`text-sm font-bold text-gray-900`}>
                    Goal: <span className={`${funding_goal_reached ? "text-green-600" : "text-red-600"}`}>{funding_goal} {isCryptoProject ? "ETH" : "INR"}</span>
                </p>
                <p className="text-sm text-gray-800">
                    Location: {location}
                </p>
            </div>
            <div className="absolute w-7 h-7 bg-current rounded-full -bottom-3 -start-1">
                <Image
                    src={isCryptoProject ? EthereumLogo : RupeeLogo}
                    alt={isCryptoProject ? "Ethereum Logo" : "Rupee Logo"}
                    layout="fill"
                    objectFit="cover"
                // className="h-20 w-20"
                />
            </div>
        </div>
    );
};

export default ProjectCard;
