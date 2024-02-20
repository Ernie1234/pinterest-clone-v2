import { Link } from "react-router-dom";

type Props = {
  searchTerm: string;
  imgUrl: string;
};
export default function SearchCatalogues({ searchTerm, imgUrl }: Props) {
  return (
    <Link
      to={`/search/${searchTerm}`}
      className="rounded-md md:rounded-lg lg:rounded-2xl w-full h-28 overflow-hidden bg-gray-100 flex items-center"
    >
      <div className="w-1/3">
        <img src={imgUrl} alt="SHEIN USA" className="object-cover" />
      </div>
      <p className="w-2/3 mx-4 font-medium">{searchTerm}</p>
    </Link>
  );
}
