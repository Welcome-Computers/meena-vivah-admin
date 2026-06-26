import { GetGotraProps } from '@/lib/modules/master-gotra/master-gotra.types';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryString } from "object-query-string";

export const masterGotraApi = createApi({
  reducerPath: "masterGotraApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Gotras", "Occupations"],

  endpoints: (builder) => ({
    // GET USERS
    getGotras: builder.query({
      query: (params: GetGotraProps) => {
        return ({
          url: `/api/master-gotra?${queryString(params)}`,
          method: "GET",
        })
      },
      providesTags: ["Gotras"],
    }),

    // CREATE USER
    createGotra: builder.mutation({
      query: (body) => ({
        url: `/api/master-gotra`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Gotras"],
    }),

    // DELETE USER
    deleteGotra: builder.mutation({
      query: (id) => ({
        url: `/api/master-gotra/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Gotras"],
    }),


    // // Update USER
    updateGotra: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/master-gotra/${id}`,
        method: "PUT",
        body
      }),

      invalidatesTags: ["Gotras"],
    }),

  }),
});

export const {
  useGetGotrasQuery,
  useLazyGetGotrasQuery,
  useCreateGotraMutation,
  useDeleteGotraMutation,
  useUpdateGotraMutation,
} = masterGotraApi;