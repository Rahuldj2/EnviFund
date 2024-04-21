import React, { useContext } from "react";
import { projectInfoContext } from './ProjectCardCrypto';

const ProjectDetailsModal = () => {
    const project = useContext(projectInfoContext);

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
                    <p>{project.funding_goal} {project.isCryptoProject ? "ETH" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Current Balance:</h3>
                    <p>{project.funding_amount} {project.isCryptoProject ? "ETH" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Locked Funds:</h3>
                    <p>{project.locked_funds} {project.isCryptoProject ? "ETH" : "INR"}</p>
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
                    <h3 className="text-lg font-semibold">Image URL:</h3>
                    <p>{project.imageURL}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
