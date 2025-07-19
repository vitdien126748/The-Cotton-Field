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

  // Memoize userRoles to avoid unnecessary re-renders
  const userRoles: string[] = React.useMemo(
    () =>
      loggedInUser?.roles?.map((role: any) => role.code?.toLowerCase()) || [],
    [loggedInUser?.roles]
  );

  // Move router creation inside component and use useMemo to recreate when loggedInUser changes
  const router = React.useMemo(() => {
    const generatedRoutes: any[] = routes
      .map((route) => {
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

    // Add public routes when user is not logged in
    routes.forEach((route) => {
      if (route.isPublic && !loggedInUser) {
        generatedRoutes.push({
          path: route.path,
          element: route.element,
          index: route.index,
        });
      }
    });

    // If user is logged in but has no accessible routes, add a default fallback
    if (loggedInUser && generatedRoutes.length === 0) {
      generatedRoutes.push({
        path: "/",
        element: (
          <div>No accessible pages for your role. Contact administrator.</div>
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
