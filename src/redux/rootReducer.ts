// rootReducer.ts

import { combineReducers } from "@reduxjs/toolkit";
import profile from "./features/profile";

import { AuthApi } from "./features/login";
import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile/srevices";
import { auditLogsApi } from "./features/auditLogs";

export const rootReducer = combineReducers({
  profile,
[auditLogsApi.reducerPath]:auditLogsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [masterGotraApi.reducerPath]: masterGotraApi.reducer,
  [masterOccupationApi.reducerPath]: masterOccupationApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});