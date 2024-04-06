import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from "../../Contracts/ContractDetails";
import { useMoralis } from "react-moralis";
import { useSession } from "next-auth/react";
import ProjectCreationForm from "@/components/ProjectCreationForm";

const GetMyProjects = () => {
  const [projects, setProjects] = useState([]);
  const { account } = useMoralis();
  const { data: session } = useSession();
  const [showProjectForm, setShowProjectForm] = useState(false);

  
  useEffect(() => {
    if (account) {
      loadData();
    }
  }, [account]);

  //Function to load the data from blockchain
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

  const handleCreateProject = async (projectData) => {
    // Your logic to create project
    console.log("Creating project with data:", projectData);
    // After creating project, you may want to reload projects
    // loadData();
  };
  return (
    <div>
        {
        session?(          
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
    <button className="fixed bottom-6 right-6 bg-blue-500 
    text-white rounded-full p-3 shadow-md hover:bg-blue-600 focus:outline-none"  
    onClick={() => setShowProjectForm(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          {showProjectForm && <ProjectCreationForm onCreateProject={handleCreateProject} />}
          {/* Render projects */}
  </div>
  

            ):(
                <div>
                    <h2>Please sign in to view your projects</h2>
                </div>
            )
        }
    </div>
    
  );
};

export default GetMyProjects;
