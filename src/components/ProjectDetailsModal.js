import React, { useContext, useEffect, useState} from "react";
import { projectInfoContext } from './ProjectCardCrypto';
import { contractABI, contractAddress } from '../../Contracts/ContractDetails';
import Web3Modal from "web3modal";
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { ethers } from "ethers";
import { normalprojectcontext } from "./ProjectCard";

const ProjectDetailsModal = () => {
    const { account } = useMoralis();
    const project = useContext(projectInfoContext);
    const normalproject = useContext(normalprojectcontext);
    const [fundingAmount, setFundingAmount] = useState("");
    const [AmountinWei, setAmountinWei] = useState(0);
    const [isFundingInputOpen, setIsFundingInputOpen] = useState(false);
    const [investors, setInvestors] = useState([]);
    const [investorSpecific, setSpecific] = useState({});
    const [updateText, setUpdateText] = useState("");
    const [updateImage, setUpdateImage] = useState(null);
    const[updateOpen,setUpdateOpen]=useState(false);

    useEffect(() => {
        console.log("amamamama");
        loadInvestorData();
    }, []);

    useEffect(() => {  
        console.log(investors)
    }, [investors]);

    async function loadInvestorData() {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const investors_ret = await contract.getAllInvestorsByProject(project.project_id);

        const investorFundingData = {}; 

        await Promise.all(
            investors_ret.map(async (investor) => {
                const investorSpecific = await contract.getInvestorFundingForProject(investor, project.project_id);
                investorFundingData[investor] = investorSpecific;
            })
        );
        setInvestors(investors_ret);
        setSpecific(investorFundingData);
    }

    const handleFundProject = () => {
        setIsFundingInputOpen(true);
    };

    const convertToMatic = (wei) => {
        const conversionFactor = 10 ** 18; // 1 Matic = 10^18 Wei
        return wei / conversionFactor;
    };

    const handleFundingAmountChange = (e) => {
        setFundingAmount(e.target.value);
    };

    const handleUpdateProject = () => {
        setUpdateOpen(!updateOpen);
    }

    const handleUpdateTextChange = (e) => {
        setUpdateText(e.target.value);
    };

    const handleUpdateImageChange = (e) => {
        setUpdateImage(e.target.files[0]);
    };

    const hexToDecimal = (hexString) => {
        return parseInt(hexString, 16);
    };    

    const {runContractFunction: fundProject} = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "fundProject",
        params: {"_projectId": project.project_id},
        msgValue: AmountinWei
    });

    const {runContractFunction: giveUpdate} = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "giveUpdate",
        params: {"_projectId": project.project_id,"_update":updateText,"_imageUrl":"test url"},
    });

    const handleFundingSubmit = async () => {
        console.log("Funding Amount:", fundingAmount);
        console.log(typeof(fundingAmount))
        if (project.isCryptoProject) {
            const fundingInWei = Number(fundingAmount) * 10**18;
            console.log("Funding Amount in Wei:", fundingInWei);
            setAmountinWei(fundingInWei)
            await fundProject()
        }
    };
    
    const handleUpdateSubmit = async () => {
        // Implement the functionality to fund the project using fundingAmount
        console.log("Update Text:", updateText);
        console.log("Update Image:", updateImage);
            // Convert the text and image to bytes
        await giveUpdate().then((result) => {
            console.log(result);
        });
        console.log("hello")

        
        // Here you can add logic to fund the project
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Project Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Project Title:</h3>
                    <p>{project.project_title}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Location:</h3>
                    <p>{project.location}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Owner:</h3>
                    <p>{project.owner}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Funding Goal:</h3>
                    <p>{project.funding_goal} {project.isCryptoProject ? "MATIC" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Current Balance:</h3>
                    <p>{project.funding_amount} {project.isCryptoProject ? "MATIC" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Locked Funds:</h3>
                    <p>{project.locked_funds} {project.isCryptoProject ? "MATIC" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p>{project.Description}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Owner Email:</h3>
                    <p>{project.ownerEmail}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Image URL:</h3>
                    <p>{project.imageURL}</p>
                </div>
                  
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Investors:</h3>
                    {investors.map((investor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2 text-color-black">{investor}</h3>
                        </div>
                    ))}
                </div>

                <div>
                    {Object.keys(investorSpecific).map((investor) => (
                        <div key={investor}>
                            Investor: {investor}, Amount funded: {convertToMatic(hexToDecimal(investorSpecific[investor][0]._hex))} MATIC, Locked: {convertToMatic(hexToDecimal(investorSpecific[investor][1]._hex))} MATIC
                        </div>
                    ))}
                </div>
                
                <div className="mt-6">
                    <button
                        onClick={handleFundProject}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-blue-600"
                    >
                        Fund Project
                    </button>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleUpdateProject}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-blue-600"
                    >
                        Provide Updates
                    </button>
                </div>

                {isFundingInputOpen && (
                    <div className="mt-4">
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Amount (in MATIC or INR as per project requirement)"
                            value={fundingAmount}
                            onChange={handleFundingAmountChange}
                        />
                        <button
                            onClick={handleFundingSubmit}
                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md text-sm focus:outline-none hover:bg-blue-600"
                        >
                            Fund
                        </button>
                    </div>
                )}

                {
                    updateOpen && (
                        <div className="mt4">

                    <h3 className="text-lg font-semibold mt-4">Update</h3>
                        <textarea
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Update Text"
                            value={updateText}
                            onChange={handleUpdateTextChange}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="border border-gray-300 rounded-md px-4 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUpdateImageChange}
                        />
                        <button
                            onClick={handleUpdateSubmit}
                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md text-sm focus:outline-none hover:bg-blue-600"
                        >
                            Submit Update
                        </button>
 
                        </div>

                    )
                }


            </div>
        </div>
    );
};

export default ProjectDetailsModal;
