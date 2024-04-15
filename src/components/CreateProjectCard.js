import React from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/outline";

const CreateProjectCard = () => {
    return (
        <Link href="/create-project"> {/* Update the href with the actual link to create a new project */}
            <div className="relative flex flex-col justify-start items-center bg-white rounded-lg shadow-md p-4 mb-6 border-y-8 border-gray-200 min-w-min hover:scale-105 transform-gpu hover:shadow-xl min-h">
                {/* justify-start min-w-min cursor-pointer transition-transform hover:scale-105 transform-gpu hover:shadow-xl */}
                <PlusIcon className="h-12 w-12 text-gray-500 mb-2" />
                <p className="text-lg font-semibold text-gray-800">Create New Project</p>
            </div>
        </Link>
    );
};

export default CreateProjectCard;
