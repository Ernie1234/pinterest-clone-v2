import { Link } from "react-router-dom";
import { Button } from ".";

export default function SeeItDoItSection() {
  return (
    <div className="bg-pink-200/85 h-screen flex flex-col md:flex-row justify-center items-center">
      <Link
        to="/search/lip-shade"
        className="flex-1 flex justify-center items-center p-6 md:p-10 lg:p-16 bg-[url('https://s.pinimg.com/webapp/shop-de8ddf10.png')] bg-cover bg-no-repeat bg-center w-full h-full cursor-pointer"
      >
        <div className="relative">
          <Link to="/search/lip-shade">
            <img
              src="https://s.pinimg.com/webapp/creator-pin-img-3bed5463.png"
              alt="seeItMakeItSectionImage1"
              className="rounded-sm md:rounded-md lg:rounded-lg w-60 "
            />
            <div className="flex flex-col justify-center items-center text-white font-semibold pt-5">
              <p>Scout the city</p>
              <p>56.7k followers</p>
            </div>
          </Link>

          <Link to="/search/lip-shade">
            <img
              className="absolute bottom-6 -left-12 w-24 h-24 rounded-full ring-2 ring-gray-500"
              src="https://s.pinimg.com/webapp/creator-avatar-262dfeba.png"
              alt="Bordered avatar"
            />
          </Link>
        </div>
      </Link>
      <div className="flex-1 flex flex-col justify-center items-center ">
        <h2 className="text-red-700/95 font-bold capitalize text-lg md:text-2xl lg:text-6xl text-center">
          See it, make it, <br />
          try it, do it
        </h2>
        <p className="text-red-700 text-lg md:text-xl lg:text-2xl text-center my-10 px-10">
          The best part of Pinterest is discovering <br /> new things and ideas
          from people
          <br /> around the world.
        </p>
        <Button title="explore" url="/explore/food-and-drink" />
      </div>
    </div>
  );
}
