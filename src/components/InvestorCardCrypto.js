import React, { useState } from "react";
import ProgressBar from "react-customizable-progressbar";
import Image from "next/image";
import EthereumLogo from "/public/icons/icons8-ethereum-logo-128.png";
import RupeeLogo from "/public/icons/icons8-rupee-100.png";
import { createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import SlidingPane from 'react-sliding-pane';
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import InvestorProjModal from "@/components/InvestorProjModal";
import { contractABI, contractAddress } from '../../Contracts/ContractDetails';
export const investorInfoContext = createContext();

const InvestorCardCrypto= ({ project,funding_type,onClick}) => {
    // const {
    //     project_title,
    //     location,
    //     funding_goal,
    //     funding_amount,
    //     funding_goal_reached,
    // } = project;
    const[isOpen,setOpen]=useState(false);
    const[investors,setInvestors]=useState([]);

    async function loadInvestorData() {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const investors_ret = await contract.getAllInvestorsByProject(project.project_id);
        setInvestors(investors_ret);
      }

    function handleProjectClick(project) {
        setOpen(true);
        // loadInvestorData();
        // console.log(investors);
    }

    const handleClose= () => {
        setOpen(false);
      };

    const hexToDecimal = (hexString) => {
        return parseInt(hexString, 16);
      };    
    
    
      const convertToMatic=(wei)=>{
        const conversionFactor = 10 ** 18; // 1 Matic = 10^18 Wei
      return wei / conversionFactor;
      };

    const project_id=hexToDecimal(project[0]._hex);
    const project_title=project[1];
    const location=project[7];
    const owner=project[2]
    const funding_goal=hexToDecimal(project[3]._hex);
    const funding_amount=convertToMatic(hexToDecimal(project[4]._hex));//current balance
    const locked_funds=convertToMatic(hexToDecimal(project[5]._hex))
    const Description=project[6]
    const imageURL=project[9]
    const ownerEmail=project[10]
    const funding_goal_reached=funding_amount>=funding_goal;
    const isCryptoProject = funding_type === "cryptocurrency";
    const progress = (funding_amount / funding_goal) * 100;

    return (
        <investorInfoContext.Provider value={{project_id,project_title,location,owner,funding_goal,funding_amount,locked_funds,Description,imageURL,ownerEmail,isCryptoProject,investors}}>
        <div className={`flex 
        flex-col relative bg-white rounded-lg 
        shadow-md mb-6 border-y-8
         ${isCryptoProject ? "border-blue-500" : "border-yellow-500"} 
         justify-start min-w-min cursor-pointer transition-transform 
         hover:scale-105 transform-gpu hover:shadow-xl`} onClick={handleProjectClick}>
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
                    Goal: <span className={`${funding_goal_reached ? "text-green-600" : "text-red-600"}`}>{funding_goal} {isCryptoProject ? "MATIC" : "INR"}</span>
                </p>
                <p className="text-sm text-gray-800">
                    Location: {location}
                </p>

                <p className="text-sm text-gray-800">
                    Owner Address: {owner.slice(0,4)}...{owner.slice(-4)}
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
        <InvestorProjModal />
      </SlidingPane>
        </investorInfoContext.Provider>
    );
};

export default InvestorCardCrypto;
