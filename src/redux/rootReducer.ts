// rootReducer.ts

import { combineReducers } from "@reduxjs/toolkit";
import profile from "./features/profile";

import { AuthApi } from "./features/login";
import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile/srevices";

export const rootReducer = combineReducers({
  profile,

  [profileApi.reducerPath]: profileApi.reducer,
  [masterGotraApi.reducerPath]: masterGotraApi.reducer,
  [masterOccupationApi.reducerPath]: masterOccupationApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});