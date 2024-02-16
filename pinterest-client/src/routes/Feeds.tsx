import { useEffect, useState } from "react";

import { client } from "../utils/client";
import { feedQuery } from "../utils/data";
import { MasonryLayout } from "../components";
import { TPin } from "../types/types";
import { Circles } from "react-loader-spinner";

export default function Feeds() {
  const [pins, setPins] = useState<TPin[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    client.fetch(feedQuery).then((data) => {
      setPins(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen w-full flex flex-col gap-3 justify-center items-center pb-20">
        <p className="text-lg">Loading Pins...</p>
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
    <div className="py-3 px-2">{pins && <MasonryLayout pins={pins} />}</div>
  );
}
