import {
  CreateImportedProfileInput,
  UpdateImportedProfileInput,
} from "@/lib/modules/imported-profile/imported-profile.validation";

import {
  GetImportedProfilesProps,
} from "@/lib/modules/imported-profile/imported-profile.types";

import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { moveBulkProfilesProps } from "@/lib/modules/profile/profile.types";
import { queryString } from "object-query-string";


export const importedProfileApi = createApi({
  reducerPath: "importedProfileApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["ImportedProfiles"],

  endpoints: (builder) => ({

    // GET IMPORTED PROFILES
    getImportedProfiles: builder.query({
      query: (
        params: GetImportedProfilesProps
      ) => ({
        url: `/api/imported-profile?${queryString(params)}`,
        method: "GET",
      }),

      providesTags: ["ImportedProfiles"],
    }),


    // CREATE SINGLE IMPORTED PROFILE
    createImportedProfile: builder.mutation({
      query: (
        body: CreateImportedProfileInput
      ) => ({
        url: "/api/imported-profile",
        method: "POST",
        body,
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),


    // CREATE BULK IMPORTED PROFILE
    createBulkImportedProfiles: builder.mutation({
      query: (
        body: CreateImportedProfileInput[]
      ) => ({
        url: `/api/imported-profile?action=bulkCreate`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),


    // UPDATE IMPORTED PROFILE
    updateImportedProfile: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: number;
        data: UpdateImportedProfileInput;
      }) => ({
        url: `/api/imported-profile/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),


    // DELETE SINGLE
    deleteImportedProfile: builder.mutation({
      query: (
        id: number
      ) => ({
        url: `/api/imported-profile/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),


    // DELETE BULK
    deleteImportedProfiles: builder.mutation({
      query: (
        ids: number[]
      ) => ({
        url: "/api/imported-profile/delete-many",
        method: "POST",
        body: {
          ids,
        },
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),


    // MOVE SINGLE PROFILE
    moveImportedProfile: builder.mutation({
      query: (
        id: number
      ) => ({
        url: `/api/imported-profile/${id}/move`,
        method: "POST",
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),

    // CREATE BULK IMPORTED PROFILE
    moveBulkImportedProfiles: builder.mutation({
      query: (
        body: moveBulkProfilesProps
      ) => ({
        url: `/api/imported-profile?action=bulkMove`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),


    // MOVE BULK PROFILES
    moveImportedProfiles: builder.mutation({
      query: (
        ids: number[]
      ) => ({
        url: "/api/imported-profile/move-many",
        method: "POST",
        body: {
          ids,
        },
      }),

      invalidatesTags: ["ImportedProfiles"],
    }),

  }),
});


export const {
  useGetImportedProfilesQuery,
  useLazyGetImportedProfilesQuery,

  useCreateImportedProfileMutation,
  useCreateBulkImportedProfilesMutation,

  useUpdateImportedProfileMutation,

  useDeleteImportedProfileMutation,
  useDeleteImportedProfilesMutation,

  useMoveImportedProfileMutation,
  useMoveImportedProfilesMutation,
  useMoveBulkImportedProfilesMutation

} = importedProfileApi;