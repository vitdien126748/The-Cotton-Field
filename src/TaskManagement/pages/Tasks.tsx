/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { deleteTask, getTasks } from "../services";
import type { Task } from "../type";
import { useNavigate } from "react-router";
import SearchTasks from "../components/SearchTasks";
import { FilterContext } from "../context";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../useAuth";

const TasksPage = () => {
  const { loggedInUser } = useAuth((state) => state);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const { filters, setFilters } = React.useContext(FilterContext) || {
    filters: {},
    setFilters: () => {},
  };
  const navigate = useNavigate();

  const isAllowedRole = loggedInUser?.roles.some(
    (role) => role.name === "Administrators"
  );

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data: any = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters({
      status: filters.status ?? "",
      priority: filters.priority ?? "",
    });
  };

  const handleDeleteTask = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await deleteTask(id);
        setTasks(tasks?.filter((task) => task.id !== id) || []);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const filteredTasks =
    tasks?.filter((task) => {
      const matchesStatus = filters?.status
        ? task.status.toLocaleLowerCase() === filters.status.toLocaleLowerCase()
        : true;
      const matchesPriority = filters?.priority
        ? task.priority.toLocaleLowerCase() ===
          filters.priority.toLocaleLowerCase()
        : true;
      return matchesStatus && matchesPriority;
    }) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <SearchTasks onSearch={handleOnSearch} />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              All Tasks ({filteredTasks?.length || 0})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-10 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-10 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                    Start Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                    Assignee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks?.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-12 text-gray-400 animate-pulse"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-2">📋</div>
                        <div className="text-lg font-medium">
                          No tasks found
                        </div>
                        <div className="text-sm">
                          Try adjusting your search filters
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredTasks?.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group animate-fade-in ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-4 py-4 font-bold text-blue-600">
                      {task.id}
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-600 max-w-xs truncate">
                      {task.description}
                    </td>
                    <td className="px-4 py-4 capitalize">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          task.status === "done"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : task.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4 capitalize">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800 border border-red-200 animate-pulse"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-gray-600 text-sm">
                      {task.start_date
                        ? new Date(task.start_date).toLocaleDateString()
                        : "Not set"}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-gray-600 text-sm">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "Not set"}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-600 text-sm">
                      {task.assignee_id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          disabled={!isAllowedRole}
                          onClick={() => navigate(`/view-task/${task.id}`)}
                          className={`p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-110 transition-all duration-200 shadow-sm ${
                            !isAllowedRole
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="View Task"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          disabled={!isAllowedRole}
                          onClick={() => navigate(`/update-task/${task.id}`)}
                          className={`p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:scale-110 transition-all duration-200 shadow-sm ${
                            !isAllowedRole
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="Edit Task"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          disabled={!isAllowedRole}
                          onClick={() => {
                            if (typeof task.id === "number") {
                              handleDeleteTask(task.id);
                            } else {
                              alert("Task ID is missing.");
                            }
                          }}
                          className={`p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:scale-110 transition-all duration-200 shadow-sm ${
                            !isAllowedRole
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="Delete Task"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
