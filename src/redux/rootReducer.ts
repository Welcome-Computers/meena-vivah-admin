import { combineReducers } from "@reduxjs/toolkit";
import { apis } from "./apis";
import profile from "./features/profile";

const apiReducers = Object.fromEntries(
  apis.map((api) => [
    api.reducerPath,
    api.reducer,
  ])
);

export const rootReducer =
  combineReducers({
    profile,
    ...apiReducers,
  });