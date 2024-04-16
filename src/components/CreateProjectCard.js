import React from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/outline";

const CreateProjectCard = ({ onClick }) => {
    return (
        <div
            className="relative flex flex-col justify-around min-h items-center bg-slate-800 rounded-lg shadow-md p-2 mb-6 border-y-8 min-w-min hover:scale-105 transform-gpu hover:shadow-xl min-h border-grootRed cursor-pointer"
            onClick={onClick}
        >
            <PlusIcon className="h-24 text-gray-200" />
            <h4 className="text-2xl font-semibold text-white">Create New Project</h4>
        </div>

        // <Link href="/create-project">
        //     <div className="relative flex flex-col justify-start items-center bg-white rounded-lg shadow-md p-4 mb-6 border-y-8 border-gray-200 min-w-min hover:scale-105 transform-gpu hover:shadow-xl min-h">

        //         <PlusIcon className="h-12 w-12 text-gray-500 mb-2" />
        //         <p className="text-lg font-semibold text-gray-800">Create New Project</p>
        //     </div>
        // </Link>

    );
};

export default CreateProjectCard;
