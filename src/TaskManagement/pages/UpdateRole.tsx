import React from "react";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router";
import { getRoleById, updateRole } from "../services";
import {
  PencilSquareIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface IUpdateRoleForm {
  code: string;
  name: string;
  description: string;
}

const schema = yup.object().shape({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().optional().default(""),
});

const UpdateRolePage = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [roleNotFound, setRoleNotFound] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateRoleForm>({
    resolver: yupResolver(schema),
  });
  React.useEffect(() => {
    const fetchRole = async () => {
      if (!roleId) {
        setRoleNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const role = await getRoleById(Number(roleId));
        if (role) {
          setValue("code", role.code);
          setValue("name", role.name);
          setValue("description", role.description || "");
        } else {
          setRoleNotFound(true);
        }
      } catch (error: unknown) {
        console.error("Error fetching role:", error);
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { status?: number } };
          if (axiosError.response?.status === 404) {
            setRoleNotFound(true);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [roleId, setValue]);

  const onSubmit: SubmitHandler<IUpdateRoleForm> = async (data) => {
    setSubmitting(true);
    try {
      await updateRole(Number(roleId), {
        code: data.code,
        name: data.name,
        description: data.description,
      });
      setSuccess(true);

      // Show success message for 2 seconds, then navigate back
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-600 border-r-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading role data...</p>
        </div>
      </div>
    );
  }

  if (roleNotFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <XCircleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Role Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The role you're trying to edit doesn't exist.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">
              Role updated successfully! Redirecting...
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <PencilSquareIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Update Role
                  </h1>
                  <p className="text-blue-100 mt-1">
                    Modify role details and permissions
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Code */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Role Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="code"
                  type="text"
                  {...register("code")}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                    errors.code
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  placeholder="Enter unique role code (e.g., ADMIN, USER)"
                />
                {errors.code && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm">{errors.code.message}</p>
                  </div>
                )}
              </div>

              {/* Role Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  placeholder="Enter descriptive role name"
                />
                {errors.name && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm">{errors.name.message}</p>
                  </div>
                )}
              </div>

              {/* Role Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none resize-none ${
                    errors.description
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  placeholder="Describe the role's purpose and responsibilities (optional)"
                />
                {errors.description && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                    <p className="text-sm">{errors.description.message}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || success}
                  className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    submitting || success
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                      Updating Role...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Updated Successfully!
                    </>
                  ) : (
                    <>
                      <PencilSquareIcon className="w-5 h-5" />
                      Update Role
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRolePage;
