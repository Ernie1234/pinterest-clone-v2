import { Link } from "react-router-dom";
import { Login } from ".";

export default function Navbar() {
  return (
    <nav className="bg-white fixed w-full z-50 top-0 start-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-5">
        <div className="flex gap-6 lg:gap-8">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/assets/pinterest-logo.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600">
              Pinterest
            </span>
          </Link>

          <ul className="flex justify-center items-center font-medium ">
            <Link to="/videos">
              <li className="block py-2 px-3 font-semibold text-gray-950 hover:bg-gray-200 rounded-md capitalize cursor-pointer">
                Watch
              </li>
            </Link>
            <Link to="/explore">
              <li className="block py-2 px-3 font-semibold text-gray-950 hover:bg-gray-200 rounded-md capitalize cursor-pointer">
                explore
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-6 lg:gap-8" id="right">
          <ul className="flex justify-center items-center font-medium ">
            <Link to="/about">
              <li className="block py-2 px-3 font-semibold text-gray-950 hover:underline decoration-1 rounded-md capitalize">
                About
              </li>
            </Link>
            <Link to="/business">
              <li className="block py-2 px-3 font-semibold text-gray-950 hover:underline decoration-1 rounded-md capitalize">
                business
              </li>
            </Link>
            <Link to="/blog">
              <li className="block py-2 px-3 font-semibold text-gray-950 hover:underline decoration-1 rounded-md capitalize">
                blog
              </li>
            </Link>
          </ul>
          <Login />
        </div>
      </div>
    </nav>
  );
}
