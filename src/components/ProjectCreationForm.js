import React,{ useState } from 'react';
import { contractABI,contractAddress } from '../../Contracts/ContractDetails';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import supabase from '../pages/api/dbConnection/dbConnect';
import { useSession } from 'next-auth/react';
import { useMoralis,useWeb3Contract } from 'react-moralis';
const ProjectCreationForm = () => {
  const [formData,setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    fundingType: 'cryptocurrency',
    fundingGoal: '',
    location: '',
    imageFile: null,
  });

  const [imageUrl,setImageUrl] = useState(null);
  // const { account, Moralis } = useMoralis();
  const { data: session,status } = useSession();
  const BASEURL = "https://mvqaptgoblyycfsjzfly.supabase.co/storage/v1/object/public/projectimages/project_images/";
  const { runContractFunction: createProject } = useWeb3Contract({
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "createProject",
    params: {
      "_fundingGoal": formData.fundingGoal,"_title": formData.projectTitle,"_description": formData.projectDescription,
      "_location": formData.location,"_imageUrL": imageUrl,"_ownerEmail": session?.user.email
    },
  });

  const handleChange = (e) => {
    const { name,value } = e.target;
    setFormData({ ...formData,[name]: value });
  };



  // Assuming you're using fetch API for making HTTP requests

  // Function to post data to the server
  async function postData(url = '',data = {}) {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }







  const handleImageChange = async (e) => {
    try {
      let file = e.target.files[0];

      const { data,error } = await supabase.storage
        .from('projectimages')
        .upload(`project_images/${formData.projectTitle}/${file.name}`,file);

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Image uploaded:",data);

        const url = BASEURL + formData.projectTitle + "/" + file.name;
        setImageUrl(url);

        console.log("Image URL:",url);
      }

      setFormData({ ...formData,imageFile: file });
    } catch (error) {
      console.error("Error handling image change:",error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)






    // console.log("Image URL:", url);


    console.log(formData);
    if (formData.fundingType === 'cryptocurrency' && imageUrl != null) {
      await createProject();
    }
    else {
      //send data to database

      // URL to your server endpoint
      const url = '/api/project/add-new-project'; // Adjust the URL according to your endpoint

      const projectData = {
        project_title: formData.projectTitle,
        description: formData.projectDescription,
        location: formData.location,
        completed: false,
        funding_type: formData.fundingType,
        funding_goal: formData.fundingGoal,
        funding_amount: 0,
        funding_goal_reached: false,
        project_lead_id: session?.user.email,
        images: [imageUrl]
      };

      // Call the postData function with the URL and projectData
      postData(url,projectData)
        .then(data => {
          console.log('Success:',data);
          // Handle success response here
        })
        .catch(error => {
          console.error('Error:',error);
          // Handle error response here
        });
      //api call
    }
    // Reset form fields
    setFormData({
      projectTitle: '',
      projectDescription: '',
      fundingType: 'cryptocurrency',
      fundingGoal: '',
      location: '',
      imageFile: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w bg-grootBrown p-6 rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-semibold text-green-900 mb-6">Create New Project</h2> */}
      <div className="mb-4">
        <label htmlFor="projectTitle" className="block font-semibold text-green-900 mb-1">Project Title</label>
        <input type="text" id="projectTitle" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="projectDescription" className="block font-semibold text-green-900 mb-1">Project Description</label>
        <textarea id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleChange} required rows="4" className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="fundingType" className="block font-semibold text-green-900 mb-1">Funding Type</label>
        <select id="fundingType" name="fundingType" value={formData.fundingType} onChange={handleChange} required className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500">
          <option value="cryptocurrency">Cryptocurrency</option>
          <option value="rupee">Rupee</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="fundingGoal" className="block font-semibold text-green-900 mb-1">Funding Goal</label>
        <input type="number" id="fundingGoal" name="fundingGoal" value={formData.fundingGoal} onChange={handleChange} required className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block font-semibold text-green-900 mb-1">Location</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="imageFile" className="block font-semibold text-green-900 mb-1">Image Upload</label>
        <input type="file" id="imageFile" name="imageFile" onChange={handleImageChange} required className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500" />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700">Create Project</button>
    </form>
  );
};

export default ProjectCreationForm;
