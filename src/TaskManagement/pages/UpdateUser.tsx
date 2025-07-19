import React from "react";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getUserById, updateUser } from "../services";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface IUpdateUserForm {
  fullName: string;
  username: string;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  username: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const UpdateUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = React.useState(true);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      username: "",
    },
  });

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getUserById(Number(userId));
        if (!response) {
          setUserNotFound(true);
          return;
        }
        if (response) {
          setValue("fullName", response.fullName || "");
          setValue("username", response.username || "");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        alert("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, setValue, setLoading, setUserNotFound]);
  const onSubmit: SubmitHandler<IUpdateUserForm> = async (data) => {
    try {
      await updateUser(Number(userId), {
        fullName: data.fullName,
        username: data.username,
      });
      alert("User updated successfully!");
      window.history.back();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again later.");
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading user data...</span>
      </div>
    );
  }

  if (userNotFound) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          User Not Found
        </h2>
        <p className="text-gray-600">
          The user you're looking for doesn't exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <PencilSquareIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                ✏️ Update User
              </h2>
            </div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                👤 Full Name *
              </label>
              <input
                {...register("fullName")}
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                  errors.fullName
                    ? "border-red-400 focus:ring-2 focus:ring-red-400"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                } bg-gray-50 hover:bg-white`}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                📧 Email *
              </label>
              <input
                {...register("username")}
                type="email"
                id="username"
                name="username"
                placeholder="Enter email address"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                  errors.username
                    ? "border-red-400 focus:ring-2 focus:ring-red-400"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                } bg-gray-50 hover:bg-white`}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 py-3 px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;
