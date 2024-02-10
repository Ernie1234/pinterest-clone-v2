import Masonry from "react-masonry-css";

import Pin from "./Pin";
import { TPin } from "../types/types";

type Props = {
  pins: TPin[];
};

export default function MasonryLayout({ pins }: Props) {
  const breakpointColumnsObj = {
    default: 6,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex lg:gap-4">
      {pins.map((pin: TPin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
}
