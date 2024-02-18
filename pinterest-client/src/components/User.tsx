import { Link } from "react-router-dom";

type UserProps = {
  imgSrc: string;
  name?: string;
  email?: string;
  imgSize?: number;
  margin?: number;
  userId: string;
  follow?: boolean;
};

export default function User({
  imgSrc,
  name,
  email,
  imgSize = 10,
  margin = 4,
  userId,
  follow = true,
}: UserProps) {
  return (
    <>
      {follow ? (
        <Link
          to={`/user/${userId}`}
          className={`mb-${margin} flex justify-between items-center cursor-pointer`}
        >
          <div className="flex justify-center items-center gap-4">
            <img
              src={imgSrc}
              alt={name}
              className={`h-${imgSize} w-${imgSize} rounded-full`}
            />
            <div>
              <p className="font-medium">{name}</p>
              {email && <p>{email}</p>}
            </div>
          </div>

          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-normal py-2 px-4 rounded-full">
            follow
          </button>
        </Link>
      ) : (
        <img
          src={imgSrc}
          alt={name}
          className={`h-${imgSize} w-${imgSize} rounded-full cursor-pointer`}
        />
      )}
    </>
  );
}
