import React from "react";
import { useSelector } from "react-redux";
import { toggleUpdate, setUpdate } from "@/redux/features/generalState";
import SkeletonTable from "@/components/SkeletonTable";
import { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } from "@/redux/features/api/userSlice";
import { Users } from "./Users";
import { toast, ToastContainer } from "react-toastify";

import { CreateUser } from "./CreateUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmDialog from "@/components/ConfirmDialog";
export const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const [updateUser, setUpdateUser] = useState(null);
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const isUpdate = useSelector((state) => state.isUpdate.isUpdate);
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const handleCancel = () => {
    setUpdateUser(null);
    if (isUpdate) dispatch(setUpdate(false));
  };
  const handleEditUser = (user) => {
    setUpdateUser(user);
    if (!isUpdate) dispatch(setUpdate(true));
  };
  // const handleDeleteUser = async (id) => {
  //   await deleteUser(id);
  //  };
  const handleDeleteUser = (id) => {
    setConfirmOpen(true);
    setUserIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userIdToDelete).unwrap();
      toast.success("User deleted successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error("Error deleting user");
    } finally {
      setConfirmOpen(false);
      setUserIdToDelete(null);
    }
  };
  return (
    <div className="container p-2 py-6">
      
      <ConfirmDialog isOpen={confirmOpen} onConfirm={handleConfirmDelete} onCancel={() => setConfirmOpen(false)} message="Are you sure you want to delete this user?" />
      <div>
        <CreateUser updateUser={updateUser} handleCancel={handleCancel} />
      </div>
      {error && <div>Error: {error.message}</div>}
      {isFetching ? (
        <div>
        
          <SkeletonTable className=" mt-3 border" row={7} columns={5} />
        </div>
      ) : (
        <div className=" mt-5">
          <h1 className="text-center bold-900">UER MANAGEMENT</h1>
          <Users users={users} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
        </div>
      )}
    </div>
  );
};

export default Admin;
