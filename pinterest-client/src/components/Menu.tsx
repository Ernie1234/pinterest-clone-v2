interface IMenu {
  ref: React.RefObject<HTMLDivElement>;
  url: string;
  right?: boolean;
  handleHidePin: () => void;
  handleReport: () => void;
}
export default function Menu({
  ref,
  url,
  right,
  handleHidePin,
  handleReport,
}: IMenu) {
  return (
    <div
      className={`${
        right
          ? "-right-8 absolute p-2 -bottom-28  rounded-md md:rounded-lg lg:rounded-xl bg-white shadow-sm md:shadow-md lg:shadow-lg z-50"
          : "absolute p-2 -bottom-28 rounded-md md:rounded-lg lg:rounded-xl bg-white shadow-sm md:shadow-md lg:shadow-lg z-50"
      } `}
      //   className="absolute p-2 -bottom-28  rounded-md md:rounded-lg lg:rounded-xl bg-white shadow-sm md:shadow-md lg:shadow-lg z-50"
      ref={ref}
    >
      <div
        onClick={handleHidePin}
        className="block px-2 py-1.5 rounded-sm md:rounded-md lg:rounded-lg font-semibold text-black hover:bg-gray-200 cursor-pointer"
      >
        Hide Pin
      </div>
      <a
        href={`${url}?dl=`}
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
  );
}
