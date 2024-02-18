import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { TSanityUser } from "../types/types";
import { useEffect, useState } from "react";
import { userQuery } from "../utils/data";
import { client } from "../utils/client";
import { LuShare } from "react-icons/lu";
import { useOutSideClickShareMenu } from "../hooks/outSideClickShareMenu";
import { Menu, ShareMenu } from "../components";
import { BsThreeDots } from "react-icons/bs";
import { useOutsideClick } from "../hooks/outsideClick";

export default function UserProfile() {
  const { userId } = useParams();
  const shareUrl = window.location.href;

  const [user, setUser] = useState<TSanityUser | null>(null);
  const [active, setActive] = useState<"created" | "saved">("created");

  const { visible, setVisible, ref } = useOutsideClick(false);
  const { visibleShareMenu, setVisibleShareMenu, ref2 } =
    useOutSideClickShareMenu(false);

  // If the user is provided via URL parameter, fetch that specific user.
  const getUser = () => {
    if (userId) {
      const query = userQuery(userId);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  };

  // Fetches the user data when the component mounts.
  useEffect(() => {
    getUser();
  }, [userId]);

  // Otherwise, display a loading spinner while we fetch the current logged-in user's profile.
  if (!user || userId === undefined)
    return (
      <div className="min-h-screen w-full flex flex-col gap-3 justify-center items-center pb-20">
        <p className="text-2xl pb-5 font-semibold">Getting Profile</p>
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
    <div className="w-full relative min-h-screen">
      {/* user header */}
      <div className="flex flex-col mt-8 md:mt-10 lg:mt-14">
        {/*  User Avatar and name */}
        <div className="mx-auto flex flex-col justify-center items-center">
          <img
            src={user?.avatar}
            alt={user?.username + "'s avatar"}
            className="h-28 w-28  object-cover rounded-full shadow-md"
          />
          <h2 className="font-semibold text-xl md:text-2xl lg:text-4xl my-4">
            {user?.username}
          </h2>
        </div>
        {/* user  stats */}
        <div className="flex flex-row justify-center gap-8 items-center mt-3 mb-10">
          <div
            onClick={() => {
              setVisibleShareMenu(true);
            }}
            className="relative flex justify-center items-center p-3 hover:bg-gray-200 focus:bg-gray-900 rounded-full duration-500 transition-all ease-in-out"
          >
            {/*  share menu */}
            {visibleShareMenu && <ShareMenu shareUrl={shareUrl} ref2={ref2} />}
            <LuShare size={25} />
          </div>
          {/* Button Wrapper */}
          <div className="flex gap-4">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 px-4 rounded-full">
              Message
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-gray-50 font-medium py-3 px-4 rounded-full">
              Follow
            </button>
          </div>
          <div
            onClick={() => {
              setVisible(true);
            }}
            className="relative flex justify-center items-center p-3 hover:bg-gray-200 focus:bg-gray-900 rounded-full duration-500 transition-all ease-in-out"
          >
            {visible && (
              <Menu
                url="https://github.com/lucodevito/lucodes"
                visible={visible}
                handleHidePin={() => {}}
                handleReport={() => {}}
                ref={ref}
              />
            )}
            <BsThreeDots size={25} />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full z-40">
        <button
          onClick={() => {
            setActive("created");
          }}
          className={`${active == "created" ? "bg-red-500" : "bg-white"} p-4`}
        >
          created
        </button>
        <button
          onClick={() => {
            setActive("saved");
          }}
          className={`${active == "saved" ? "bg-red-500" : "bg-white"} p-4`}
        >
          saved
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}
