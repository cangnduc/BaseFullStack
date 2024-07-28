import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { baseQuerywithReauth } from "./apiSlice";

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuerywithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      transformResponse: (response) => {
        return response.users;
      },
      transformErrorResponse: (response) => {
        return response.data.error.errorsResponse.keyValue;
      },
      providesTags: (result) => (result ? [...result.map(({ id }) => ({ type: "User", id })), { type: "User", id: "LIST" }] : [{ type: "User", id: "LIST" }]),
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
    addUser: builder.mutation({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:(result, error,id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userSlice;
