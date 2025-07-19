import { useForm } from "react-hook-form";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ISearchFormInput {
  status?: string;
  priority?: string;
}

type SearchTasksProps = {
  onSearch?: (data: ISearchFormInput) => void;
};

const SearchTasks = ({ onSearch }: SearchTasksProps) => {
  const { register, handleSubmit, reset, watch } = useForm<ISearchFormInput>({
    defaultValues: {
      status: "",
      priority: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const hasFilters = watchedValues.status || watchedValues.priority;

  const onSubmit = (data: ISearchFormInput) => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(data);
    }
  };

  const handleReset = () => {
    reset();
    if (onSearch && typeof onSearch === "function") {
      onSearch({ status: "", priority: "" });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100 transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
            <FunnelIcon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            🔍 Filter Tasks
          </h3>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-blue-600"
            >
              📊 Status
            </label>
            <div className="relative">
              <select
                {...register("status")}
                id="status"
                name="status"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 appearance-none cursor-pointer group-hover:border-gray-400"
              >
                <option value="">All Statuses</option>
                <option value="to_do">📋 To Do</option>
                <option value="in_progress">⏳ In Progress</option>
                <option value="done">✅ Done</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-blue-600"
            >
              🔥 Priority
            </label>
            <div className="relative">
              <select
                {...register("priority")}
                id="priority"
                name="priority"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 appearance-none cursor-pointer group-hover:border-gray-400"
              >
                <option value="">All Priorities</option>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Search Tasks</span>
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <XMarkIcon className="w-5 h-5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Filter Summary */}
        {hasFilters && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {watchedValues.status && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Status:{" "}
                  {watchedValues.status === "to_do"
                    ? "📋 To Do"
                    : watchedValues.status === "in_progress"
                    ? "⏳ In Progress"
                    : "✅ Done"}
                </span>
              )}
              {watchedValues.priority && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  Priority:{" "}
                  {watchedValues.priority === "low"
                    ? "🟢 Low"
                    : watchedValues.priority === "medium"
                    ? "🟡 Medium"
                    : "🔴 High"}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchTasks;
