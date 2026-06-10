import { configureStore } from "@reduxjs/toolkit";

import masterGotra from "./features/masterGotra";
import masterOccupation from "./features/masterOccupation";
import userReducer from "./features/users";

import { masterGotraApi } from "./features/masterGotra/services";
import { masterOccupationApi } from "./features/masterOccupation/services";
import { userApi } from "./features/users/services";

export const store = configureStore({
  reducer: {
    users: userReducer,
    masterGotra: masterGotra,
    masterOccupation: masterOccupation,

    [userApi.reducerPath]: userApi.reducer,
    [masterGotraApi.reducerPath]: masterGotraApi.reducer,
    [masterOccupationApi.reducerPath]: masterOccupationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        userApi.middleware,
        masterGotraApi.middleware,
        masterOccupationApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;