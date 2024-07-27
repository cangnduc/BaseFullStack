import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../auth/authSlice";
import { jwtDecode } from "jwt-decode";

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

  if (result?.error || result?.error?.status === 401) {
    const refreshResult = await baseQuery({ url: "/auth/refreshToken", method: "POST", credentials: "include" }, api, extraOptions);

    if (refreshResult.data) {
      api.dispatch(setCredentials({ user: refreshResult.data.data.user, accessToken: refreshResult.data.data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuerywithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
    }),
    getUser: builder.query({
      query: (id) => `/user/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userSlice;
