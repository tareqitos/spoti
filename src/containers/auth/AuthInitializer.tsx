import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors, selectAccessToken, selectAuthStatus } from "./selectors";
import { getToken, login, setAccessToken } from "./slice";
import { RequestStatus } from "../../types/requests";

type AuthInitializerProps = {
  children: ReactNode;
};

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const authenticationStatus = useSelector(selectAuthStatus);
  const accessToken = useSelector(selectAccessToken);

  const { location } = window;
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    if (!code && !accessToken) {
      dispatch(login());
    }
    if (code && !accessToken) {
      dispatch(getToken(code));
    }
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }
  }, [code, accessToken, dispatch]);

  if (authenticationStatus === RequestStatus.SUCCESS) return <>{children}</>;
  if (authenticationStatus === RequestStatus.ERROR)
    return (
      <div className="App">
        <header className="App-header">
          <p>Authentication failed. Please check the console for more info.</p>
        </header>
      </div>
    );

  return null;
};

export default AuthInitializer;
