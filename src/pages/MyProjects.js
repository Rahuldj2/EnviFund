// pages/MyProjects.js
import React,{ useState,useEffect } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import ProjectCard from "@/components/ProjectCard";
import CreateProjectCard from "@/components/CreateProjectCard";
import ProjectCreationForm from "@/components/ProjectCreationForm";
import ProjectCardCrypto from "@/components/ProjectCardCrypto";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from "../../Contracts/ContractDetails";
import { useMoralis } from "react-moralis";
import { useSession } from "next-auth/react";

const MyProjects = () => {
  const [isPaneOpen,setIsPaneOpen] = useState(false);

  const [cryptoprojects, setProjects] = useState([]);
  const [normalprojects, setNormalProjects] = useState([]);
  const { account } = useMoralis();
  const { data: session } = useSession();

  useEffect(() => {
    if (account) {
      // console.log(cryptoprojects)
      loadData();
    }
  }, [account,cryptoprojects]);

  useEffect(() => {
   
    if(session){
      loadCurrencyData();
    }
        
    
      
    }, [session]);

  // api to fetch data from database
async function loadCurrencyData(){
  try{
    console.log(session?.user.email)
  const response = await fetch(`/api/project/fetch-projects-of-a-user?email_id=${session?.user.email}`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await response.json();
   console.log(data)
  setNormalProjects(data);
} catch (error) {
  console.error('Error fetching projects:', error);
}
}
  async function loadData() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const Projs = await contract.getAllProjectsByOwner(account);
    setProjects(Projs);
  }

  const handleCreateProjectClick = () => {
    setIsPaneOpen(true);
  };

  const handleClosePane = () => {
    setIsPaneOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-white font-semibold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* CreateProjectCard component */}
        <CreateProjectCard onClick={handleCreateProjectClick} />
        {/* Map through projects and render ProjectCard components */}
        {normalprojects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {/* THIS IS THE SEPARATION POINT */}
      {cryptoprojects.map((project,index) => (
                <ProjectCardCrypto key={index} project={project} funding_type="cryptocurrency" />
              ))}
      </div>

      {/* Sliding pane */}
      <SlidingPane
        isOpen={isPaneOpen}
        title="Add New Project"
        // subtitle="Fill in the details"
        onRequestClose={handleClosePane}
        from="bottom"
        width="90%"
        childrenWrapperStyle={{ background: "#0f0000" }}
      >
        <ProjectCreationForm />
      </SlidingPane>
    </div>
  );
};

export default MyProjects;


// const cryptoprojects = [
//   {
//     project_id: 1,
//     project_title: "Replantation of Trees in the Amazon Rainforest",
//     description: "A lot of tree have to replanted in the Amazon Rainforest. We need your help to make this happen.",
//     location: "Amazon Rainforest, Brazil",
//     funding_goal: 100,
//     funding_amount: 11,
//     funding_goal_reached: true,
//   },
//   {
//     project_id: 2,
//     project_title: "Yamuna River Cleanup Drive",
//     description: "The Yamuna River is one of the most polluted rivers in the world. We need your help to clean it up.",
//     location: "Yamuna River, India",
//     funding_goal: 25000,
//     funding_amount: 15789,
//     funding_goal_reached: false,
//   }
// ];
// Sample data
const projects =[] 