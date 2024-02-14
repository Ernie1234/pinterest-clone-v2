import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { FaLink } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";
import { IoPeople } from "react-icons/io5";

interface ISharemenuProps {
  shareUrl: string;
  ref2: React.RefObject<HTMLDivElement>;
}

export default function ShareMenu({ shareUrl, ref2 }: ISharemenuProps) {
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        console.log("Text copied to clipboard:" + shareUrl);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };
  return (
    <div
      className="absolute p-5 -bottom-28 right-8 rounded-md md:rounded-lg lg:rounded-xl bg-white shadow-sm md:shadow-md lg:shadow-lg z-50 divide-y divide-gray-500 flex flex-col justify-center items-center"
      ref={ref2}
    >
      <div className="pb-5">
        <p className="font-medium text-base text-gray-800 capitalize text-center py-4">
          Send on Pinterest
        </p>
        <div className="flex justify-start items-center flex-wrap gap-5 pl-3 w-52 md:w-72 lg:w-96">
          <div className="flex flex-col justify-center items-center">
            <Link
              to="/search"
              className="bg-gray-200 w-12 h-12 p-3 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
              onClick={() => {}}
            >
              <ImSearch size={45} />
            </Link>
            <p className="text-xs p-1 font-normal">Search</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link
              to="/import"
              className="bg-gray-200 w-12 h-12 p-3 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
              onClick={() => {}}
            >
              <IoPeople size={45} />
            </Link>
            <p className="text-xs capitalize p-1 font-normal">add</p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-medium text-base text-gray-800 capitalize text-center py-4">
          share
        </p>
        <div className="flex justify-center items-center flex-wrap gap-5 w-52  md:w-72 lg:w-96">
          <div className="flex flex-col justify-center items-center">
            <WhatsappShareButton
              url={shareUrl}
              className="rounded-full opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
            >
              <WhatsappIcon size={45} round />
            </WhatsappShareButton>
            <p className="text-xs p-1 font-normal">WhatsApp</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <FacebookMessengerShareButton
              appId={import.meta.env.VITE_FACEBOOK_APPID}
              url={shareUrl}
              className="rounded-full opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
            >
              <FacebookMessengerIcon size={45} round />
            </FacebookMessengerShareButton>
            <p className="text-xs p-1 font-normal">Facebook</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <FacebookShareButton
              url={shareUrl}
              className="rounded-full opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
            >
              <FacebookIcon size={45} round />
            </FacebookShareButton>
            <p className="text-xs p-1 font-normal">Messenger</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <TwitterShareButton
              url={shareUrl}
              className="rounded-full opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
            >
              <XIcon size={45} round />
            </TwitterShareButton>
            <p className="text-xs p-1 font-normal">X</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              className="bg-gray-200 w-12 h-12 p-3 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100 hover:shadow-md outline-none cursor-pointer"
              onClick={handleCopyLink}
            >
              <FaLink size={45} />
            </div>
            <p className="text-xs p-1 font-normal">Copy link</p>
          </div>
        </div>
      </div>
    </div>
  );
}
