import { IoSearch } from "react-icons/io5";
import { Button } from ".";

export default function SearchIdeasSection() {
  return (
    <div className="bg-yellow-200 h-screen flex flex-col md:flex-row justify-center items-center">
      <div className="flex-1 flex justify-center items-center p-6 md:p-10 lg:p-16">
        <div className="relative w-fit h-full flex justify-center items-center cursor-pointer">
          <div className="bg-white shadow md:shadow-md rounded-full p-3 md:p-5 lg:p-8 absolute z-10 flex justify-center items-center gap-5">
            <IoSearch size={40} />
            <p className="text-red-900 font-bold text-2xl">
              easy chicken dinner
            </p>
          </div>
          <img
            src="https://s.pinimg.com/webapp/left-ccce7532.png"
            alt="searchIdeaSectionImage"
            className="w-48 z-[3] -mr-14"
          />
          <img
            src="https://s.pinimg.com/webapp/center-2d76a691.png"
            alt="searchIdeaSectionImage"
            className="w-72 z-[4]"
          />
          <img
            src="https://s.pinimg.com/webapp/topRight-6902088a.png"
            alt="searchIdeaSectionImage"
            className="w-48 z-[2] -ml-28 md:-mt-96 -mt-60"
          />
          <img
            src="https://s.pinimg.com/webapp/right-2bd1edfc.png"
            alt="searchIdeaSectionImage"
            className="w-40 z-[1] -ml-32 -mb-72"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <h2 className="text-red-700/95 font-bold capitalize text-lg md:text-2xl lg:text-6xl">
          Search for an idea
        </h2>
        <p className="text-red-700 text-lg md:text-2xl lg:text-2xl w-7/12 text-center my-10">
          What do you want to try next? Think of something you’re into—like
          “easy chicken dinner”—and see what you find.
        </p>
        <Button title="explore" url="/explore/food-and-drink" />
      </div>
    </div>
  );
}
