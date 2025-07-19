/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, Outlet } from "react-router";
import {
  HomeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ListBulletIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import routes from "./routes";
import { useAuth } from "./useAuth";

export default function MainLayout() {
  const { loggedInUser, logOut } = useAuth((state) => state);
  // Get array of user roles ["code"]
  const userRoles: string[] =
    loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [];

  const getRouteIcon = (routeName: string) => {
    switch (routeName.toLowerCase()) {
      case "dashboard":
        return <HomeIcon className="w-5 h-5" />;
      case "users":
        return <UserGroupIcon className="w-5 h-5" />;
      case "roles":
        return <ShieldCheckIcon className="w-5 h-5" />;
      case "tasks":
        return <ListBulletIcon className="w-5 h-5" />;
      case "my tasks":
        return <ClipboardDocumentListIcon className="w-5 h-5" />;
      default:
        return <HomeIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render Navigation Bar */}
      {loggedInUser && (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Navigation */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">TM</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">
                      Task Management
                    </h1>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {routes.map((route) => {
                      if (route.showOnMenu === false) {
                        return null;
                      }

                      const routeRoles: string[] =
                        route.roles?.map((role: string) =>
                          role?.toLowerCase()
                        ) || [];
                      const hasAccess = userRoles.some((role: string) => {
                        return (
                          role === "administrators" ||
                          routeRoles.includes(role?.toLowerCase())
                        );
                      });

                      if (!hasAccess) {
                        return null;
                      }

                      return (
                        <NavLink
                          key={route.path}
                          to={route.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                              isActive
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`
                          }
                        >
                          {getRouteIcon(route.name)}
                          <span>{route.name}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* User Info and Logout */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-sm text-gray-700">
                  Welcome,{" "}
                  <span className="font-semibold">
                    {(loggedInUser as any).fullName || loggedInUser.username}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    logOut().then(() => {
                      window.location.href = "/login";
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
              {routes.map((route) => {
                if (route.showOnMenu === false) {
                  return null;
                }

                const routeRoles: string[] =
                  route.roles?.map((role: string) => role?.toLowerCase()) || [];
                const hasAccess = userRoles.some((role: string) => {
                  return (
                    role === "administrators" ||
                    routeRoles.includes(role?.toLowerCase())
                  );
                });

                if (!hasAccess) {
                  return null;
                }

                return (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                        isActive
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`
                    }
                  >
                    {getRouteIcon(route.name)}
                    <span>{route.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
