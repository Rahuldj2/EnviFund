import React from "react";
import ProgressBar from "react-customizable-progressbar";
import Image from "next/image";
import EthereumLogo from "/public/icons/icons8-ethereum-logo-128.png";
import RupeeLogo from "/public/icons/icons8-rupee-100.png";
import { useState,createContext } from "react";
import SlidingPane from 'react-sliding-pane';
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import NormalProjectModal from "./NormalProjectModal";
export const normalprojectcontext = createContext();




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

    const[isOpen,setOpen]=useState(false);

    function handleProjectClick(project) {
        setOpen(true);
        // loadInvestorData();
        // console.log(investors);
    }

    
    const handleClose= () => {
        setOpen(false);
      };

    return (
        <normalprojectcontext.Provider value={project}>
        <div className={`flex flex-col relative bg-white rounded-lg shadow-md mb-6 border-y-8 
        ${isCryptoProject ? "border-blue-500" : "border-yellow-500"} justify-start min-w-min 
        cursor-pointer transition-transform hover:scale-105 transform-gpu hover:shadow-xl`} onClick={handleProjectClick}>
            <div className="flex items-center">
                <h2 className={`text-lg font-semibold ${isCryptoProject ? "text-blue-600" : "text-yellow-500"} text-balance pl-4`}>
                    {project_title}
                </h2>
                <div className="flex items-center justify-center w-32 h-32 relative ml-auto mr-4">
                    <ProgressBar
                        radius={50}
                        progress={progress}
                        strokeWidth={8}
                        strokeColor={isCryptoProject ? "#2563eb" : "#eab308"}
                        trackStrokeWidth={8}
                        trackStrokeColor="#D1D5DB"
                        transition="1.5s"
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl text-gray-800">
                        {progress.toPrecision(3)}%
                    </div>
                </div>
            </div>
            <div className="flex flex-col text-start mb-4 ml-5">
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
                />
            </div>
        </div>

        <SlidingPane
        isOpen={isOpen}
        title="Project Details"
        // subtitle="Fill in the details"
        onRequestClose={handleClose}
        from="top"
        width="90%"
        childrenWrapperStyle={{ background: "#0f0000" }}
      >
        <NormalProjectModal />
      </SlidingPane>
        </normalprojectcontext.Provider>
    );
};

export default ProjectCard;
