import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../auth/authSlice";

export const googleSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  reducerPath: "googleAuthApi",
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: () => ({ url: "/auth/google", method: "POST" }),
    }),
  }),
});

export const { useGoogleLoginMutation } = googleSlice;
