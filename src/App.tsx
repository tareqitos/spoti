import "./App.css";

import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { authSelectors } from "./containers/auth/selectors";
import logo from "./logo.svg";
import { useGetUserQuery } from "./api/apiSlice";

const App: FC = (): ReactElement => {
  const accessToken = useSelector(authSelectors.selectAccessToken);

  // TODO: You can access user data and now fetch user's playlists
  const { data: user } = useGetUserQuery(undefined, {
    skip: !accessToken
  });

  console.log(user);

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
