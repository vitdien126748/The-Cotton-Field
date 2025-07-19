import AddRolesToUserPage from "../pages/AddRolesToUser";
import CreateRolePage from "../pages/CreateRole";
import CreateTaskPage from "../pages/CreateTask";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import MyTasksPage from "../pages/MyTasks";
import RemoveRolesFromUserPage from "../pages/RemoveRolesFromUser";
import RolesPage from "../pages/Roles";
import TasksPage from "../pages/Tasks";
import UpdateRolePage from "../pages/UpdateRole";
import UpdateTaskPage from "../pages/UpdateTask";
import UpdateUserPage from "../pages/UpdateUser";
import UsersPage from "../pages/Users";
import ViewTaskPage from "../pages/ViewTask";
import ViewUserPage from "../pages/ViewUser";

const routes = [
  {
    path: "/login",
    showOnMenu: false,
    isPublic: true,
    name: "Login",
    element: <LoginPage />,
  },
  {
    path: "/",
    showOnMenu: true,
    name: "Home",
    index: true,
    element: <Dashboard />,
    roles: ["users", "managers", "leaders", "administrators", "members"],
  },
  {
    path: "/tasks",
    showOnMenu: true,
    name: "Tasks",
    element: <TasksPage />,
    roles: ["managers", "leaders", "administrators"],
  },
  {
    path: "/my-tasks",
    showOnMenu: true,
    name: "My Tasks",
    element: <MyTasksPage />,
    roles: ["users", "managers", "leaders", "administrators", "members"],
  },
  {
    path: "/create-task",
    showOnMenu: true,
    name: "Create Task",
    element: <CreateTaskPage />,
    roles: ["managers", "leaders", "administrators"],
  },
  {
    path: "/update-task/:taskId",
    showOnMenu: false,
    name: "Update Task",
    element: <UpdateTaskPage />,
    roles: ["managers", "leaders", "administrators"],
  },
  {
    path: "/view-task/:id",
    showOnMenu: false,
    name: "View Task",
    element: <ViewTaskPage />,
    roles: ["users", "managers", "leaders", "administrators", "members"],
  },
  {
    path: "/users",
    showOnMenu: true,
    name: "Users",
    element: <UsersPage />,
    roles: ["administrators", "managers"],
  },
  {
    path: "/view-user/:userId",
    showOnMenu: false,
    name: "View User",
    element: <ViewUserPage />,
    roles: ["administrators", "managers"],
  },
  {
    path: "/update-user/:userId",
    showOnMenu: false,
    name: "Update User",
    element: <UpdateUserPage />,
    roles: ["administrators"],
  },
  {
    path: "/roles",
    showOnMenu: true,
    name: "Roles",
    element: <RolesPage />,
    roles: ["administrators", "managers"],
  },
  {
    path: "/roles/create",
    showOnMenu: false,
    name: "Create Role",
    element: <CreateRolePage />,
    roles: ["administrators"],
  },
  {
    path: "/roles/update/:roleId",
    showOnMenu: false,
    name: "Update Role",
    element: <UpdateRolePage />,
    roles: ["administrators"],
  },
  {
    path: "/add-roles-to-user/:userId",
    showOnMenu: false,
    name: "Add Roles to User",
    element: <AddRolesToUserPage />,
    roles: ["administrators"],
  },
  {
    path: "/remove-roles-from-user/:userId",
    showOnMenu: false,
    name: "Remove Roles from User",
    element: <RemoveRolesFromUserPage />,
    roles: ["administrators"],
  },
];
export default routes;
