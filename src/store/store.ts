import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

import { apiSlice } from "../api/apiSlice";
import createSagaMiddleware from "redux-saga";
import authSaga from "../containers/auth/authSagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, apiSlice.middleware];

export const store = configureStore({
  reducer: reducers,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});

// We use redux-saga only to implement the auth flow
sagaMiddleware.run(authSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
