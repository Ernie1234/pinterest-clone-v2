import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";

import { TPin, TUser } from "../types/types";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import { client, urlFor } from "../utils/client";
import { fetchUser } from "../utils/fetchUser";
import { useOutSideClickShareMenu } from "../hooks/outSideClickShareMenu";
import { Menu, ShareMenu } from "../components";
import { saveFn } from "../utils/saveFn";
import { useOutsideClick } from "../hooks/outsideClick";

export default function PinDetails() {
  const { pinId } = useParams();
  const user: TUser = fetchUser();
  const [visiblePin, setVisiblePin] = useState(false);
  const { visible, setVisible, ref } = useOutsideClick(false);
  const { visibleShareMenu, setVisibleShareMenu, ref2 } =
    useOutSideClickShareMenu(false);

  const shareUrl = window.location.href;

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState<TPin | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        console.log("Data fetched: ", data[0]);

        if (data[0]) {
          const query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });

          return query;
        }
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const alreadySaved = !!pinDetail?.save?.filter(
    (item) => item.postedBy?._id === user.aud
  )?.length;

  const handleHidePin = () => {
    setVisible((prev) => !prev);
    setVisiblePin((prev) => !prev);
  };
  const handleReport = () => {
    setVisible((prev) => !prev);
  };

  // loader spinner
  if (!pinDetail)
    return (
      <div className="min-h-screen w-full flex flex-col gap-3 justify-center items-center pb-20">
        <p className="text-lg">Loading Pins...</p>
        <Circles
          height="80"
          width="80"
          color="#dc2626"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  return (
    <div className="relative">
      <Link
        to="/feeds"
        className="fixed left-3 pt-5 flex justify-center items-center gap-3"
      >
        <div
          className={`${
            !scrolled ? "" : "shadow-md"
          } flex justify-center items-center p-3 bg-white  rounded-full duration-500 transition-all ease-in-out`}
        >
          <IoMdArrowRoundBack size={30} className="text-gray-800" />
        </div>
        <p
          className={`${
            !scrolled ? "opacity-100" : "opacity-0"
          } text-lg text-gray-800 font-medium duration-500 transition-all ease-in-out`}
        >
          For you
        </p>
      </Link>
      <div className="flex p-3 md:p-5 lg:p-8 ">
        <div className="flex gap-5 w-4/6 max-h-screen shadow-md md:shadow-lg lg:shadow-xl overflow-hidden rounded-md md:rounded-xl lg:rounded-2xl bg-white mx-auto">
          {/* pin main image */}
          <div className="h-full flex-1 relative">
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
            <img
              className="object-fill"
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            />
          </div>
          {/* pin main details */}
          <div className="flex-1 w-full">
            {/* first row in the detail for the share, download icon and save btn   */}
            {/* rounded-bl-md md:rounded-bl-xl lg:rounded-bl-2xl */}
            <div className="flex gap-3 py-3 pr-3 justify-between items-center relative bg-red-400">
              {/* detail for the share, download */}
              <div className="flex gap-3">
                <div
                  onClick={() => {
                    setVisibleShareMenu(true);
                  }}
                  className="flex justify-center items-center p-3 hover:bg-gray-200 focus:bg-gray-900 rounded-full duration-500 transition-all ease-in-out"
                >
                  <LuShare size={25} />
                </div>
                <div
                  onClick={() => {
                    setVisible(true);
                  }}
                  className="flex justify-center items-center p-3 hover:bg-gray-200 focus:bg-gray-900 rounded-full duration-500 transition-all ease-in-out"
                >
                  <BsThreeDots size={25} />
                </div>
              </div>
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
                    saveFn(pinDetail._id, alreadySaved);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold p-4 text-base rounded-full hover:shadow-md outline-none capitalize"
                >
                  save
                </button>
              )}

              {visibleShareMenu && (
                <ShareMenu shareUrl={shareUrl} ref2={ref2} />
              )}
              {visible && (
                <Menu
                  ref={ref}
                  url={pinDetail?.image?.asset?.url}
                  handleHidePin={handleHidePin}
                  handleReport={handleReport}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* explor more */}
      <div className="p-3 min-h-screen bg-blue-500">
        <p className="text-center">more to explore</p>
      </div>
    </div>
  );
}
