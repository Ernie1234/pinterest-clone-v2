import { Route, Routes, useLocation } from "react-router-dom";
import {
  Create,
  ExplorePage,
  Feeds,
  Home,
  PinDetails,
  SearchPage,
  UserProfile,
  VideosPage,
} from "./routes";
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
          <Route path="/create" element={<Create />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/search/:searchTerm" element={<SearchPage />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
