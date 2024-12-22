import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/react.svg";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
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
      })
      .catch((error) => {
        const errorCode = error.message;
        console.log(errorCode);
      });
  };
  return (
    <div className="shadow-lg">
      <div className="navbar w-10/12 mx-auto justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {li}
            </ul>
          </div>
          <Link className=" text-xl flex items-center gap-2 font-bold"><img src={logo} className="animate-spin-slow" alt="Product Recommendation System" /><span>PRS</span></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">{li}</ul>
          <div className="ml-5">
            {user ? (
              <div className="flex gap-3 items-center">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <img
                    className="h-10 object-contain rounded-lg"
                    src={
                      user?.photoURL !== "" ? user?.photoURL : user?.photoURL
                    }
                  />
                </div>
                <Link>
                  <button
                    onClick={handleLogOut}
                    className="bg-transparent border-2 border-fireb px-5 py-2 text-fireb font-body font-semibold rounded"
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
                    className="bg-transparent border-2 border-mongo px-5 py-2 text-mongo font-body font-semibold rounded"
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
