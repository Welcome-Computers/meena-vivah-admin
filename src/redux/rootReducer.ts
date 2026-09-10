// rootReducer.ts

import { combineReducers } from "@reduxjs/toolkit";

import { auditLogsApi } from "./features/auditLogs";
import { importedProfileApi } from "./features/importedProfile/srevices";
import layoutSetting from "./features/layoutSetting";
import { AuthApi } from "./features/login";
import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import profile from "./features/profile";
import { profileApi } from "./features/profile/srevices";

export const rootReducer = combineReducers({
  profile,
  layoutSetting,
  [auditLogsApi.reducerPath]: auditLogsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [masterGotraApi.reducerPath]: masterGotraApi.reducer,
  [masterOccupationApi.reducerPath]: masterOccupationApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [importedProfileApi.reducerPath]: importedProfileApi.reducer,
});