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
    onSuccess: async (data) => {
      const token = data?.UserInfo?.token;

      if (!token) {
        toast.error("Login Failed, Token not received.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("full_name", data.UserInfo.user.full_name);
      localStorage.setItem("username", data.UserInfo.user.name);
      localStorage.setItem("user_type_id", data.UserInfo.user.user_type_id);

      await fetchPagePermission();
      await fetchPermissions();

      navigate("/home");
      toast.success("User Logged In Successfully");
    },
    onError: () => {
      toast.error("An error occurred during login.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPanelUp) {
      navigate("/maintenance");
      return;
    }

    loginUser({ username: email, password });
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="If you are already a member, easily log in"
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
