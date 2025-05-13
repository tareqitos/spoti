import "./App.css";

import { FC, ReactElement } from "react";
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

  // console.log(user);
  // console.log("PLAYLISTS: ", playlists)
  // console.log("PLAYLIST TRACKS: ", playlist_tracks)
  // console.log("TRACK: ", track)

  const toggleTheme = () => {
    const html = document.documentElement.dataset
    html.theme = html.theme === "light" ? "dark" : "light";
    console.log(html.theme)
  }

  return (
    <div className="App" >
      <Header />
      {/* <button className='' onClick={toggleTheme}>Theme</button> */}
    </div>
  );
};

export default App;
