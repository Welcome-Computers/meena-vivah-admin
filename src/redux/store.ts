import { configureStore } from "@reduxjs/toolkit";

import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile";

export const store = configureStore({
  reducer: {

    [profileApi.reducerPath]: profileApi.reducer,
    [masterGotraApi.reducerPath]: masterGotraApi.reducer,
    [masterOccupationApi.reducerPath]: masterOccupationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        profileApi.middleware,
        masterGotraApi.middleware,
        masterOccupationApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;