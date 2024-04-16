// pages/MyProjects.js
import React,{ useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import ProjectCard from "@/components/ProjectCard";
import CreateProjectCard from "@/components/CreateProjectCard";
import ProjectCreationForm from "@/components/ProjectCreationForm";

const MyProjects = () => {
  const [isPaneOpen,setIsPaneOpen] = useState(false);

  const handleCreateProjectClick = () => {
    setIsPaneOpen(true);
  };

  const handleClosePane = () => {
    setIsPaneOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* CreateProjectCard component */}
        <CreateProjectCard onClick={handleCreateProjectClick} />
        {/* Map through projects and render ProjectCard components */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {/* Sliding pane */}
      <SlidingPane
        isOpen={isPaneOpen}
        title="Create New Project"
        subtitle="Fill in the details"
        onRequestClose={handleClosePane}
        from="bottom"
        width="100%"
      >
        <ProjectCreationForm />
      </SlidingPane>
    </div>
  );
};

export default MyProjects;

// Sample data
const projects = [
  {
    project_id: 1,
    project_title: "Replantation of Trees in the Amazon Rainforest",
    description: "A lot of tree have to replanted in the Amazon Rainforest. We need your help to make this happen.",
    location: "Amazon Rainforest, Brazil",
    funding_type: "cryptocurrency",
    funding_goal: 100,
    funding_amount: 11,
    funding_goal_reached: true,
  },
  {
    project_id: 2,
    project_title: "Yamuna River Cleanup Drive",
    description: "The Yamuna River is one of the most polluted rivers in the world. We need your help to clean it up.",
    location: "Yamuna River, India",
    funding_type: "rupee",
    funding_goal: 25000,
    funding_amount: 15789,
    funding_goal_reached: false,
  },
  {
    project_id: 3,
    project_title: "Solar Panels for Schools in Africa",
    description: "We are raising funds to install solar panels in schools across Africa to provide electricity.",
    location: "Africa",
    funding_type: "rupee", // can only be cryptocurrency or rupee
    funding_goal: 5000,
    funding_amount: 5000,
    funding_goal_reached: true,
  },
  {
    project_id: 4,
    project_title: "Planting Trees in the Sahara Desert",
    description: "We are planting trees in the Sahara Desert to combat desertification. Join us in this cause.",
    location: "Sahara Desert, Africa",
    funding_type: "cryptocurrency",
    funding_goal: 200,
    funding_amount: 0,
    funding_goal_reached: false,
  },
  {
    project_id: 5,
    project_title: "Clean Drinking Water for Villages in Nepal",
    description: "We are providing clean drinking water to villages in Nepal. Help us in this cause.",
    location: "Nepal",
    funding_type: "cryptocurrency",
    funding_goal: 500,
    funding_amount: 500,
    funding_goal_reached: true,
  },
  {
    project_id: 6,
    project_title: "Food for the Homeless in New York City",
    description: "We are providing food to the homeless in New York City. Help us in this cause.",
    location: "New York City, USA",
    funding_type: "rupee",
    funding_goal: 1000,
    funding_amount: 1000,
    funding_goal_reached: true,
  },
  {
    project_id: 7,
    project_title: "Reforestation of the Boreal Forest",
    description: "We are planting trees in the Boreal Forest to combat deforestation. Join us in this cause.",
    location: "Boreal Forest, Canada",
    funding_type: "cryptocurrency",
    funding_goal: 300,
    funding_amount: 300,
    funding_goal_reached: true,
  }
  // Add more sample projects as needed
];
