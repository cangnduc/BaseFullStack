import React from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SkeletonTable from "@/components/SkeletonTable";
import { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } from "@/redux/features/api/userSlice";
export const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery({ pollingInterval: 2000 });

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {isFetching ? (
        <SkeletonTable className="container mt-3 border" row={7} columns={5} />
      ) : (
        <Table className="container mt-3 border">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">STT</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.users?.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Admin;

