import { useEffect, useState } from "react";
import { client } from "../utils/client";
import { TPost } from "../types/types";
import { ideaQuery } from "../utils/data";
import { Circles } from "react-loader-spinner";
import { MasonryLayoutVideo } from "../components";

export default function ExplorePage() {
  const [post, setPost] = useState<TPost[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    client.fetch(ideaQuery).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen w-full flex flex-col gap-3 justify-center items-center pb-20">
        <Circles
          height="80"
          width="80"
          color="#dc2626"
          ariaLabel="circles-loading"
        />
      </div>
    );
  return (
    <div className="py-0 px-2">
      {post && <MasonryLayoutVideo post={post} />}
    </div>
  );
}
