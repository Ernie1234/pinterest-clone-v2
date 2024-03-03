import Masonry from "react-masonry-css";

import Pin from "./Pin";
import { TPin } from "../types/types";

type Props = {
  pins: TPin[] | [];
};

export default function MasonryLayout({ pins }: Props) {
  const breakpointColumnsObj = {
    default: 4,
    3000: 7,
    2000: 6,
    1200: 5,
    1000: 4,
    800: 3,
    500: 2,
  };
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex">
      {pins?.map((pin: TPin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
}
