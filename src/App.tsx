import "./App.css";
import './styles/main.scss';
import './styles/components.scss';

import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authSelectors } from "./containers/auth/selectors";
import { useGetPlaylistsQuery, useGetUserQuery } from "./api/apiSlice";
import { Header } from "./components/Header";
import { Home } from "./page/Home";
import { UserProfile } from "./page/User";
import { HomePageSkeleton } from "./components/ui/Skeleton";
import { SpotifyTrackItem } from "./types";
import { TrackBar } from "./components/homepage/TrackBar";

const App: FC = (): ReactElement => {
  const [theme, setTheme] = useState("dark");
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrackItem | null>(null);
  const [searchResults, setSearchResults] = useState<SpotifyTrackItem[] | null>(null);
  const [trackbarVisible, setTrackbarVisible] = useState(false);

  const accessToken = useSelector(authSelectors.selectAccessToken);
  const { data: playlists } = useGetPlaylistsQuery();
  const { data: user } = useGetUserQuery(undefined, {
    skip: !accessToken,
  });

  if (!accessToken) {
    return <div>Loading... Please try to refresh the page  </div>;
  }

  const toggleTheme = () => {
    const html = document.documentElement.dataset;
    html.theme = html.theme === "light" ? "dark" : "light";
    setTheme(html.theme);
  };

  const setTrack = (track: SpotifyTrackItem | null) => {
    setSelectedTrack(track);
    setTrackbarVisible(true);
  };

  const hideTrackPanel = () => {
    if (trackbarVisible) {
      setSelectedTrack(null);
      setTrackbarVisible(false);
    }
  };

  return (
    <div className="App" >
      <BrowserRouter>
        {user &&
          <Header
            user={user}
            theme={theme}
            toggle={toggleTheme}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setTrack={setTrack}
            hideTrack={hideTrackPanel}
          />
        }
        <Routes>
          <Route index element={
            playlists ?
              <Home
                playlists={playlists}
                setSelectedTrack={setTrack}
                setTrackbarVisible={setTrackbarVisible}
              /> : <HomePageSkeleton />}
          />
          <Route
            path="user"
            element={user && playlists ? <UserProfile user={user} playlists={playlists} theme={theme} /> : <div>Loading User Profile...</div>}
          />
        </Routes>
        <section className={`trackbar ${trackbarVisible ? "show" : ""}`}>
          {selectedTrack && <TrackBar track={selectedTrack} hideTrack={hideTrackPanel} />}
        </section>
      </BrowserRouter>
    </div>
  );
};

export default App;
