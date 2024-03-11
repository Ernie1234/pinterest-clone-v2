import Masonry from "react-masonry-css";

import { TPost } from "../types/types";
import { PostPin } from ".";

type Props = {
  post: TPost[] | [];
};

export default function MasonryLayoutVideo({ post }: Props) {
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
      {post?.map((post) => (
        <PostPin key={post._id} post={post} />
      ))}
    </Masonry>
  );
}
