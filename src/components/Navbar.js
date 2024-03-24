import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";


const Navbar = () => {
    const { data: session } = useSession();
  
    return (
      <>
        <nav className="flex justify-between items-center py-4 px-8 bg-blue-500 text-white">
          <div>
            <a href="/" className="text-xl font-bold">Home</a>
          </div>

          <div>
            <a href="/Initiatives" className="text-xl font-bold">Initiatives</a>
          </div>


          
          {session ? (
            <>
            
            <div>
            <a href="/" className="text-xl font-bold">Project Dashboard</a>
          </div>

          <div>
            <a href="/" className="text-xl font-bold">My Investments</a>
          </div>

          <div>
            <a href="/" className="text-xl font-bold">My Profile</a>
          </div>
            <div className="flex items-center">
              {/* Display user details and sign-out button when authenticated */}
              {/* <p className="mr-4">Welcome {session.user.name}</p> */}
              <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full" />
              <button onClick={() => signOut()} className="ml-4 bg-white text-blue-500 px-4 py-2 rounded-md">Sign Out</button>
            </div>
            </>
          ) : (
            <div>
              {/* Display sign-in button when not authenticated */}
              <button onClick={() => signIn("google")} className="bg-white text-blue-500 px-4 py-2 rounded-md">Sign In with Google</button>
            </div>
          )}
        </nav>
      </>
    );
  };

export default Navbar;