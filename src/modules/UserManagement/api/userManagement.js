import api from "@/lib/axios";

export const fetchPageControls = async () => {
  const response = await api.get("/panel-fetch-usercontrol-new");
  return response?.data?.usercontrol ?? [];
};
export const fetchUserControlNew = fetchPageControls;

export const updatePageControl = async ({ id, data }) => {
  const response = await api.put(`/panel-update-usercontrol-new/${id}`, data);
  return response.data;
};
export const updateUserControlNew = updatePageControl;

export const fetchButtonControls = async () => {
  const response = await api.get("/panel-fetch-usercontrol");
  return response?.data?.usercontrol ?? [];
};
export const fetchUserControl = fetchButtonControls;

export const updateButtonControl = async ({ id, data }) => {
  const response = await api.put(`/panel-update-usercontrol/${id}`, data);
  return response.data;
};
export const updateUserControl = updateButtonControl;

export const createButtonControl = async (data) => {
  const response = await api.post("/panel-create-usercontrol", data);
  return response.data;
};
export const createUserControl = createButtonControl;
