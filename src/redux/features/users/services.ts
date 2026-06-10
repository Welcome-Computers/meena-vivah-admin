import { GetUsersProps } from "@/lib/modules/user/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryString } from "object-query-string";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    // GET USERS
    getUsers: builder.query({
      query: (params: GetUsersProps) => {

        return ({
          url: `/api/user?${queryString(params)}`,
          method: "GET",

        })
      },

      providesTags: ["Users"],
    }),

    // CREATE USER
    createUser: builder.mutation({
      query: (body) => ({
        url: `/api/user`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Users"],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Users"],
    }),


  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApi;