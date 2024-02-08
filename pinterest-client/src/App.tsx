import { Route, Routes, useLocation } from "react-router-dom";
import { ExplorePage, Feeds, Home, VideosPage } from "./routes";
import { Navbar, SearchNavBar } from "./components";
import { UserContext } from "./hooks/contextUser";

const App = () => {
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <UserContext.Provider value={user}>
      <div>
        {pathname === "/" ? <Navbar /> : <SearchNavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
