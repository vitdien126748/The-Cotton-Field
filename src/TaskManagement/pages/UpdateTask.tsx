import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getTaskById, updateTask } from "../services";
import { useParams } from "react-router";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface IUpdateTaskFormInput {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "to_do" | "in_progress" | "done";
  start_date: string;
  due_date: string;
  assignee_id: number;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  status: yup
    .string()
    .oneOf(["to_do", "in_progress", "done"])
    .required("Status is required"),
  start_date: yup.string().required("Start date is required"),
  due_date: yup.string().required("Due date is required"),
  assignee_id: yup.number().required("Assignee ID is required"),
});

export default function UpdateTaskPage() {
  const { taskId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateTaskFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTask = async () => {
      const task = getTaskById(Number(taskId));

      if (task) {
        task.then((taskData) => {
          setValue("title", taskData.title);
          setValue(
            "description",
            taskData.description ? taskData.description : ""
          );
          setValue("priority", taskData.priority);
          setValue("status", taskData.status);
          setValue(
            "start_date",
            taskData.start_date
              ? new Date(taskData.start_date).toISOString().split("T")[0]
              : ""
          );
          setValue(
            "due_date",
            taskData.due_date
              ? new Date(taskData.due_date).toISOString().split("T")[0]
              : ""
          );
          setValue("assignee_id", taskData.assignee_id || 0);
        });
      }
    };
    fetchTask();
  }, [taskId, setValue]);

  const onSubmit: SubmitHandler<IUpdateTaskFormInput> = (data) => {
    if (taskId) {
      const taskData = {
        ...data,
        start_date: new Date(data.start_date),
        due_date: new Date(data.due_date),
      };
      updateTask(Number(taskId), taskData);
      window.history.back();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <PencilSquareIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                ✏️ Update Task
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  📝 Task Title *
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive task title"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                    errors.title
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Describe the task in detail..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 resize-none ${
                    errors.description
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  🗓️ Start Date *
                </label>
                <input
                  {...register("start_date")}
                  type="date"
                  id="start_date"
                  name="start_date"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                    errors.start_date
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                />
                {errors.start_date && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.start_date.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  📅 Due Date *
                </label>
                <input
                  {...register("due_date")}
                  type="date"
                  id="due_date"
                  name="due_date"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                    errors.due_date
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                />
                {errors.due_date && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.due_date.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Status *
                </label>
                <select
                  {...register("status")}
                  id="status"
                  name="status"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                    errors.status
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                >
                  <option value="">Select Status</option>
                  <option value="to_do">📋 To Do</option>
                  <option value="in_progress">⏳ In Progress</option>
                  <option value="done">✅ Done</option>
                </select>
                {errors.status && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.status.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Priority *
                </label>
                <select
                  {...register("priority")}
                  id="priority"
                  name="priority"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                    errors.priority
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                >
                  <option value="">Select Priority</option>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
                {errors.priority && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.priority.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="assignee_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  👤 Assignee ID *
                </label>
                <input
                  {...register("assignee_id")}
                  type="number"
                  id="assignee_id"
                  name="assignee_id"
                  placeholder="Enter assignee ID"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition duration-200 ${
                    errors.assignee_id
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  } bg-gray-50 hover:bg-white`}
                />
                {errors.assignee_id && (
                  <span className="text-red-500 text-sm mt-1 block animate-pulse">
                    {errors.assignee_id.message}
                  </span>
                )}
              </div>
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
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <PencilSquareIcon className="w-5 h-5" />
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
