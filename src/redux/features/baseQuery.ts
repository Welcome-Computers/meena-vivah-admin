import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 const baseQuery= fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  });

export const baseQueryWithReauth=async(args:any,api:any,extraOption:any)=>{
    let result=await baseQuery(args,api,extraOption);


    


    return result;
}
