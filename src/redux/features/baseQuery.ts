import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,

  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.access_token) {
      headers.set(
        "Authorization",
        `Bearer ${session.access_token}`
      );
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(
    args,
    api,
    extraOptions
  );

  // API returned 401
  if (result.error?.status === 401) {
    console.log("Access token expired. Asking NextAuth to refresh...");

    // This triggers NextAuth's jwt/session callbacks.
    const session = await getSession();

    // Refresh succeeded
    if (
      session &&
      !session.error &&
      session.access_token
    ) {
      console.log("Token refreshed successfully");

      // Retry original request.
      result = await rawBaseQuery(
        args,
        api,
        extraOptions
      );
    } else {
      // Refresh failed
      console.log("Refresh token expired/invalid");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  return result;
};