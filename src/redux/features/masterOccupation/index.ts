import { GetOccupationProps } from "@/lib/modules/master-occupation/master-occupation.types";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryString } from "object-query-string";

export const masterOccupationApi = createApi({
  reducerPath: "masterOccupationApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Occupations", "Occupations"],

  endpoints: (builder) => ({
    // GET USERS
    getOccupations: builder.query({
      query: (params: GetOccupationProps) => {
        return {
          url: `/api/master-occupation?${queryString(params)}`,
          method: "GET",
        };
      },

      providesTags: ["Occupations"],
    }),

    // CREATE USER
    createOccupation: builder.mutation({
      query: (body) => ({
        url: `/api/master-occupation`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Occupations"],
    }),

    // DELETE USER
    deleteOccupation: builder.mutation({
      query: (id) => ({
        url: `/api/master-occupation/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Occupations"],
    }),

    // UPDATE OCCUPATION
    updateOccupation: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/master-occupation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Occupations"],
    }),
  }),
});

export const {
  useGetOccupationsQuery,
  useLazyGetOccupationsQuery,
  useCreateOccupationMutation,
  useDeleteOccupationMutation,
  useUpdateOccupationMutation,
} = masterOccupationApi;
