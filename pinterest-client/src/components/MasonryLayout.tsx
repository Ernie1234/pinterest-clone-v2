import Masonry from "react-masonry-css";

import Pin from "./Pin";
import { TPin } from "../types/types";

type Props = {
  pins: TPin[] | [];
};

export default function MasonryLayout({ pins }: Props) {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex">
      {pins?.map((pin: TPin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
}
