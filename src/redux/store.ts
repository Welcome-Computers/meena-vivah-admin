import { configureStore } from "@reduxjs/toolkit";
import { apis } from "./apis";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...apis.map((api) => api.middleware)
    ),
});

