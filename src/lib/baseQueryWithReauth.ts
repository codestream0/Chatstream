import type { RootState } from "./store";
import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "courageous-sprite-e7dae6.netlify.app",
  credentials: "include",
  prepareHeaders: (headers = new Headers(), { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
})

export const baseQueryWithAuth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("access token expired, refreshing…");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshToken",
        method: "POST",
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult?.data as
      | { accessToken?: string }
      | undefined;

    if (refreshData?.accessToken) {
      api.dispatch({
        type: "auth/setAccessToken",
        payload: refreshData.accessToken,
      });

      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logout" });
      return refreshResult;
    }
  }

  return result;
};

