import "./App.css";

import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";
import './styles/main.scss'
import './styles/components.scss'
import { useGetPlaylistsQuery, useGetPlaylistTracksQuery, useGetSearchTrackResultQuery, useGetUserQuery } from "./api/apiSlice";
import { Header } from "./components/header";

const App: FC = (): ReactElement => {
  const accessToken = useSelector(authSelectors.selectAccessToken);

  // TODO: You can access user data and now fetch user's playlists
  const { data: playlists } = useGetPlaylistsQuery()
  const { data: playlist_tracks } = useGetPlaylistTracksQuery(playlists?.items[0].tracks.href || "")
  const { data: track } = useGetSearchTrackResultQuery("aimyon")
  const { data: user } = useGetUserQuery(undefined, {
    skip: !accessToken
  });

  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    const html = document.documentElement.dataset
    html.theme = html.theme === "light" ? "dark" : "light";
    setTheme(html.theme)
    console.log(html.theme)
  }

  return (
    <div className="App" >
      {user && <Header user={user} theme={theme} toggle={toggleTheme} />}
    </div>
  );
};

export default App;
