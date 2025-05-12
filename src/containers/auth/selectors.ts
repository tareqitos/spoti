import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.authentication;

export const authSelectors = {
  selectAccessToken: createSelector(selectSelf, (auth) => auth.accessToken),
  selectAuthStatus: createSelector(selectSelf, (auth) => auth.status),
};

export const { selectAccessToken, selectAuthStatus } = authSelectors;
