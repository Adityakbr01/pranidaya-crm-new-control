import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthLayout from "@/modules/Auth/components/AuthLayout";
import RegisterForm from "@/modules/Auth/components/RegisterForm";

const SIgnUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.warning("Please agree to the Terms and Conditions");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info("Registration is managed by organization administrator");
    }, 800);
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Pranidaya CRM portal to coordinate care and services"
      badgeText="New Registration"
      variant="split"
    >
      <RegisterForm
        fullName={fullName}
        email={email}
        password={password}
        agreeTerms={agreeTerms}
        loading={loading}
        onFullNameChange={(e) => setFullName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onAgreeTermsChange={(e) => setAgreeTerms(e.target.checked)}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default SIgnUp;
