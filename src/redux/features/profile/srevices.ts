import { GetMatchedProfilesProps } from "@/lib/modules/profile/profile.types";
import { prepareAuthHeaders } from "@/lib/utility/prepareHeaders";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryString } from "object-query-string";

export const profileApi = createApi({
  reducerPath: "profileApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: prepareAuthHeaders,
  }),

  tagTypes: ["Profiles"],

  endpoints: (builder) => ({
    // GET PROFILES
    getProfiles: builder.query({
      query: (params: GetMatchedProfilesProps) => {

        return ({
          url: `/api/profile?${queryString(params)}`,
          method: "GET",
        })
      },

      providesTags: ["Profiles"],
    }),

    // CREATE USER
    createUser: builder.mutation({
      query: (body: any) => {

        const { action, data } = body || {};

        return {
          url: action
            ? `/api/profile?action=${action}`
            : "/api/profile",

          method: "POST",

          body: data ?? body,
        };
      },

      invalidatesTags: ["Profiles"],
    }),

    // UPDATE USER
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/api/profile/update-user`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Profiles"],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/profile/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Profiles"],
    }),

    getSingleProfileById: builder.query({
      query: (id) => {
        return ({
          url: `/api/profile/${id}`,
          method: "GET",
        })
      },
      providesTags: [],
    }),

    getProfilesByMobile: builder.query({
      query: (mobile: string) => {
        return ({
          url: `/api/profile/by-mobile?mobile=${mobile}`,
          method: "GET",
        })
      },
      providesTags: [],
    }),



  }),
});

export const {
  useGetSingleProfileByIdQuery,
  useLazyGetProfilesByMobileQuery,
  useGetProfilesQuery,
  useLazyGetProfilesQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = profileApi;