import { Carousel } from ".";

const data = [
  { id: 1, title: "weeknight dinner idea" },
  { id: 2, title: "brunch menu" },
  { id: 3, title: "home decor idea" },
  { id: 4, title: "new look outfit" },
];

export default function Jumbotron() {
  setInterval(() => {
    // const slider = document.getElementById("slider");
  }, 1000);
  return (
    <div className="snap-start bg-orange-200 grid w-screen h-screen place-items-center text-xl">
      <div
        className="w-screen h-screen flex overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar"
        id="slider"
      >
        {data.map((item) => (
          <Carousel key={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
}
