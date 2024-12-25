import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import "./Header.css";
import Lottie from "lottie-react";
import logoLottie from "../assets/logo.json";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const li = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/queries">Queries</NavLink>
      {user && (
        <>
          <NavLink to="/recommendations-for-me">Recommendations For Me</NavLink>
          <NavLink to="/my-queries">My Queries</NavLink>
          <NavLink to="/my-recommendations">My recommendations</NavLink>
        </>
      )}
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("user logged out");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const errorCode = error.message;
        console.log(errorCode);
      });
  };
  return (
    <div className="shadow-lg bg-white sticky top-0 z-50">
      <div className="navbar w-11/12 lg:w-10/12 mx-auto justify-between">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 *:text-white *:bg-orange-500 *:py-2 *:px-3 *:rounded-lg rounded-box mt-3 w-60 shadow p-5 gap-3 relative z-20"
            >
              {li}
              <div className="!bg-base-100">
                {user ? (
                  <div className="flex gap-3 items-center">
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip={user.displayName}
                    >
                      <img
                        className="h-11 object-contain rounded border-2 border-black"
                        src={
                          user?.photoURL !== ""
                            ? user?.photoURL
                            : user?.photoURL
                        }
                      />
                    </div>
                    <Link>
                      <button
                        onClick={handleLogOut}
                        className="bg-transparent text-black border-2 border-black px-5 py-2 font-body font-semibold rounded"
                        type="button"
                      >
                        Logout
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    <div className="tooltip tooltip-bottom">
                      <img className="h-10 object-contain rounded-lg" src="" />
                    </div>
                    <Link to="/login">
                      <button
                        className="bg-transparent border-2 px-5 py-2 text-black font-body font-semibold rounded"
                        type="button"
                      >
                        Sign In
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </ul>
          </div>
          <Link className=" text-xl flex items-center gap-2 font-bold">
            {/* <img
              src={logo}
              className="animate-spin-slow h-10"
              alt="Product Recommendation System"
            /> */}
            <span className="w-12"><Lottie animationData={logoLottie} loop={true} /></span>
            <span className="text-zinc-900 text-base md:text-base lg:text-lg font-body">
              Product Recom System
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-body text-base font-normal px-1 gap-4 *:text-zinc-900">
            {li}
          </ul>
          <div className="ml-5">
            {user ? (
              <div className="flex gap-3 items-center">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <img
                    className="h-11 object-contain rounded border-2 border-orange-500"
                    src={
                      user?.photoURL !== "" ? user?.photoURL : user?.photoURL
                    }
                  />
                </div>
                <Link>
                  <button
                    onClick={handleLogOut}
                    className="bg-transparent text-black border-2 border-black px-5 py-2 font-body font-semibold rounded hover:text-orange-600 hover:bg-orange-300 duration-300 hover:border-orange-400"
                    type="button"
                  >
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <div className="tooltip tooltip-bottom">
                  <img className="h-10 object-contain rounded-lg" src="" />
                </div>
                <Link to="/login">
                  <button
                    className="bg-transparent border-2 px-5 py-2 text-black border-black font-body font-semibold rounded hover:text-orange-600 hover:bg-orange-300 duration-300 hover:border-orange-400"
                    type="button"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
