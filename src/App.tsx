import "./App.css";

import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import './styles/main.scss'
import './styles/components.scss'
import { useGetPlaylistsQuery, useGetPlaylistTracksQuery, useGetSearchTrackResultQuery, useGetUserQuery } from "./api/apiSlice";
import { Header } from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/home";
import { UserProfile } from "./page/user";

const App: FC = (): ReactElement => {
  const [theme, setTheme] = useState("dark")
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(authSelectors.selectAccessToken);

  // TODO: You can access user data and now fetch user's playlists
  const { data: playlists } = useGetPlaylistsQuery()
  const { data: playlist_tracks } = useGetPlaylistTracksQuery(playlists?.items[0].tracks.href || "")
  const { data: track } = useGetSearchTrackResultQuery("aimyon")
  const { data: user } = useGetUserQuery(undefined, {
    skip: !accessToken
  });

  useEffect(() => {
    if (user || playlists) {
      setLoading(false)
    }
    console.log(playlists)
  }, [])


  const toggleTheme = () => {
    const html = document.documentElement.dataset
    html.theme = html.theme === "light" ? "dark" : "light";
    setTheme(html.theme)
    console.log(html.theme)
  }

  if (!user || !playlists) return <p>Error fetching data. Please reload the page.</p>

  return (
    <div className="App" >
      <BrowserRouter>
        <Header user={user} theme={theme} toggle={toggleTheme} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="user" element={<UserProfile user={user} playlists={playlists} theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
