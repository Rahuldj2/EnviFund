// pages/MyProjects.js
import React,{ useState,useEffect } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import ProjectCardCrypto from "@/components/ProjectCardCrypto";
import ProjectCard from "@/components/ProjectCard";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { contractABI, contractAddress } from "../../Contracts/ContractDetails";
import { useMoralis } from "react-moralis";
import { useSession } from "next-auth/react";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
const AllProjects = () => {
  const [isPaneOpen,setIsPaneOpen] = useState(false);

  const[selectedProject,setSelectedProject]=useState(null);
  const [cryptoprojects, setProjects] = useState([]);
  const { account } = useMoralis();
  const { data: session } = useSession();

  const[normalprojects,setNormalProjects]=useState([]);

  useEffect(() => {
    if (account) {
      // console.log(cryptoprojects)
      loadData();
    }
  }, [account,cryptoprojects]);


  useEffect(() => {
    fetchProjects();
  }, []);


  useEffect(() => {
    console.log(normalprojects)
  }, [normalprojects]);

  async function fetchProjects() {
    try {
      const response = await fetch('/api/project/fetch-all-projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      // console.log(data)
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
    const Projs = await contract.getAllProjects();
    setProjects(Projs);
  }



  const handleProjectClick = (project) => {
    setIsPaneOpen(true);
    // console.log(project);
  };

  const handleClosePane = () => {
    setIsPaneOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Browse Initiatives Across The World</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Map through projects and render ProjectCard components */}

        
        {/* THIS IS THE SEPARATION POINT */}
        {/* THIS IS THE SEPARATION POINT */}
      {cryptoprojects?.map((project,index) => (
                <ProjectCardCrypto key={index} project={project} funding_type="cryptocurrency" onClick={handleProjectClick}/>
              ))}


{normalprojects?.map((project,index)=>(
          <ProjectCard key={index} project={project} onClick={handleProjectClick}/>
        ))}
      </div>

      {/* Sliding pane */}
      {/* <SlidingPane
        isOpen={isPaneOpen}
        title="Project Details"
        // subtitle="Fill in the details"
        onRequestClose={handleClosePane}
        from="top"
        width="90%"
        childrenWrapperStyle={{ background: "#0f0000" }}
      >
        <ProjectDetailsModal />
      </SlidingPane> */}
    </div>
  );
};

export default AllProjects;
