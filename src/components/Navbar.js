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
      className={`flex justify-between items-center py-4 px-8 text-white sticky top-0 bg-gradient-to-r from-themeBlack via-calmBlue to-tealBlue ${scrolling ? "opacity-90" : ""
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
              onClick={() => router.push("/MyProjects")}
            >
              Dashboard
            </Link>


            <Link
              to="/BrowseProjects"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/BrowseProjects")}
            >
              Browse
            </Link>

            <Link
              to="/InvestorBoard"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="active"
              className="text-xl font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/InvestorBoard")}
            >
              My Investments
            </Link>
            {/* Add links for other sections */}
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