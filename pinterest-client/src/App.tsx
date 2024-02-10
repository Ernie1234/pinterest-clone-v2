import { Route, Routes, useLocation } from "react-router-dom";
import { ExplorePage, Feeds, Home, PinDetails, VideosPage } from "./routes";
import { Navbar, SearchNavBar } from "./components";
import { UserContext } from "./hooks/contextUser";
import { fetchUser } from "./utils/fetchUser";

const App = () => {
  const { pathname } = useLocation();
  const user = fetchUser();

  return (
    <UserContext.Provider value={user}>
      <div>
        {pathname === "/" ? <Navbar /> : <SearchNavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
