import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpRightCircleFill, BsThreeDots } from "react-icons/bs";

import { TPin, TUser } from "../types/types";
import { fetchUser } from "../utils/fetchUser";
import { client, urlFor } from "../utils/client";
import { LuShare } from "react-icons/lu";

type Props = {
  pin: TPin;
};
export default function Pin({ pin: { image, _id, destination, save } }: Props) {
  const [postHovered, setPostHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user: TUser = fetchUser();
  //   console.log(user._id, user.aud, save);

  const alreadySaved = !!save?.filter((item) => item.postedBy?._id === user.aud)
    ?.length;
  //   const alreadySaved = !!save?.filter((item) => item.postedBy?._id === user._id)?.length;

  const handleMenuState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const savePin = (id: string) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.aud,
            postedBy: {
              _type: "postedBy",
              _ref: user.aud,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  //  useEffect(() => {
  //    function handleClickOutside(event) {
  //      if (ref.current && !ref.current.contains(event.target)) {
  //        alert("You clicked outside of me!");
  //      }
  //    }
  //    document.addEventListener("mousedown", handleClickOutside);
  //    return () => {
  //      document.removeEventListener("mousedown", handleClickOutside);
  //    };
  // }, [ref]);

  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);

  return (
    <div className="m-2 w-max relative">
      <div
        className=" relative cursor-pointer w-auto hover:shadow-lg rounded-md md:rounded-lg lg:rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt={_id}
          className="rounded-sm md:rounded-md lg:rounded-lg w-full"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-2 pb-2 z-30"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-end">
              {/* <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div> */}

              {/* saving btn */}
              {alreadySaved ? (
                <button
                  type="button"
                  className=" bg-gray-900 text-white font-bold p-4 text-base rounded-full hover:shadow-md outline-none capitalize"
                >
                  saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none capitalize"
                >
                  save
                </button>
              )}
            </div>

            {/* bottom btn and func */}
            <div className="flex items-center justify-evenly gap-3 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white flex-1 flex items-center gap-2 text-black font-bold p-1.5 pl-4 pr-4 rounded-full opacity-80 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination?.length > 16
                    ? destination?.slice(8, 16) + "..."
                    : destination?.slice(8)}
                </a>
              )}
              <div className="flex gap-1">
                <div
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100 hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <LuShare />
                </div>
                <div
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100 hover:shadow-md outline-none"
                  onClick={handleMenuState}
                >
                  <BsThreeDots />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="absolute bg-purple-600 w-20 h-12 -bottom-12 right-0 rounded-md md:rounded-lg lg:rounded-xl"
          //   ref={wrapperRef}
        ></div>
      )}
    </div>
  );
}
