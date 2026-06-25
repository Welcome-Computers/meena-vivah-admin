import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: `/api/auth/login`,
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/api/auth/me",
      }),
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: `/api/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAdminLoginMutation,useGetMeQuery, useAdminLogoutMutation } = AuthApi;
