// pages/MyProjects.js
import React from "react";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectCard from "@/components/CreateProjectCard";

const MyProjects = () => {
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
    // Add more sample projects as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* CreateProjectCard component */}
        <CreateProjectCard />
        {/* Map through projects and render ProjectCard components */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
