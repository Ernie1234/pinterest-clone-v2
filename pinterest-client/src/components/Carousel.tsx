type Props = {
  title: string;
};

export default function Carousel({ title }: Props) {
  return (
    <div className="snap-start flex-shrink-0 overflow-y-hidden no-scrollbar h-screen w-screen flex justify-center items-center bg-gray-400">
      {title}
    </div>
  );
}
