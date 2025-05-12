import "./App.css";

import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";
import { useGetPlaylistsQuery, useGetPlaylistTracksQuery, useGetSearchTrackResultQuery, useGetUserQuery } from "./api/apiSlice";

const App: FC = (): ReactElement => {
  const accessToken = useSelector(authSelectors.selectAccessToken);

  // TODO: You can access user data and now fetch user's playlists
  const { data: playlists } = useGetPlaylistsQuery()
  const { data: playlist_tracks } = useGetPlaylistTracksQuery(playlists?.items[0].tracks.href || "")
  const { data: track } = useGetSearchTrackResultQuery("aimyon")
  const { data: user } = useGetUserQuery(undefined, {
    skip: !accessToken
  });

  console.log(user);
  console.log("PLAYLISTS: ", playlists)
  // console.log("PLAYLIST TRACKS: ", playlist_tracks)
  // console.log("TRACK: ", track)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
