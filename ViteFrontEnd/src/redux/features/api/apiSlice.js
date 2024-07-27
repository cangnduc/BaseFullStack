import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../auth/authSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuerywithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
   
    const refreshResult = await baseQuery({ url: "/auth/refreshToken", method: "POST", credentials: "include" }, api, extraOptions);
 
    if (refreshResult.data) {
      api.dispatch(setCredentials({ user, accessToken: refreshResult.data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
     
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuerywithReauth,
  // baseQuery: fetchBaseQuery({
  // baseUrl: "http://localhost:3000/api",
  // }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/auth/local/login", method: "POST", body, credentials: "include" }),
    }),
    logout: builder.mutation({
      query: () => ({ url: "/auth/local/logout", method: "POST", credentials: "include" }),
    }),
    getProfile: builder.query({
      query: (id) => `/user/${id}`,
    }),
    // refresh endpoint only runs the baseQuerywithReauth function
    refresh: builder.mutation({
      query: () => ({ url: "/auth/refreshToken", method: "POST", credentials: "include" }),
    }),
    // googleLogin: builder.mutation({
    //   query: ()=> ({url: "/auth/google",method:"POST",credentials:true})
    // })
    // refresh: builder.mutation({
    //   query: () => ({ url: "/auth/refreshToken", method: "POST", credentials: "include" }),
    // }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useRefreshMutation,useLogoutMutation } = apiSlice;
