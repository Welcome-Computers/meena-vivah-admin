import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  


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
