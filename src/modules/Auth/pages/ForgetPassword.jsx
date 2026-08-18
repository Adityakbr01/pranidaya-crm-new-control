import { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "@/modules/Auth/components/AuthLayout";
import ForgetPasswordForm from "@/modules/Auth/components/ForgetPasswordForm";
import { useSendPasswordReset } from "@/modules/Auth/hooks/useAuth";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: resetPassword, isPending } = useSendPasswordReset({
    onSuccess: () => {
      toast.success("New Password Sent to your Email");
    },
    onError: () => {
      toast.error("Email Not sent.");
    },
  });

  const onResetPassword = (e) => {
    e.preventDefault();

    if (!email || !username) {
      toast.warning("Please enter a Username & Email");
      return;
    }

    resetPassword({ username, email });
  };

  return (
    <AuthLayout
      title="Forget Password"
      subtitle="Get started with Pranidaya"
      variant="split"
    >
      <ForgetPasswordForm
        username={username}
        email={email}
        loading={isPending}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubmit={onResetPassword}
      />
    </AuthLayout>
  );
};

export default ForgetPassword;
