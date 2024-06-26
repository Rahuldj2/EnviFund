import React from "react";
import { useSession,signIn,signOut } from "next-auth/react";
import Image from "next/image";
import { Link } from "react-scroll";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session } = useSession();
  const [scrolling,setScrolling] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll",handleScroll);

    return () => {
      window.removeEventListener("scroll",handleScroll);
    };
  },[]);

  return (
    <nav
      className={`flex justify-between w-screen sticky items-center py-2 px-8 text-white top-0 bg-gradient-to-r from-themeBlack via-calmBlue to-tealBlue z-50 transition-opacity duration-300 ${scrolling ? "opacity-95" : ""
        }`}
    >
      <div className="flex items-center space-x-8">
        {session ? (
          <>
            <Link
              to="dashboard"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/")}
            >
              Dashboard
            </Link>

            <Link
              to="projects"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/")}
            >
              My Projects
            </Link>

            <Link
              to="browse"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline cursor-pointer"
            >
              Browse
            </Link>

            <Link
              to="investments"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/")}
            >
              My Investments
            </Link>
          </>
        ) : (
          <>
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline"
            >
              Home
            </Link>
            <Link
              to="initiatives"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline"
            >
              Initiatives
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline"
            >
              About
            </Link>
          </>
        )}
      </div>

      {/* Sign In Out Part */}
      <div className="flex items-center space-x-4">
        {session ? (
          <div className="flex items-center space-x-4">
            <Link
              to="profile"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              activeClass="active"
              className="hover:underline flex items-center space-x-4"
            >
              <p>{session.user.name}</p>
              <div className="w-12 h-12 relative">
                {/* Profile */}
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                  className="rounded-full"
                />
              </div>
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-white text-blue-500 px-4 py-2 rounded-md text-sm"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-white text-blue-500 px-4 py-2 rounded-md text-sm"
          >
            Sign In with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;