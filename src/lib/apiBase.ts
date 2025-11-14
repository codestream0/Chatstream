import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth} from "./baseQueryWithReauth"





export const api = createApi({
  reducerPath: "api",
  baseQuery:baseQueryWithAuth,
  tagTypes: ["friends", "chats", "users",],
  endpoints: () => ({}),
});

