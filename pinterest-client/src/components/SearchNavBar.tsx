import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

import { UserContext } from "../hooks/contextUser";
import { AiFillMessage } from "react-icons/ai";

export default function SearchNavBar() {
  const user = useContext(UserContext);
  // console.log(user);
  return (
    <nav className="bg-white fixed w-full z-50 top-0 start-0 border-b border-gray-200 shadow-md">
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
            <Link to="/feeds">
              <li className="block py-3 px-5 font-semibold text-white bg-black hover:bg-gray-800 rounded-full capitalize cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/create">
              <li className="block py-3 px-4 font-semibold text-gray-950 hover:bg-gray-200 rounded-full capitalize cursor-pointer">
                create
              </li>
            </Link>
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
        <div className="flex items-center gap-3">
          {/* user icons */}

          <IoNotifications size={30} className="text-gray-500" />
          <AiFillMessage size={30} className="text-gray-500" />
          {/* user avatar */}
          <div className="flex gap-6 lg:gap-8" id="right">
            {user ? (
              <Link to="/profile">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.picture}
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
        </div>
      </div>
    </nav>
  );
}
