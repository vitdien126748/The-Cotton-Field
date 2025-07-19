import {
  LockClosedIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

const AccessDeniedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-500 rounded-full p-4">
              <LockClosedIcon className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Warning Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
              <ShieldExclamationIcon className="w-5 h-5" />
              <span>🚫 Access Restricted</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Access Denied
              </h1>
              <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                🔒 You don't have permission to access this page
              </p>
              <p className="text-sm text-gray-500">
                Please contact your administrator if you believe this is an
                error, or return to the login page to authenticate with proper
                credentials.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="/login"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <LockClosedIcon className="w-5 h-5" />
                Back to Login
              </a>
              <button
                onClick={() => window.history.back()}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-4 text-gray-400">
              <div className="w-2 h-2 bg-red-300 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span>
            Need Help?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Check if you're logged in with the correct account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Verify your user permissions with your administrator</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>
                Try refreshing the page or clearing your browser cache
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
