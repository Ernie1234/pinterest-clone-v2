import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { fetchUser } from "../utils/fetchUser";
import { TPost, TUser } from "../types/types";
import { BsFillArrowUpRightCircleFill, BsThreeDots } from "react-icons/bs";
import { client, urlFor } from "../utils/client";
import { useOutsideClick } from "../hooks/outsideClick";
import { useOutSideClickShareMenu } from "../hooks/outSideClickShareMenu";
import { LuShare } from "react-icons/lu";
import { ShareMenu } from ".";

interface Props {
  post: TPost;
}

function PostPin({
  post: {
    image,
    video,
    _id,
    title,
    destination,
    save,
    category,
    about,
    postedBy,
  },
}: Props) {
  const navigate = useNavigate();
  const user: TUser = fetchUser();

  const [visiblePin, setVisiblePin] = useState(false);
  const [postHovered, setPostHovered] = useState(false);

  const { visible, setVisible, ref } = useOutsideClick(false);
  const { visibleShareMenu, setVisibleShareMenu, ref2 } =
    useOutSideClickShareMenu(false);

  const savePin = (id: string) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const shareUrl = window.location.href;
  const alreadySaved = !!save?.filter(
    (item) => item.postedBy?._id === user?.sub
  )?.length;
  const handleHidePin = () => {
    setVisiblePin((prev) => !prev);
  };
  const handleMenuState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
  };
  const handleReport = () => {};

  return (
    <>
      <div className="m-2 lg:my-8 relative">
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
          onClick={() => {
            user.email_verified
              ? navigate(`/pin-detail/${_id}`)
              : navigate("/", { replace: true });
          }}
        >
          {video && (
            <video
              width="750"
              height="500"
              // controls
              className="rounded-sm md:rounded-md lg:rounded-lg w-full"
            >
              <source src={video.asset.url} type="video/mp4" />
            </video>
          )}
          {image && (
            <img
              src={urlFor(image).width(250).url()}
              alt={_id}
              className="rounded-sm md:rounded-md lg:rounded-lg w-full"
            />
          )}

          {user ? (
            postHovered && (
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
            )
          ) : (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/60 backdrop-blur-none rounded-md md:rounded-lg lg:rounded-xl overflow-hidden transition-all duration-500 ease-in-out z-[20] flex flex-col justify-between items-start p-3">
              <div className="bg-white/80 py-1 px-1.5 rounded-full">
                <p className="text-xs text-black font-medium">01:11</p>
              </div>
              <p className="text-center self-center text-white font-medium text-lg md:text-xl lg:text-2xl capitalize">
                open
              </p>
              <p className="text-white font-medium text-sm capitalize flex gap-1">
                destination
              </p>
            </div>
          )}
        </div>
        {visibleShareMenu && (
          <ShareMenu shareUrl={shareUrl} ref2={ref2} right />
        )}
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

            <div
              onClick={handleReport}
              className="block px-2 py-1.5 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 cursor-pointer"
            >
              Report Pin
            </div>
          </div>
        )}
        <div className="py-1.5 flex flex-col gap-1">
          <p className="bg-gray-400/50 py-1 px-2.5 max-w-fit rounded-full">
            {category}
          </p>
          <p className="font-medium capitalize">{title}</p>
          <p>{about}</p>
          <Link
            to={`/user/${postedBy._id}`}
            className="mb- flex justify-between items-center cursor-pointer"
          >
            <div className="flex justify-center items-center gap-4">
              <img
                src={postedBy.avatar}
                alt={postedBy.username}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">{postedBy.username}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PostPin;
