import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/lib/axios";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
  const [isPanelUp, setIsPanelUp] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [dates, setDates] = useState({
    c_receipts: [],
    m_receipt: [],
    website_donation: [],
  });
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type_id");
  const checkPanelStatus = async () => {
    try {
      const response = await api.get("/check-status");
      const datas = response.data;
      setIsPanelUp(datas);
      setError(!datas?.success);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      localStorage.clear();
      navigate("/maintenance");
    } else if (
      !token &&
      !["/", "/forget-password"].includes(location.pathname)
    ) {
      navigate("/");
    }
  }, [error, navigate, isPanelUp, location.pathname]);

  useEffect(() => {
    checkPanelStatus();
    const intervalId = setInterval(checkPanelStatus, 300000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    console.log("Current Route:", location.pathname);
  }, [location.pathname]);

  const fetchDates = async () => {
    try {
      const data = await api.get("/fetch-last-two-days-date");
      setDates(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPagePermission = async () => {
    try {
      const response = await api.get("/panel-fetch-usercontrol-new");
      localStorage.setItem(
        "pageControl",
        JSON.stringify(response.data?.usercontrol),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await api.get("/panel-fetch-usercontrol");
      localStorage.setItem(
        "userControl",
        JSON.stringify(response.data?.usercontrol),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPermissions();
      fetchPagePermission();
    }
  }, [token]);

  useEffect(() => {
    if (token && Number(userType) == 5) {
      fetchDates();
    }
  }, [token, userType]);

  return (
    <ContextPanel.Provider
      value={{
        isPanelUp,
        setIsPanelUp,
        fetchPermissions,
        fetchPagePermission,
        dates,
      }}
    >
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;
