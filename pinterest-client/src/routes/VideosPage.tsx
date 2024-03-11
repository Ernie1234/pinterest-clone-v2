import { useEffect, useState } from "react";

import { TPost } from "../types/types";
import { postQuery } from "../utils/data";
import { client } from "../utils/client";
import { MasonryLayoutVideo } from "../components";
import { Circles } from "react-loader-spinner";

export default function VideosPage() {
  const [post, setPost] = useState<TPost[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    client.fetch(postQuery).then((data) => {
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
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-3xl pb-5 font-semibold">
          We're adding new ideas to your home feed!
        </p>
      </div>
    );

  return (
    <div className="py-0 px-2">
      {post && <MasonryLayoutVideo post={post} />}
    </div>
  );
}
