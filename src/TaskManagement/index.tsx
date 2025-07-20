/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./MainLayout";
import { useAuth } from "./useAuth";
import routes from "./routes";
import AccessDeniedPage from "./pages/AccessDenied";
import { FilterContext } from "./context";

export default function TasksManagement() {
  const { loggedInUser } = useAuth((state) => state);
  const [filters, setFilters] = React.useState({ status: "", priority: "" });
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Memoize userRoles to avoid unnecessary re-renders
  const userRoles: string[] = React.useMemo(
    () =>
      loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [],
    [loggedInUser?.roles]
  );

  // Check authentication status and redirect accordingly
  React.useEffect(() => {
    // Give some time for auth state to load from localStorage
    const checkAuth = setTimeout(() => {
      if (!loggedInUser && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      setIsCheckingAuth(false);
    }, 100);

    return () => clearTimeout(checkAuth);
  }, [loggedInUser]);

  // Move router creation inside component and use useMemo to recreate when loggedInUser changes
  const router = React.useMemo(() => {
    const generatedRoutes: any[] = routes
      .map((route) => {
        // Always allow access to login route
        if (route.isPublic) {
          return {
            path: route.path,
            element: route.element,
            index: route.index,
          };
        }

        // For protected routes, check user roles
        if (!loggedInUser) {
          return null;
        }

        const routeRoles: string[] =
          route.roles?.map((role: string) => role?.toLowerCase()) || [];
        const hasAccess = userRoles.some((role: string) => {
          return (
            role?.toLowerCase() === "administrators" ||
            routeRoles.includes(role?.toLowerCase())
          );
        });

        return hasAccess
          ? {
              path: route.path,
              element: route.element,
              index: route.index,
            }
          : null;
      })
      .filter(Boolean); // Filter out null values

    // If user is logged in but has no accessible routes, add a default fallback
    if (
      loggedInUser &&
      generatedRoutes.filter((route) => !route.isPublic).length === 0
    ) {
      generatedRoutes.push({
        path: "/",
        element: (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Access
              </h2>
              <p className="text-gray-600 mb-6">
                No accessible pages for your role. Contact administrator.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        ),
        index: true,
      });
    }

    return createBrowserRouter([
      {
        path: "/",
        element: <MainLayout />,
        children: generatedRoutes,
      },
      //  NO MATCH ROUTE
      {
        path: "*",
        element: (
          <main style={{ padding: "1rem" }}>
            <AccessDeniedPage />
          </main>
        ),
      },
    ]);
  }, [loggedInUser, userRoles]); // Recreate router when authentication state changes

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-blue-600 border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </React.Suspense>
      </div>
    </FilterContext.Provider>
  );
}
