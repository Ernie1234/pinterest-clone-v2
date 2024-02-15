import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { googleLogout } from "@react-oauth/google";

import { UserContext } from "../hooks/contextUser";
import { AiFillMessage } from "react-icons/ai";

export default function SearchNavBar() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  // console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white sticky w-full z-50 top-0 start-0 border-b border-gray-200 shadow-md">
      <div className=" flex flex-wrap gap-6 lg:gap-8 items-center justify-evenly mx-auto px-3 md:px-6 lg:px-9 py-4">
        <div className="flex gap-4 lg:gap-6">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/assets/pinterest-logo.png"
              className="h-8"
              alt="Pinterest-Logo"
            />
          </Link>

          <ul className="flex gap-1 justify-center items-center font-medium ">
            <NavLink
              to="/feeds"
              className="block py-3 px-5 font-semibold text-gray-950 hover:bg-gray-200 aria-[current=page]:text-white aria-[current=page]:bg-black rounded-full capitalize cursor-pointer"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/create"
              className="block py-3 px-5 font-semibold text-gray-950 hover:bg-gray-200 aria-[current=page]:text-white aria-[current=page]:bg-black rounded-full capitalize cursor-pointer"
            >
              <li>create</li>
            </NavLink>
          </ul>
        </div>

        {/* search  bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              className="appearance-none border-2 pl-10 transition-all duration-300 ease-in-out rounded-full w-full py-4 px-3 bg-gray-200 border-gray-200 hover:bg-gray-300/80 placeholder:text-gray-500 text-gray-950 leading-tight focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Search for easy dinner, fashion, etc."
            />

            <div className="absolute left-0 inset-y-0 flex items-center">
              <FaSearch className="ml-3 text-gray-500" />
            </div>
          </div>
        </div>

        {/* user navigation section */}
        <div className="flex items-center gap-2">
          {/* user icons */}
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out">
            <IoNotifications size={25} className="text-gray-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out">
            <AiFillMessage size={25} className="text-gray-500" />
          </div>
          {/* user avatar */}
          <div className="flex gap-6 lg:gap-8" id="right">
            {user ? (
              <Link to="/profile">
                <img
                  className="w-10 h-10 p-1 rounded-full ring-transparent ring-slate-300 hover:ring-2"
                  src={user?.picture}
                  alt="user-avatar"
                />
              </Link>
            ) : (
              <Link to="/">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </Link>
            )}
          </div>

          {/* user dropdown wrapper */}
          <div className="relative">
            {/* user dropdown  btn */}
            <div
              onClick={handleCloseMenu}
              className="inline-flex items-center justify-center p-2 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
            >
              <FaChevronDown size={20} className="text-gray-500" />
            </div>

            {/* user dropdown  menu */}
            {isOpen && (
              <div className="z-10 absolute top-16 right-0 block rounded-lg shadow-sm md:shadow-md lg:shadow-lg w-72 bg-white divide-y divide-gray-300">
                <ul
                  className="p-2 text-sm text-gray-800"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  {user && (
                    <>
                      <p>Currently in</p>
                      <li>
                        <div
                          onClick={() => {
                            handleCloseMenu;
                            navigate("/profile", { replace: true });
                          }}
                          className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                        >
                          <div className="flex gap-3 items-center">
                            <img
                              className="w-16 h-16 rounded-full"
                              src={user.picture}
                              alt="user-avatar"
                            />

                            <div>
                              <p>{user.name.slice(0, 18)}</p>
                              <p className="font-normal text-gray-500 text-sm">
                                Personal
                              </p>
                              <p className="font-normal text-gray-500 text-sm">
                                {user.email.slice(0, 16) + "..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  )}
                  <p>Your accounts</p>
                  <li>
                    <div
                      onClick={() => {
                        handleCloseMenu;
                        navigate("/account", { replace: true });
                      }}
                      className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                    >
                      Add account
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        handleCloseMenu;
                        navigate("/", { replace: true });
                      }}
                      className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                    >
                      Convert to business
                    </div>
                  </li>
                  <p>More Options</p>
                  <li>
                    <div
                      onClick={() => {
                        handleCloseMenu;
                        navigate("/setting", { replace: true });
                      }}
                      className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                    >
                      Settings
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        handleCloseMenu;
                        navigate("/help", { replace: true });
                      }}
                      className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                    >
                      Get help
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        handleCloseMenu;
                        navigate("/", { replace: true });
                      }}
                      className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                    >
                      See terms of service
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        handleCloseMenu;
                        navigate("/", { replace: true });
                      }}
                      className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
                    >
                      Your privacy rights
                    </div>
                  </li>
                </ul>
                <div className="px-2">
                  <div
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      navigate("/", { replace: true });
                    }}
                    className="block my-1 px-4 py-2 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-red-200 "
                  >
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
