import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextPanel } from "@/utils/ContextPanel";
import { useLogin } from "@/modules/Auth/hooks/useAuth";
import AuthLayout from "@/modules/Auth/components/AuthLayout";
import LoginForm from "@/modules/Auth/components/LoginForm";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPanelUp, fetchPermissions, fetchPagePermission } =
    useContext(ContextPanel);
  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = useLogin({
    onSuccess: async (result) => {
      if (result?.UserInfo?.token) {
        const token = result.UserInfo.token;
        localStorage.setItem("token", token);
        localStorage.setItem("full_name", result.UserInfo.user.full_name);
        localStorage.setItem("username", result.UserInfo.user.name);
        localStorage.setItem(
          "user_type_id",
          result.UserInfo.user.user_type_id
        );
        await fetchPagePermission();
        await fetchPermissions();

        navigate("/home");
        toast.success("User Logged In Successfully");
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "An error occurred during login."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    if (!email || !password) {
      toast.warning("Please enter both username and password");
      return;
    }

    loginUser({ username: email, password });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access the CRM control panel"
      badgeText="Portal v2.0"
      variant="split"
    >
      <LoginForm
        email={email}
        password={password}
        loading={isPending}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default SignIn;
