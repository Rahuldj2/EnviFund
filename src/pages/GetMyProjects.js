import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from "../../Contracts/ContractDetails";
import { useMoralis } from "react-moralis";

const GetMyProjects = () => {
  const [projects, setProjects] = useState([]);
  const { account } = useMoralis();

  useEffect(() => {
    if (account) {
      loadData();
    }
  }, [account]);

  async function loadData() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const Projs = await contract.getAllProjectsByOwner(account);
    setProjects(Projs);
  }

  // Function to convert hexadecimal string to decimal
  const hexToDecimal = (hexString) => {
    return parseInt(hexString, 16);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Project ID: {hexToDecimal(project[0]._hex)}</h3>
            <p className="text-gray-600 mb-2">Title: {project[1]}</p>
            <p className="text-gray-600 mb-2">Owner: {project[2]}</p>
            <p className="text-gray-600 mb-2">Funding Goal: {hexToDecimal(project[3]._hex)}</p>
            <p className="text-gray-600 mb-2">Current Balance: {hexToDecimal(project[4]._hex)}</p>
            <p className="text-gray-600">Locked Funds: {hexToDecimal(project[5]._hex)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMyProjects;
