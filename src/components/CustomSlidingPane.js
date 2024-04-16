import React from 'react';

const CustomSlidingPane = ({ isOpen,onClose,children }) => {
    const paneStyles = {
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white w-full md:max-w-lg mx-4 md:mx-auto rounded-t-lg shadow-lg overflow-hidden transform transition-transform duration-300" style={paneStyles}>
                <div className="p-6">
                    {children}
                </div>
                <button className="block w-full py-2 text-center bg-gray-200 hover:bg-gray-300 focus:outline-none rounded-b-lg" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CustomSlidingPane;
