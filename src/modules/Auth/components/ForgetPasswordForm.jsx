import { Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { inputClass } from "@/components/common/Buttoncss";

const ForgetPasswordForm = ({
  username,
  email,
  loading,
  onUsernameChange,
  onEmailChange,
  onSubmit,
}) => {
  return (
    <form method="POST" className="mt-8 w-full" onSubmit={onSubmit}>
      <div className="mb-6 flex flex-col gap-6">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Username
          </Typography>
          <Input
            id="username"
            name="username"
            size="lg"
            placeholder="Enter your username"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={username}
            onChange={onUsernameChange}
          />
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Email Address
          </Typography>
          <Input
            id="email"
            name="email"
            type="email"
            size="lg"
            placeholder="name@gmail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={email}
            onChange={onEmailChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`${inputClass} w-full`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Forget Password"}
      </button>

      <div className="mt-6 flex items-center justify-between gap-2">
        <Typography
          variant="paragraph"
          className="mt-4 text-center font-medium text-blue-gray-500"
        >
          Remembered your password?
          <Link to="/" className="ml-1 text-gray-900">
            Sign In
          </Link>
        </Typography>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
