import { Route, Routes, useLocation } from "react-router-dom";
import { ExplorePage, Feeds, Home, VideosPage } from "./routes";
import { Navbar, SearchNavBar } from "./components";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/" ? <Navbar /> : <SearchNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </div>
  );
};

export default App;
