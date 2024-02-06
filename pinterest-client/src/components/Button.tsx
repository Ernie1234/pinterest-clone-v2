import { Link } from "react-router-dom";

type BtnProps = {
  title: string;
  url: string;
};

export default function Button({ title, url }: BtnProps) {
  return (
    <Link
      to={url}
      className="bg-red-600 text-white rounded-full capitalize p-3"
    >
      {title}
    </Link>
  );
}
