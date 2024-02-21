import { useContext, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SanityAssetDocument } from "@sanity/client";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

import { UserContext } from "../hooks/contextUser";
import { client } from "../utils/client";
import { catOptions } from "../utils/categories";

export default function Create() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState<SanityAssetDocument | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [imgTypeError, setimgTypeError] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isAboutFocused, setIsAboutFocused] = useState(false);
  const [isDestFocused, setIsDestFocused] = useState(false);

  // For selecting the image from device and listen to event change
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const type = selectedFile?.type;

    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/jpg" ||
      type === "image/gif" ||
      type === "image/svg"
    ) {
      setimgTypeError(false);
      setImgLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: type,
          filename: selectedFile?.name,
        })
        .then((document) => {
          setImage(document);
          setImgLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setimgTypeError(true);
    }
  };

  //  Handle form submission:for uploading the pin to sanity.io
  // console.log(user?.sub);
  const savePin = () => {
    if (title && about && destination && image?._id && category && user) {
      setPinLoading(true);
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image._id,
          },
        },
        userId: user.sub,
        postedBy: {
          _type: "postedBy",
          _ref: user.sub,
        },
        category,
      };
      client.create(doc).then(() => {
        setPinLoading(false);
        navigate("/feeds");
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex bg-gray-200">
      <div className="flex flex-col gap-y-10 bg-purple-800 h-full max-w-fit"></div>
      {pinLoading ? (
        <div className="min-h-screen w-full flex justify-center items-center pb-20">
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
      ) : (
        <div className="flex-1 flex justify-center  w-full min-h-screen py-12">
          <div className="w-3/5 p-3 md:p-6 lg:p-12 flex flex-col justify-center items-center gap-3 md:gap-6 lg:gap-12 bg-white rounded-md md:rounded-lg lg:rounded-xl shadow-md md:shadow-lg lg:shadow-xl">
            {fields && (
              <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
                Please fill in all the fields!
              </p>
            )}

            {/* the main element of upload */}
            <div className="flex flex-col md:flex-row md:gap-6 lg:gap-12 ">
              <div className="flex flex-col" id="left section">
                {/* Image upload section */}
                <div className="lg:w-72 h-[30rem] bg-gray-200 rounded-md md:rounded-lg lg:rounded-xl p-4 flex justify-center items-center cursor-pointer">
                  {/* image upload section that add border */}
                  <div className="bg-gray-200 rounded-md md:rounded-lg lg:rounded-xl p-3 border-2 border-dashed border-gray-300 w-full h-full flex flex-col justify-center items-center">
                    {imgLoading && <div>loading...</div>}
                    {imgTypeError && <div>wrong image type</div>}
                    {!image ? (
                      <label className="w-full h-full flex flex-col  items-center justify-center cursor-pointer">
                        <div className="flex-1  flex flex-col justify-center items-center gap-3 md:gap-5 lg:gap-8 text-center ">
                          <div className="bg-gray-500 rounded-full shadow p-2 flex justify-center items-center">
                            <FaArrowUp className="text-gray-200" />
                          </div>
                          <p>Drag and drop or click to upload.</p>
                        </div>
                        <p className="content-end text-gray-500 text-xs text-center">
                          We recommend using high quality .jpg files less than
                          20 MB
                        </p>
                        <input
                          type="file"
                          name="upload-img"
                          onChange={uploadImage}
                          className="w-0 h-0 "
                        />
                      </label>
                    ) : (
                      <div className="relative h-full">
                        <img
                          src={image?.url}
                          alt="uploaded-pic"
                          className="object-fit w-full"
                        />
                        <button
                          type="button"
                          className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                          onClick={() => setImage(null)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* save  button */}
                <button
                  className="w-full mt-3 bg-gray-200 p-3 rounded-full"
                  onClick={savePin}
                >
                  upload
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between pb-3 md:pb-8 lg:pb-12">
                <div>
                  {/* selection div  */}
                  <div className="flex justify-end items-end w-full mb-4">
                    <div className="w-3/5 flex">
                      {/* <label className="sr-only">Choose a state</label> */}
                      <select
                        id="category"
                        className="appearance-none text-sm rounded-s-md md:rounded-s-lg lg:rounded-s-xl border-2 border-e-0 border-red-200 outline-none block w-full p-2.5 bg-gray-200 placeholder-gray-200 text-gray-800 hover:border-red-300 focus:border-red-400
                      "
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        defaultValue="others"
                      >
                        <option selected value="others">
                          Choose a Category
                        </option>
                        {catOptions.map((category) => (
                          <option value={category.name} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="category"
                        className="p-2.5 text-sm text-gray-100 font-bold bg-red-500 rounded-e-md md:rounded-e-lg lg:rounded-e-xl"
                      >
                        Category
                      </label>
                    </div>
                  </div>

                  {/* title input div */}
                  <div>
                    <input
                      type="text"
                      placeholder="Add your title"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={(e) => {
                        const value = e.target.value;
                        // if (!isNaN(Number(value))) return;
                        if (value.length <= 100) {
                          setTitle(value);
                        }
                      }}
                      className="w-full min-h-fit border-b-2 border-gray-500 focus:border-blue-500 outline-none font-bold text-xl md:text-2xl lg:text-4xl text-gray-900 placeholder:text-4xl placeholder:text-gray-500 py-2"
                    />

                    <label
                      className={`${
                        isFocused ? "opacity-1" : "opacity-0"
                      } flex justify-between items-center  transition-all duration-500 ease-in-out`}
                    >
                      <span className="text-gray-500 text-xs text-center">
                        Your first 40 characters are what show up in feeds
                      </span>
                      <span className="text-gray-500 text-xs text-center">
                        {100 - title?.length}
                      </span>
                    </label>
                  </div>

                  {/* uploader details area */}
                  <div className="my-5">
                    {/* uploader image and name in flex */}
                    {user && (
                      <div className="flex gap-5 items-center">
                        <div>
                          <img
                            className="w-14 h-14 p-1 rounded-full ring-transparent ring-slate-300 hover:ring-2"
                            src={user?.picture}
                            alt="user-avatar"
                          />
                        </div>
                        <div>
                          <p className="text-xl">{user?.name}</p>
                          <p className="text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* about input div */}
                  <div>
                    <input
                      type="text"
                      placeholder="Tell everyone what your Pin is about"
                      onFocus={() => setIsAboutFocused(true)}
                      onBlur={() => setIsAboutFocused(false)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 500) {
                          setAbout(value);
                        }
                      }}
                      className="w-full min-h-fit border-b-2 border-gray-500 focus:border-blue-500 outline-none font-semibold text-xl text-gray-900  placeholder:text-gray-500 py-2"
                    />

                    <label
                      className={`${
                        isAboutFocused ? "opacity-1" : "opacity-0"
                      } flex justify-between items-center  transition-all duration-500 ease-in-out`}
                    >
                      <span className="text-gray-500 text-xs text-center">
                        People will usually see the first 50 characters when
                        they click on your Pin
                      </span>
                      <span className="text-gray-500 text-xs text-center">
                        {500 - title?.length}
                      </span>
                    </label>
                  </div>
                </div>
                {/* for destination */}
                <div>
                  <p className="text-gray-500 capitalize -mb-1">
                    Add a destination link
                  </p>
                  <input
                    type="text"
                    placeholder="Url to what your Pin is about"
                    onFocus={() => setIsDestFocused(true)}
                    onBlur={() => setIsDestFocused(false)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDestination(value);
                    }}
                    className="w-full min-h-fit border-b-2 border-gray-500 focus:border-blue-500 outline-none font-semibold text-xl text-gray-900  placeholder:text-gray-500 py-2"
                  />

                  <label
                    className={`${
                      isDestFocused ? "opacity-1" : "opacity-0"
                    } flex justify-between items-center  transition-all duration-500 ease-in-out`}
                  >
                    <span className="text-gray-500 text-xs text-center">
                      People will like to visit your site or know more about
                      your Pin
                    </span>
                    <span className="text-gray-500 text-xs text-center">
                      {destination?.length}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
