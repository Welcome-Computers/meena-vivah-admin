import { prepareAuthHeaders } from "@/lib/utility/prepareHeaders";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: prepareAuthHeaders
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1️⃣ Call original API
  let result = await baseQuery(
    args,
    api,
    extraOptions
  );

  // 2️⃣ Check for 401
  if (result.error?.status === 401) {
    console.log("Access token expired. Trying refresh...");

    // 3️⃣ Try refresh token
    const refreshResult = await baseQuery(
      {
        url: "/api/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    // 4️⃣ Refresh successful
    if (refreshResult.data) {
      console.log("Token refreshed successfully");

      // 5️⃣ Retry original API
      result = await baseQuery(
        args,
        api,
        extraOptions
      );
    } else {
      // 6️⃣ Refresh failed
      console.log("Refresh token expired/invalid");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  return result;
};

export const baseQueryWithReauth1 = async (
  args: any,
  api: any,
  extraOption: any,
) => {
  let result = await baseQuery(args, api, extraOption);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/api/auth/refresh",
        method: "POST",
      },
      api,
      extraOption,
    );

    // if (refreshResult.data) {
    //   result = await baseQuery(args, api, extraOption);
    // }

    if (refreshResult.data) {
      // Refresh successful
      // Retry original request
      console.log("++++", "Refresh successful")
      result = await baseQuery(args, api, extraOption);
    } else {
      // Refresh token also expired/invalid
      console.log("++++", "Refresh token also expired/invalid")
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

  }

  return result;
};


// export const baseQueryWithAuth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await baseQuery(
//     args,
//     api,
//     extraOptions
//   );

//   if (result.error?.status === 401) {
//     // authentication failed
//     console.log("first 111111111111111")
//   }

//   return result;
// };