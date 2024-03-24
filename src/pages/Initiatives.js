import React, { createContext, useState } from "react";
import { initiatives } from "../db-template/initiativesDummyData"; // Import the initiatives data
import InitiativesModal from "../modals/InitiativesModal";

//created context
export const initiativesContext = createContext();

const Initiatives = () => {
    const [initi, setInitiatives] = useState(initiatives);
    const [selectedInitiative, setSelectedInitiative] = useState(null);

    // Function to handle click on "Know More" button
    const handleKnowMore = (initiative) => {
        setSelectedInitiative(initiative);
    };

    // Close modal function
    const closeModal = () => {
        setSelectedInitiative(null);
    };

    return (
        // Context provider to pass the data and functions to the modal
        <initiativesContext.Provider value={{ initi, selectedInitiative, setInitiatives, setSelectedInitiative }}>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Initiatives</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {initi.map((initiative) => (
                        <div key={initiative.id} className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold mb-2">{initiative.title}</h2>
                            <p className="text-gray-600 mb-2">{initiative.description}</p>
                            <p className="text-gray-700">Status: {initiative.status}</p>
                            <p className="text-gray-700">Owner: {initiative.owner}</p>
                            <p className="text-gray-700">Start Date: {initiative.startDate}</p>
                            <button
                                onClick={() => handleKnowMore(initiative)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Know More
                            </button>
                        </div>
                    ))}
                </div>
                {/* Modal */}
                {selectedInitiative && (
                    <InitiativesModal />
                )}
            </div>
        </initiativesContext.Provider>
    );
};

export default Initiatives;
