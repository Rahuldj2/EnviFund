// ProjectCreationForm.js
import React, { useState } from 'react';

const ProjectCreationForm = ({ onCreateProject }) => {
  const [title, setTitle] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProject({ title, fundingGoal });
    setTitle('');
    setFundingGoal('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Project</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 mb-2">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="fundingGoal" className="block text-gray-700 mb-2">Funding Goal:</label>
        <input type="number" id="fundingGoal" value={fundingGoal} onChange={(e) => setFundingGoal(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Create</button>
    </form>
  );
};

export default ProjectCreationForm;
