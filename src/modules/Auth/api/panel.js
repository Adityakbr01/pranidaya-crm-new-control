import api from "@/lib/axios";

export const checkStatus = async () => {
  const res = await api.get("/check-status");
  return res.data;
};

export const fetchPermissions = async () => {
  const res = await api.get("/panel-fetch-usercontrol");
  return res.data;
};

export const fetchPagePermission = async () => {
  const res = await api.get("/panel-fetch-usercontrol-new");
  return res.data;
};

export const fetchDates = async () => {
  const res = await api.get("/fetch-last-two-days-date");
  return res.data;
};