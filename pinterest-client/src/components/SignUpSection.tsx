import { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { Login } from ".";
import { Link } from "react-router-dom";
import { footers } from "../utils/data";

export default function SignUpSection() {
  const [isShown, setIsShown] = useState(false);

  const handleClickScroll = () => {
    const element = document.getElementById("Jumbotron");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-pink-200/85 h-screen flex flex-col md:flex-row justify-center items-center bg-[url('https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4e87678a-4d85-4e82-9574-259d8c7d41b6/pintrest.jpg')] bg-cover bg-no-repeat bg-center relative">
      <div className="absolute bg-black/50 w-full h-full z-30" />
      <div className="w-full h-full flex flex-col md:flex-row absolute z-40">
        <div className="flex-1 flex justify-center items-center">
          <h3 className="text-white text-3xl md:text-5xl lg:text-7xl leading-normal py-3 font-semibold w-6/12">
            Sign up to get your ideas
          </h3>
        </div>
        <div className="flex-1 flex justify-center items-center relative ">
          <div
            onClick={handleClickScroll}
            className="h-12 w-12 hidden md:flex justify-center items-center bg-pink-900 text-white shadow-sm md:shadow-md lg:shadow-lg rounded-full absolute top-24 -left-10 z-50 cursor-pointer"
          >
            <FaChevronUp size={30} />
          </div>
          <form
            action="#"
            className="bg-white w-full md:w-3/5 h-screen py-5 md:py-16 px-5 md:px-16 lg:px-24 z-30 flex flex-col items-center "
          >
            <img
              src="/assets/pinterest-logo.png"
              alt="signupLogo"
              className="w-12"
            />
            <h3 className="text-gray-900 text-xl md:text-2xl font-semibold">
              Welcome to Pinterest
            </h3>
            <p className="text-gray-700 text-lg">find new ideas to try</p>
            <div className="flex flex-col w-full mt-6">
              <label htmlFor="email" className="p-1 text-sm text-gray-800">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="border-2 border-gray-300 p-3 rounded-lg md:rounded-xl lg:rounded-2xl"
              />
            </div>
            <div className="flex flex-col w-full mt-1">
              <label htmlFor="password" className="p-1 text-sm text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                required
                className="border-2 border-gray-300 p-3 rounded-lg md:rounded-xl lg:rounded-2xl"
              />
            </div>
            <div className="flex flex-col w-full mt-1">
              <label
                htmlFor="birthday"
                className="p-1 text-sm text-gray-800 flex gap-3 relative"
              >
                Birthday
                <span>
                  <IoIosInformationCircle
                    size={25}
                    color="gray"
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                  />
                  {isShown && (
                    <div className="bg-black text-white p-3 rounded-sm md:rounded-md w-52 absolute bottom-10 left-5">
                      To help keep Pinterest safe, we now required your
                      birthday. Your birthday also helps us provide more
                      personlized recommendations and relevant ads. We don't
                      share this information and it won't be visible on your
                      profile.
                    </div>
                  )}
                </span>
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                placeholder="MM/DD/YYYY"
                required
                className="border-2 border-gray-300 p-3 rounded-lg md:rounded-xl lg:rounded-2xl placeholder:text-sm text-gray-500 placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white rounded-full capitalize p-3 w-full mt-2 md:mt-4"
            >
              continue
            </button>
            <h3 className="text-gray-700 py-2 font-bold">OR</h3>
            <Login />
            <p className="text-xs text-gray-500 text-center mt-3">
              By continuing, you agree to Pinterest's
              <br />
              <Link
                to="/terms"
                className="text-gray-900 underline decoration-transparent hover:decoration-gray-900 font-semibold"
              >
                Terms and Service
              </Link>{" "}
              and aknowlegde you've read our{" "}
              <Link
                to="/privacy"
                className="text-gray-900 underline decoration-transparent hover:decoration-gray-900 font-semibold"
              >
                Privacy Policy.
              </Link>
              <Link
                to="/notice"
                className="text-gray-900 underline decoration-transparent hover:decoration-gray-900 font-semibold"
              >
                Notice at collection
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="bg-white flex gap-3 justify-center items-center h-8 w-full absolute bottom-0 z-50">
        {footers.map((footer) => (
          <Link
            to={`/${footer}`.toLowerCase()}
            key={footer}
            className="text-xs text-gray-900 underline decoration-transparent  hover:decoration-gray-900 font-semibold"
          >
            {footer}
          </Link>
        ))}
      </div>
    </div>
  );
}
