import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import { TPost, TPostDetails, TUser } from "../types/types";
import { postDetailMorePinQuery, postDetailsQuery } from "../utils/data";
import { client } from "../utils/client";
import { fetchUser } from "../utils/fetchUser";
import { useOutSideClickShareMenu } from "../hooks/outSideClickShareMenu";
import { MasonryLayoutVideo, ShareMenu, User } from "../components";
import { saveFn } from "../utils/saveFn";
import { useOutsideClick } from "../hooks/outsideClick";
import { FaChevronDown, FaChevronUp, FaRegHeart } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function PostVideoDetail() {
  const { videoId } = useParams();
  const user: TUser = fetchUser();

  // state for the data of a single pin
  const [pins, setPins] = useState<TPost[]>([]);
  const [pinDetail, setPinDetail] = useState<TPostDetails | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visiblePin, setVisiblePin] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  // custom Hooks
  const { visible, setVisible, ref } = useOutsideClick(false);
  const { visibleShareMenu, setVisibleShareMenu, ref2 } =
    useOutSideClickShareMenu(false);

  const shareUrl = window.location.href;

  // Function for fetching the pin details and related pins
  const fetchPinDetails = () => {
    const query = postDetailsQuery(videoId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          const query = postDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });

          return query;
        }
      });
    }
  };

  // UseEffect to check the scroll  position and show/hide elements when scrolling
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

  //  Fetching data on mount and updating it when the component is updated
  useEffect(() => {
    fetchPinDetails();
  }, [videoId]);

  //  Rendering of JSX based on whether or not there are pins already saved for that Pin ID
  const alreadySaved = !!pinDetail?.save?.filter(
    (item) => item.postedBy?._id === user?.sub
  )?.length;

  // Function for toggling Undo button between "Hide" and "UnHide"
  const handleHidePin = () => {
    setVisible((prev) => !prev);
    setVisiblePin((prev) => !prev);
  };

  //! Function for reporting  a pin as inappropriate
  const handleReport = () => {
    setVisible((prev) => !prev);
  };

  // Check for whether or not there are comments in a pin
  const isComment = !!pinDetail?.comments;

  // = (Array.isArray(pinDetail?.comments) && pinDetail?.comments?.length <= 0) || !pinDetail ? `${pinDetail?.comments?.length} comments`
  //=  : "What do you think?";

  // Function for handling the comment
  const handleCommentFn = () => {
    if (commentText && videoId) {
      setLoading(true);
      client
        .patch(videoId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment: commentText,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          fetchPinDetails();
          setCommentText("");
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else alert("Please enter some text to submit!");

    //     .append('comments', [
    //       {text: commentText, postedBy: user.sub},
    //     ]).commit().then(()=>{
    //       setCommentText('');
    //       setTimeout(()=>{
    //         setLoading(false);
    //         fetchPinDetails()
    //       },1000);
    //     })
    //     .catch((err)=>console.log(err));
    //   }
    // else alert("Please enter some text!");
  };

  // loader spinner
  if (!pinDetail)
    return (
      <div className="min-h-screen w-full flex flex-col gap-3 justify-center items-center pb-20">
        <p className="text-2xl pb-5">Loading Pin...</p>
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
        to="/videos"
        className="fixed z-[1000] left-3 pt-5 flex justify-center items-center gap-3"
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
          } hidden md:block text-lg text-gray-800 font-medium duration-500 transition-all ease-in-out`}
        >
          For you
        </p>
      </Link>
      <div className="flex p-3 md:p-5 lg:p-8 ">
        <div className="flex flex-col md:flex-row w-full md:w-4/6 max-h-screen shadow-md md:shadow-lg lg:shadow-xl overflow-hidden rounded-md md:rounded-xl lg:rounded-2xl bg-white mx-auto">
          {/* pin main image */}
          <div className="h-full flex-1 relative">
            {visiblePin && (
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/85 backdrop-blur-sm rounded-md md:rounded-lg lg:rounded-xl md:overflow-hidden transition-all duration-500 ease-in-out z-[20] flex justify-start items-start">
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
            <video
              width="750"
              height="500"
              controls
              autoPlay
              loop
              playsInline
              muted={false}
              // className="rounded-sm md:rounded-md lg:rounded-lg w-full"
              className="object-contain"
            >
              <source src={pinDetail?.video?.asset?.url} type="video/mp4" />
            </video>
            {/* <img
              className="object-fill"
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            /> */}
          </div>
          {/* pin main details */}
          <div className="flex-1 w-full overflow-hidden flex flex-col">
            {/* first row in the detail for the share, download icon and save btn   */}
            {/* rounded-bl-md md:rounded-bl-xl lg:rounded-bl-2xl */}
            <div className="flex px-5 py-3 pr-8 justify-between items-center relative">
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
                <div
                  className="absolute p-2 -bottom-28 rounded-md md:rounded-lg lg:rounded-xl bg-white shadow-sm md:shadow-md lg:shadow-lg z-50"
                  ref={ref}
                >
                  <div
                    onClick={handleHidePin}
                    className="block px-2 py-1.5 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 cursor-pointer"
                  >
                    Hide Pin
                  </div>
                  <a
                    href={`${pinDetail?.image?.asset?.url}?dl=`}
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
            {/* second scrollable row in the detail for the title, link, about and commnents   */}
            <div className="px-8 py-35 h-full overflow-y-auto not-sr-only scroll-smooth">
              <h2 className="font-semibold text-lg md:text-xl lg:text-3xl mb-3">
                {pinDetail?.title}
              </h2>
              {pinDetail.about.length >= 150 ? (
                <p className="mb-4">
                  {isAbout ? pinDetail.about : pinDetail?.about.slice(0, 130)}
                  {isAbout ? " " : "..."}{" "}
                  {isAbout ? (
                    <span
                      className="inline-block text-nowrap cursor-pointer font-medium"
                      onClick={() => setIsAbout((prev) => !prev)}
                    >
                      Read less
                    </span>
                  ) : (
                    <span
                      className="inline-block text-nowrap cursor-pointer font-medium"
                      onClick={() => setIsAbout((prev) => !prev)}
                    >
                      Read more
                    </span>
                  )}
                </p>
              ) : (
                <p className="mb-4">{pinDetail?.about}</p>
              )}
              {/* the user who  posted this pin */}
              <User
                imgSrc={pinDetail.postedBy.avatar}
                name={pinDetail.postedBy.username}
                userId={pinDetail.postedBy._id}
              />
              {/* comments div */}
              <div
                className="font-medium capitalize flex justify-between items-center mt-8 cursor-pointer hover:underline"
                onClick={() => setShowComments((prev) => !prev)}
              >
                <h4>comments</h4>
                <div>{showComments ? <FaChevronUp /> : <FaChevronDown />}</div>
              </div>
              {isComment ? (
                showComments && (
                  <div className="my-3 flex flex-col gap-4">
                    {/* this is wehre i will cut and map the comment in */}
                    {pinDetail.comments.map((comment) => (
                      <div className="flex gap-4 items-start">
                        <img
                          src={comment.postedBy.avatar}
                          alt={comment.postedBy.username}
                          className="h-10 w-10 rounded-full object-cover aspect-[1]"
                        />
                        <div className="flex flex-col justify-center">
                          <p className="font-medium capitalize">
                            {comment.postedBy.username}
                          </p>
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div>
                  <p>No comments yet! Add one to start the conversation.</p>
                </div>
              )}
            </div>
            {/* last row in the detail for comments number and user and input for comments   */}
            <div className="border-t border-gray-200 max-h-fit mt-4 px-8 py-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-medium text-xl ">
                  {isComment
                    ? `${pinDetail?.comments?.length} ${
                        pinDetail?.comments?.length > 1 ? "comments" : "comment"
                      }  `
                    : "What do you think?"}
                </p>
                <div className="p-3 rounded-full flex items-center justify-center cursor-pointer bg-gray-200 hover:shadow">
                  <FaRegHeart size={25} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                <User
                  userId={user._id}
                  imgSrc={user.picture}
                  follow={false}
                  imgSize={12}
                />
                <div className="relative w-full p-2">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    disabled={loading}
                    className="block w-full p-4 text-base text-gray-900 border outline-none border-gray-200 transition-all duration-300 ease-in-out rounded-full  placeholder-gray-400 hover:placeholder-gray-500 bg-gray-200 hover:bg-gray-300 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleCommentFn}
                    className="text-white absolute aspect-[1] right-4 p-2 top-[20%] h-[60%] bg-red-600 hover:bg-red-700 focus:outline-none rounded-full flex justify-center items-center"
                  >
                    <IoSend size={25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* explor more */}
      {pins.length > 0 ? (
        <div className="p-3 min-h-screen ">
          <p className="text-center">more to explore</p>
          <MasonryLayoutVideo post={pins} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 my-5">
          <p className="text-lg">Loading similar Pins...</p>
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
      )}
    </div>
  );
}
