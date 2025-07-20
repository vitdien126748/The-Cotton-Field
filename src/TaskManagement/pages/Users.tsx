import React from "react";
import { getUsers } from "../services";
import type { UserProfile } from "../type";
import { useNavigate } from "react-router";
import { useAuth } from "../useAuth";
import {
  UsersIcon,
  EyeIcon,
  PencilIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const UsersPage = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Role-based access control
  const userRoles =
    loggedInUser?.roles?.map((role) => role.code?.toLowerCase()) || [];

  // Check if user has permission to access this page
  const canAccessUsers = userRoles.some((role) =>
    ["administrators", "managers"].includes(role)
  );
  console.log("loggedInUser:", loggedInUser);
  // Permission checks for different actions
  const canViewUser = userRoles.some((role) =>
    ["administrators", "managers"].includes(role)
  );

  const canEditUser = userRoles.some((role) =>
    ["administrators"].includes(role)
  );

  const canManageRoles = userRoles.some((role) =>
    ["administrators"].includes(role)
  );

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response: UserProfile[] = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-600 border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  // Access control check
  if (!canAccessUsers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access user management. Only
            Administrators, Leaders, and Managers can view this page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    User Management
                  </h1>
                  <p className="text-purple-100 mt-1">
                    Manage user accounts and permissions ({users.length} users)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <UsersIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No users found
                </h3>
                <p className="text-gray-500">
                  Get started by adding your first user.
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {user.fullName
                                  ? user.fullName.charAt(0).toUpperCase()
                                  : user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.fullName || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {user.roles && user.roles.length > 0 ? (
                            user.roles.map((role) => (
                              <span
                                key={role.id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {role.name}
                              </span>
                            ))
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              No roles
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/view-user/${user.id}`)}
                            disabled={!canViewUser}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              canViewUser
                                ? "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                            title={
                              canViewUser
                                ? "View user"
                                : "No permission to view user"
                            }
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/update-user/${user.id}`)}
                            disabled={!canEditUser}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              canEditUser
                                ? "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                            title={
                              canEditUser
                                ? "Edit user"
                                : "No permission to edit user"
                            }
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/add-roles-to-user/${user.id}`)
                            }
                            disabled={!canManageRoles}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              canManageRoles
                                ? "text-green-600 hover:text-green-800 hover:bg-green-50"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                            title={
                              canManageRoles
                                ? "Add roles"
                                : "No permission to manage roles"
                            }
                          >
                            <ShieldCheckIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/remove-roles-from-user/${user.id}`)
                            }
                            disabled={!canManageRoles}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              canManageRoles
                                ? "text-orange-600 hover:text-orange-800 hover:bg-orange-50"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                            title={
                              canManageRoles
                                ? "Remove roles"
                                : "No permission to manage roles"
                            }
                          >
                            <ShieldExclamationIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer */}
          {users.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{users.length}</span>{" "}
                  users
                </div>
                <button
                  onClick={fetchUsers}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
