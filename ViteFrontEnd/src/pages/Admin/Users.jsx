import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
export const Users = ({ users, handleEditUser, handleDeleteUser }) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">STT</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>

          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={user._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right flex gap-4 justify-center">
              <button onClick={() => handleEditUser(user)} className="btn btn-primary">
                Edit
              </button>
              <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger">
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Users;
