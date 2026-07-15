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

import { EditableProfile } from "@/redux/types";
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
        url: "/api/imported-profile?action=singleCreate",
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

    // UPDATE BULK IMPORTED PROFILE
    updateBulkImportedProfiles: builder.mutation({
      query: (
        body: UpdateImportedProfileInput[]
      ) => ({
        url: `/api/imported-profile?action=bulkUpdate`,
        method: "PUT",
        body,
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
    moveImportedProfile: builder.mutation<any, EditableProfile>({
      query: ({ id, ...body }) => {
        return ({
          url: `/api/imported-profile/${id}?action=singleMove`,
          method: "POST",
          body,
        })
      },

      invalidatesTags: ["ImportedProfiles"],
    }),

    // MOVE BULK IMPORTED PROFILE
    moveBulkImportedProfiles: builder.mutation({
      query: (
        body: number[]
      ) => ({
        url: `/ api / imported - profile ? action = bulkMove`,
        method: "POST",
        body,
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
  useUpdateBulkImportedProfilesMutation,

  useDeleteImportedProfileMutation,
  useDeleteImportedProfilesMutation,

  useMoveImportedProfileMutation,
  useMoveBulkImportedProfilesMutation,



} = importedProfileApi;

