import api from "@/lib/axios";

// Stock Summary
export const fetchItemStock = async () => {
  const response = await api.post("/fetch-item-stock", {});
  return response?.data?.stock ?? [];
};

export const fetchStockSummary = async (payload) => {
  const response = await api.post("/fetch-stock-summary", payload);
  return response.data;
};

// Purchase
export const fetchPurchaseList = async () => {
  const response = await api.get("/fetch-purchase-list");
  return response?.data?.purchase ?? [];
};

export const fetchPurchaseById = async (id) => {
  const response = await api.get(`/fetch-purchase-by-id/${id}`);
  return response?.data?.purchase ?? response.data;
};

export const createPurchase = async (data) => {
  const response = await api.post("/create-purchase", data);
  return response.data;
};

export const updatePurchase = async ({ id, data }) => {
  const response = await api.put(`/update-purchase/${id}`, data);
  return response.data;
};

// Consumption
export const fetchConsumptionList = async () => {
  const response = await api.get("/fetch-cons-list");
  return response?.data?.cons ?? [];
};

export const fetchConsumptionById = async (id) => {
  const response = await api.get(`/fetch-cons-by-id/${id}`);
  return response?.data?.cons ?? response.data;
};

export const createConsumption = async (data) => {
  const response = await api.post("/create-cons", data);
  return response.data;
};

export const updateConsumption = async ({ id, data }) => {
  const response = await api.put(`/update-cons/${id}`, data);
  return response.data;
};
