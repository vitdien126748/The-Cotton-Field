import { useParams } from "react-router";
import { getUserById } from "../services";
import type { UserProfile } from "../type";
import React from "react";
import {
  UserIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  IdentificationIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const ViewUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [userNotFound, setUserNotFound] = React.useState(false);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserById(Number(userId));
        setUserData(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-600 border-r-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (userNotFound || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <UserIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            User Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The user you're looking for doesn't exist.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    User Details
                  </h1>
                  <p className="text-blue-100 mt-1">
                    View user information and permissions
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          {/* User Information */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <IdentificationIcon className="w-6 h-6 text-blue-600" />
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          User ID
                        </label>
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                          <span className="text-lg font-mono text-gray-900">
                            #{userData.id}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Full Name
                        </label>
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                          <span className="text-lg text-gray-900">
                            {userData.fullName || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Email Address
                        </label>
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 flex items-center gap-2">
                          <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                          <span className="text-lg text-gray-900">
                            {userData.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roles Section */}
              <div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                    User Roles
                  </h2>

                  <div className="space-y-3">
                    {userData.roles && userData.roles.length > 0 ? (
                      userData.roles.map((role) => (
                        <div
                          key={role.id}
                          className="bg-white p-4 rounded-lg border border-green-200 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {role.name}
                              </h3>
                              {role.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {role.description}
                                </p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <ShieldCheckIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">
                          No roles assigned
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          This user has no roles in the system
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => window.history.back()}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
              >
                Back to Users
              </button>
              <button
                onClick={() =>
                  (window.location.href = `/update-user/${userData.id}`)
                }
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserPage;
