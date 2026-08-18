import { Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { inputClass } from "@/components/common/Buttoncss";

const LoginForm = ({
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} method="POST" className="mt-2 w-full">
      <div className="mb-6 flex flex-col gap-6">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            User Name
          </Typography>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={onEmailChange}
            size="lg"
            placeholder="username"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <div>
          <div className="mb-3 flex justify-between">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Password
            </Typography>
          </div>

          <Input
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            type="password"
            size="lg"
            placeholder="********"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`${inputClass} w-full flex items-center justify-center space-x-3 py-2 px-4 transition-all duration-300 ease-in-out transform ${
          loading ? "opacity-75 cursor-not-allowed scale-95" : "scale-100"
        }`}
      >
        {loading ? (
          <>
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
            <span className="animate-pulse">Checking...</span>
          </>
        ) : (
          <span className="opacity-100 transition-opacity duration-300 ease-in-out">
            Sign In
          </span>
        )}
      </button>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Typography
          variant="small"
          className="border-b border-blue-500 p-2 font-medium text-gray-900 hover:rounded-lg hover:bg-blue-200"
        >
          <Link to="/forget-password" className="ml-1 text-gray-900">
            Forgot Password
          </Link>
        </Typography>
      </div>
    </form>
  );
};

export default LoginForm;
