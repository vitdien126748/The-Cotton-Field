import React, { useEffect } from "react";
import { deleteTask, getTaskById } from "../services";
import { useNavigate, useParams } from "react-router";
import type { Task } from "../type";
import {
  ArrowLeftIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function ViewTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = React.useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await getTaskById(id ? parseInt(id) : 0);
        setTask(result);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleDeleteTask = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await deleteTask(id);
        setTask(null); // Clear the task after deletion
        window.history.back();
        alert("Task deleted successfully.");
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <EyeIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                👁️ View Task
              </h1>
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
          {task ? (
            <div className="space-y-6">
              {/* Task Title */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {task.title}
                </h2>
                {task.description && (
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">📊</span>
                    </div>
                    <span className="font-semibold text-gray-700">Status</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      task.status === "done"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status === "done"
                      ? "✅ Done"
                      : task.status === "in_progress"
                      ? "⏳ In Progress"
                      : "📋 To Do"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 font-bold">🔥</span>
                    </div>
                    <span className="font-semibold text-gray-700">
                      Priority
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority === "high"
                      ? "🔴 High"
                      : task.priority === "medium"
                      ? "🟡 Medium"
                      : "🟢 Low"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">👤</span>
                    </div>
                    <span className="font-semibold text-gray-700">
                      Assignee ID
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {task.assignee_id || "Unassigned"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold">🗓️</span>
                    </div>
                    <span className="font-semibold text-gray-700">
                      Start Date
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {task.start_date
                      ? new Date(task.start_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Not set"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold">📅</span>
                    </div>
                    <span className="font-semibold text-gray-700">
                      Due Date
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Not set"}
                  </span>
                </div>

                {task.created_time && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-bold">⏰</span>
                      </div>
                      <span className="font-semibold text-gray-700">
                        Created
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      {new Date(task.created_time).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate(`/update-task/${task.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    if (typeof task.id === "number") {
                      handleDeleteTask(task.id);
                    } else {
                      alert("Task ID is missing.");
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <TrashIcon className="w-5 h-5" />
                  Delete Task
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading task details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTaskPage;
