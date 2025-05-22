import "./App.css";
import './styles/main.scss';
import './styles/components.scss';

import { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authSelectors } from "./containers/auth/selectors";
import { useGetPlaylistsQuery, useGetUserQuery } from "./api/apiSlice";
import { Header } from "./components/Header";
import { Home } from "./page/Home";
import { UserProfile } from "./page/User";
import { HomePageSkeleton } from "./components/ui/Skeleton";
import { SpotifyTrackItem } from "./types";
import { TrackBar } from "./components/homepage/TrackBar";

import { showTrack, hideTrack, setTrack, selectTrack } from "./state/trackSlice";

const App: FC = (): ReactElement => {

  const dispatch = useDispatch()
  const trackState = useSelector(selectTrack)

  const accessToken = useSelector(authSelectors.selectAccessToken);
  const { data: playlists, isLoading: isLoadingPlaylists } = useGetPlaylistsQuery(undefined, {
    skip: !accessToken,
  });
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(undefined, {
    skip: !accessToken,
  });

  if (!accessToken) {
    return <h1 style={{ textAlign: "center", marginTop: 200 }}>Loading... Please try to refresh the page </h1>;
  }

  if (isLoadingUser || isLoadingPlaylists) {
    return <HomePageSkeleton />;
  }

  const showTrackBar = (track: SpotifyTrackItem | null) => {
    dispatch(setTrack(track));
    dispatch(showTrack());
  };

  const hideTrackBar = () => {
    if (trackState.visible) {
      dispatch(setTrack(null));
      dispatch(hideTrack());
    }
  };

  return (
    <div className="App" >
      <BrowserRouter>
        {user &&
          <Header
            user={user}
            showTrackBar={showTrackBar}
            hideTrackBar={hideTrackBar}
          />
        }
        <Routes>
          <Route index element={
            playlists ?
              <Home
                playlists={playlists}
                showTrackBar={showTrackBar}
              /> : <HomePageSkeleton />}
          />
          <Route
            path="user"
            element={
              user && playlists ?
                <UserProfile
                  user={user}
                  playlists={playlists}
                /> : <div>Loading User Profile...</div>}
          />
        </Routes>
        <section className={`trackbar ${trackState.visible ? "show" : ""}`}>
          {trackState.visible &&
            <TrackBar
              track={trackState.track}
              hideTrackBar={hideTrackBar}
            />}
        </section>
      </BrowserRouter>
    </div>
  );
};

export default App;
