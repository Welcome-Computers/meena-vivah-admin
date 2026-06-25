import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryString } from "object-query-string";

export const auditLogsApi = createApi({
  reducerPath: "auditLogsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["auditLogs"],

  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: (params: any) => ({
        url: `/api/audit-logs?${queryString(params)}`,
        
        method: "GET",
      }),

      providesTags: ["auditLogs"],
    }),
  }),
});

export const { useGetAuditLogsQuery } = auditLogsApi;