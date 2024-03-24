import React, { useContext } from "react";
import { initiativesContext } from "../pages/Initiatives.js";

const InitiativesModal = () => {
    const { selectedInitiative, setSelectedInitiative } = useContext(initiativesContext);

    const closeModal = () => {
        setSelectedInitiative(null);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-md"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full z-50">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{selectedInitiative.title}</h2>
                    <p className="text-gray-600 mb-2">{selectedInitiative.description}</p>
                    <p className="text-gray-700">Status: {selectedInitiative.status}</p>
                    <p className="text-gray-700">Owner: {selectedInitiative.owner}</p>
                    <p className="text-gray-700">Start Date: {selectedInitiative.startDate}</p>
                    <p className="text-gray-700">Cryptocurrency: {selectedInitiative.cryptocurrency ? "Yes" : "No"}</p>
                    <button
                        onClick={closeModal}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InitiativesModal;
