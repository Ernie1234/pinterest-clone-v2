import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpRightCircleFill, BsThreeDots } from "react-icons/bs";

import { TPin, TUser } from "../types/types";
import { fetchUser } from "../utils/fetchUser";
import { client, urlFor } from "../utils/client";
import { LuShare } from "react-icons/lu";
import { useOutsideClick } from "../hooks/outsideClick";
import { ShareMenu } from ".";
import { useOutSideClickShareMenu } from "../hooks/outSideClickShareMenu";

type Props = {
  pin: TPin;
};

export default function Pin({ pin: { image, _id, destination, save } }: Props) {
  const [postHovered, setPostHovered] = useState(false);
  const [visiblePin, setVisiblePin] = useState(false);

  const { visible, setVisible, ref } = useOutsideClick(false);
  const { visibleShareMenu, setVisibleShareMenu, ref2 } =
    useOutSideClickShareMenu(false);
  const navigate = useNavigate();
  const user: TUser = fetchUser();
  //   console.log(user._id, user.aud, save);

  //!this is for testing the share link if it's working...NOTE:link doesn't work of local host
  const shareUrl = window.location.href;

  //   console.log(shareUrl);
  //   const shareUrl =
  //     "https://www.linkedin.com/pulse/reusable-share-button-using-solid-principles-react-rafael-perozin/";

  const alreadySaved = !!save?.filter((item) => item.postedBy?._id === user.aud)
    ?.length;
  //   const alreadySaved = !!save?.filter((item) => item.postedBy?._id === user._id)?.length;

  const handleMenuState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
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

  //   function to handle delete a pin from the database if it's the user

  //   function to handle hide and undo hide pins
  const handleHidePin = () => {
    setVisible(false);
    setVisiblePin((prev) => !prev);
  };

  //   function to handle report pins
  const handleReport = () => {};

  return (
    <div className="m-2 lg:my-8 w-max relative">
      {visiblePin && (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/85 backdrop-blur-sm rounded-md md:rounded-lg lg:rounded-xl overflow-hidden transition-all duration-500 ease-in-out z-[20] flex justify-start items-start">
          <div className="p-3">
            <p className="text-gray-200">
              Got it! We won't show you this Pin in the future.
            </p>
            <button
              onClick={handleHidePin}
              className="text-white font-semibold pt-3"
            >
              Undo
            </button>
          </div>
        </div>
      )}
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
              {/* saving btn */}
              {alreadySaved ? (
                <button
                  type="button"
                  disabled
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
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-3 text-base rounded-3xl hover:shadow-md outline-none capitalize"
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
                    setVisibleShareMenu((prev) => !prev);
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
      {visibleShareMenu && <ShareMenu shareUrl={shareUrl} ref2={ref2} right />}
      {visible && (
        <div
          className="absolute p-2 -bottom-28 -right-8 rounded-md md:rounded-lg lg:rounded-xl bg-white shadow-sm md:shadow-md lg:shadow-lg z-50"
          ref={ref}
        >
          <div
            onClick={handleHidePin}
            className="block px-2 py-1.5 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 cursor-pointer"
          >
            Hide Pin
          </div>
          <a
            href={`${image?.asset?.url}?dl=`}
            download
            onClick={(e) => e.stopPropagation()}
            className="block px-2 py-1.5 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 "
          >
            Download image
          </a>
          <div
            onClick={handleReport}
            className="block px-2 py-1.5 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 cursor-pointer"
          >
            Report Pin
          </div>
        </div>
      )}
    </div>
  );
}
