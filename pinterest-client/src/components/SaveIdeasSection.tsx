import { Link } from "react-router-dom";
import { Button } from ".";

export default function SaveIdeasSection() {
  return (
    <div className="bg-green-100 h-screen flex flex-col md:flex-row justify-center ">
      <div className="flex-1 order-2 md:order-1 flex flex-col justify-center items-center">
        <h2 className="text-green-800 font-bold capitalize text-lg md:text-2xl lg:text-6xl">
          Save ideas you like
        </h2>
        <p className="text-green-700 text-lg md:text-2xl lg:text-2xl w-7/12 text-center my-10">
          Collect your favourites so you can get back to them later.
        </p>
        <Button title="explore" url="/explore/food-and-drink" />
      </div>
      <div className="flex-1 flex" id="image section of save idea">
        <div className="flex flex-col justify-between">
          <div className="flex">
            <Link
              to="/search/1"
              className="relative
            overflow-hidden z-10 w-96 h-96 rounded-[4rem] bg-[url('https://i.pinimg.com/564x/00/d8/c5/00d8c5c1fd52c11ab7e80029471d3726.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center shadow before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:opacity-50 before:z-[-5] mt-16 cursor-pointer"
            >
              <div className="flex flex-col justify-center items-center px-5">
                <p className="text-white text-3xl md:text-4xl lg:text-6xl text-center font-semibold pb-3">
                  Fern future home vibes
                </p>
                <div className="flex gap-3 pb-8">
                  <img
                    src="https://i.pinimg.com/564x/27/d8/ea/27d8eafaa8c16f487b5db85278e256c2.jpg"
                    alt="saveIdeaImage"
                    className="w-24 h-32 object-cover overflow-hidden rounded-3xl"
                  />
                  <img
                    src="https://i.pinimg.com/564x/c8/df/09/c8df09627c5864a26d3bbdac0a8952cf.jpg"
                    alt="saveIdeaImage"
                    className="w-24 h-32 object-cover overflow-hidden rounded-3xl"
                  />
                  <img
                    src="https://i.pinimg.com/564x/30/10/da/3010da33c3b00ca9a4926f7bd3da02a0.jpg"
                    alt="saveIdeaImage"
                    className="w-24 h-32 object-cover overflow-hidden rounded-3xl"
                  />
                </div>
              </div>
            </Link>
            <div className="flex flex-col">
              <Link
                to="/search/2"
                className="relative
            overflow-hidden z-10 mt-0 ml-16 w-56 h-60 rounded-[4rem] bg-[url('https://i.pinimg.com/564x/9d/7d/f0/9d7df042c49667850d3ba2976cbfa52d.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center shadow before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:opacity-40 before:z-[-5] cursor-pointer"
              >
                <p className="text-white text-xl md:text-3xl text-left font-semibold py-10 px-3">
                  My Scandinavian bedroom
                </p>
              </Link>
              <Link
                to="/search/3"
                className="relative
            overflow-hidden z-10 ml-10 mt-10 w-36 h-44 rounded-[2rem] bg-[url('https://i.pinimg.com/564x/9d/7d/f0/9d7df042c49667850d3ba2976cbfa52d.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center shadow before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:opacity-40 before:z-[-5] cursor-pointer"
              >
                <p className="text-white text-base md:text-xl text-left font-semibold py-8 px-3">
                  The deck of my dreams
                </p>
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-12">
            <Link
              to="/search/4"
              className="relative 
            overflow-hidden z-10  w-40 h-48 rounded-[3rem] bg-[url('https://i.pinimg.com/564x/ca/d4/84/cad4847b1b08900f1a550c5f4930c22f.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center shadow before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:opacity-40 before:z-[-5] cursor-pointer"
            >
              <p className="text-white text-xl md:text-2xl text-left font-semibold py-10 px-3">
                Serve my drinks in style
              </p>
            </Link>
            <Link
              to="/search/5"
              className="relative 
            overflow-hidden z-10 w-36 h-44 rounded-[2rem] bg-[url('https://i.pinimg.com/564x/e7/cd/8b/e7cd8b660195397c2f0d425254a7014d.jpg')] bg-cover bg-no-repeat bg-center flex items-end justify-center shadow before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-gray-900 before:to-gray-800 before:opacity-40 before:z-[-5] cursor-pointer"
            >
              <p className="text-white text-base md:text-xl text-left font-semibold py-8 px-3">
                Our bathroom
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
