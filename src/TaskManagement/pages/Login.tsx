import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useAuth } from "../useAuth";

interface ILoginFormInput {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().email().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { username: "tungnt@softech.vn", password: "123456789" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    login({
      username: data.username,
      password: data.password,
      navigate,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-blue-300 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src="/icons8-task-pastel-color-96.png"
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 mb-4 animate-bounce"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 text-center">
            Task Management
          </h2>
          <p className="text-gray-500 text-center">Sign in to your account</p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="username"
                {...register("username")}
                className={`w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none ${
                  errors.username ? "border-red-400" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-gray-50 hover:bg-blue-50 text-gray-900`}
                placeholder="Enter your email"
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-xs mt-1 block animate-pulse">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-gray-50 hover:bg-blue-50 text-gray-900`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block animate-pulse">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-lg tracking-wide transform hover:scale-105 active:scale-95"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-blue-500 hover:text-purple-500 hover:underline text-sm transition duration-200"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
