import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createUserSchema, updateUserSchema } from "@/validation/zodvalidator";
import { useAddUserMutation, useUpdateUserMutation } from "@/redux/features/api/userSlice";
// Define your schema

export const CreateUser = ({ updateUser: user, handleCancel }) => {
  const isUpdate = useSelector((state) => state.isUpdate.isUpdate);
  const dispatch = useDispatch();
  const [addUser, { isLoading: isAddUserLoaing, isSuccess: isAddUserSuccess, error: addUserError }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation();
  const resolver = isUpdate ? zodResolver(updateUserSchema) : zodResolver(createUserSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver,
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...rest } = data;

    if (isUpdate) {
      await updateUser({ id: user.id, ...rest });
    } else {
      const result = await addUser(rest).unwrap();

      reset();
    }

    // Perform user creation logic here
  };

  useEffect(() => {
    if (isUpdate) {
      setValue("username", user.username);
      setValue("email", user.email);
      // Set other fields as needed
    } else {
      reset();
    }
  }, [isUpdate, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">{isUpdate ? "Update Account" : "Create an Account"}</p>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
              <input placeholder="JohnDoe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" {...register("username")} />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                placeholder="john.doe@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="email"
                disabled={isUpdate}
                type="email"
                {...register("email")}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            {isUpdate && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="currentPassword"
                  type="password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message}</span>}
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">{isUpdate ? "New Password" : "Password"}</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 focus:ring-primary-600 ring-offset-gray-800"
                  type="checkbox"
                  aria-describedby="terms"
                  id="terms"
                  {...register("terms")}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500">
                  I accept the
                  <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            {isUpdate ? (
              <div className="flex gap-2">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                  type="submit"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                type="submit"
                disabled={isAddUserLoaing}
              >
                Create an account
              </button>
            )}
          </div>
          <div>
            {isAddUserLoaing && <p>Loading</p>}
            {isAddUserSuccess && <p>User created successfully</p>}
            {addUserError && <p>{addUserError.data.message}</p>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateUser;