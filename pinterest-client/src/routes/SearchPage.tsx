import { useParams } from "react-router-dom";
import { searchQuery } from "../utils/data";
import { client } from "../utils/client";
import { useEffect, useState } from "react";
import { MasonryLayout } from "../components";
import { TPin } from "../types/types";

export default function SearchPage() {
  const { searchTerm } = useParams();

  const [pins, setPins] = useState<TPin[] | []>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        console.log(data);
        console.log(pins);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    handleSearch();
    console.log(pins);
  }, [searchTerm]);
  if (loading) {
    return <p>loading...</p>;
  }

  if (pins?.length === 0 && searchTerm !== "" && !loading) {
    return <div className="container mx-auto h-screen">no pins</div>;
  }
  const el =
    pins !== null && pins.length !== 0 ? <MasonryLayout pins={pins} /> : "";

  return <div>{el}</div>;
}
