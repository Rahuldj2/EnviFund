import React, { useContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from '../../Contracts/ContractDetails';
import Web3Modal from "web3modal";
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { ethers } from "ethers";
import { investorInfoContext } from "./InvestorCardCrypto";

const InvestorProjModal = () => {
    const { account } = useMoralis();
    const project = useContext(investorInfoContext);
    const [fundingAmount, setFundingAmount] = useState("");
    const [AmountinWei, setAmountinWei] = useState(0);
    const [isFundingInputOpen, setIsFundingInputOpen] = useState(false);
    const [investors, setInvestors] = useState([]);
    const [investorSpecific, setSpecific] = useState({});
    const[updates,setUpdates]=useState([{}]);

    useEffect(() => {
        loadInvestorData();
        loadUpdates();
    }, []);

    useEffect(() => {
        console.log(investorSpecific)
    }, [investorSpecific]);


    useEffect(() => {
        console.log(updates[0])
    }, [updates]);

    
    async function loadUpdates(){
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const updates_incoming = await contract.getUpdatesByProject(project.project_id);
        // console.log(project.project_id)
        // console.log(updates_incoming)

        setUpdates(updates_incoming);
        // console.log(updates);
    }

    async function loadInvestorData() {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const investors_ret = await contract.getAllInvestorsByProject(project.project_id);

        const investorFundingData = {}; // Object to store investor funding data

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

    const handleFundingAmountChange = (e) => {
        setFundingAmount(e.target.value);
    };
    const convertToMatic=(wei)=>{
        const conversionFactor = 10 ** 18; // 1 Matic = 10^18 Wei
      return wei / conversionFactor;
      };

    const { runContractFunction: fundProject } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "fundProject",
        params: { "_projectId": project.project_id },
        msgValue: AmountinWei
    });

    const { runContractFunction: releaseLockedFunds } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "releaseLockedFunds",
        params: { "_projectId": project.project_id },
    });

    const { runContractFunction: withdraw } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "withdraw",
        params: { "_projectId": project.project_id },
    });

    const handleFundingSubmit = async () => {
        console.log("Funding Amount:", fundingAmount);
        console.log(typeof (fundingAmount))
        if (project.isCryptoProject) {
            const fundingInWei = Number(fundingAmount) * 10 ** 18;
            console.log("Funding Amount in Wei:", fundingInWei);
            setAmountinWei(fundingInWei)
            await fundProject()
        }
    };

    const handleReleaseSubmit = async () => {
        await releaseLockedFunds();
    }

    const handleWithdrawSubmit = async () => {
        await withdraw();
    }

    const hexToDecimal = (hexString) => {
        return parseInt(hexString, 16);
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
                    <h3 className="text-lg font-semibold">My investment:</h3>
                    <p>{project.funding_amount} {project.isCryptoProject ? "MATIC" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">My Locked Funds:</h3>
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
                    <h3 className="text-lg font-semibold">Updates:</h3>
                    {updates == null ? (
                            <div>
                                No updates available
                            </div>
                        ) : (
                            <div>
                                {updates.map((update, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                        {update[0]}
                                    </div>
                                ))}
                            </div>
                        )}

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
                {isFundingInputOpen && (
                    <div className="mt-4">
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Amount(in MATIC or INR as per project requirement)"
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
                <div className="mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-red-600"
                        onClick={handleWithdrawSubmit}
                    >
                        Withdraw
                    </button>

                    <button
                        onClick={handleReleaseSubmit}
                        className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md text-sm focus:outline-none hover:bg-green-600"
                    >
                        Release
                    </button>
                </div>
                <div className="mt-4 text-red-600">
                    Warning: Withdrawing or releasing funds will have permanent effects on the project. Please make sure before proceeding.
                </div>
            </div>
        </div>
    );
};

export default InvestorProjModal;
