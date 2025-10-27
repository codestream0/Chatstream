// lib/apiBase.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store"; 


// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300",
//   credentials: "include",
//   prepareHeaders: (headers = new Headers(), { getState }) => {
//     const token = (getState() as RootState)?.auth?.accessToken;
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: async (args, api, extraOptions) => {
//     const result = await baseQuery(args, api, extraOptions);
//     if (result.error) {
//       console.error("❌ RTK Query Error:", result.error);
//     }
//     return result;
//   },
//   tagTypes: ["friends", "chats", "messages", "users"],
//   endpoints: () => ({}),
// });


export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300",
    credentials: "include",
    prepareHeaders: (headers = new Headers(), { getState }) => {
      const token = (getState() as RootState)?.auth?.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["friends", "chats", "messages", "users"],
  endpoints: () => ({}),
});
