import { useEffect, useState } from "react";
import { client } from "../utils/client";
import { feedQuery } from "../utils/data";
import { MasonryLayout } from "../components";
import { TPin } from "../types/types";

export default function Feeds() {
  const [pins, setPins] = useState<TPin[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    client.fetch(feedQuery).then((data) => {
      console.log("Data fetched: ", data);
      setPins(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-3 px-2">{pins && <MasonryLayout pins={pins} />}</div>
  );
}
