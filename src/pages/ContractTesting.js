import React, { useState, useEffect } from 'react';
import { useMoralis,useWeb3Contract } from 'react-moralis';
import axios from 'axios';
import { contractABI, contractAddress } from '../../Contracts/ContractDetails';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import { useSession } from 'next-auth/react';


const ContractTesting = () => {
    const { account, Moralis } = useMoralis();
    
    const [projectId, setProjectId] = useState('');
    const [fundingGoal, setFundingGoal] = useState('');
    const [title, setTitle] = useState('');
    const { data: session, status } = useSession()
       
    const {runContractFunction: createProject}=useWeb3Contract({
        abi:contractABI,
        contractAddress:contractAddress,
        functionName:"createProject",
        params:{"_fundingGoal":4000,"_title":"Test Project 3", "_description":"This is a test project 4","_location":"Test Location","_imageUrL":"Test Image","_ownerEmail":session?.user.email},
    })

    const handleClick = async (action) => {
        try {
            switch (action) {
                case 'createProject':
                    await createProject()
                 
                case 'fundProject':
                    // Call the fundProject function
                    await Moralis.executeFunction("fundProject", { _projectId: parseInt(projectId), _value: parseInt(fundingGoal) });
                    console.log('Project funded');
                    break;
                case 'withdraw':
                    // Call the withdraw function
                    await Moralis.executeFunction("withdraw", { _projectId: parseInt(projectId) });
                    console.log('Funds withdrawn');
                    break;
                default:
                    console.error('Invalid action');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Contract Testing</h2>
            <p>Account: {account}</p>
            <label>
                Project ID:
                <input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
            </label>
            <br />
            <label>
                Funding Goal:
                <input type="text" value={fundingGoal} onChange={(e) => setFundingGoal(e.target.value)} />
            </label>
            <br />
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <button onClick={() => handleClick('createProject')}>Create Project</button>
            <button onClick={() => handleClick('fundProject')}>Fund Project</button>
            <button onClick={() => handleClick('withdraw')}>Withdraw Funds</button>
        </div>
    );
};

export default ContractTesting;
