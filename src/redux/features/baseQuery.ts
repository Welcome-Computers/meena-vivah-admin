// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   credentials: "include",
// });

// export const baseQueryWithReauth = async (
//   args: any,
//   api: any,
//   extraOption: any,
// ) => {
//   let result = await baseQuery(args, api, extraOption);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery(
//       {
//         url: "/api/auth/refresh",
//         method: "POST",
//       },
//       api,
//       extraOption,
//     );

//     if (refreshResult.data) {
//       result = await baseQuery(args, api, extraOption);
//     }
//   }

//   return result;
// };
