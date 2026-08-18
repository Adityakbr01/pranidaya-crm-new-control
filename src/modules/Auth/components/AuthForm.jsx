import { useContext } from "react";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/modules/Auth/hooks/useAuth.js";

export const AuthForm = ({ onSubmit, title, subtitle, children }) => {
  const navigate = useNavigate();
  const { loading, error } = useAuth();

  return (
    <Card>
      <Typography variant="h2" className="text-center mb-6">
        {title}
      </Typography>
      <Typography variant="small" color="blue-gray" className="text-center mb-8">
        {subtitle}
      </Typography>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        {children}
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </Card>
  );
};