import api from "@/lib/axios";

// Cash Receipts
export const fetchCashReceiptList = async () => {
  const response = await api.get("/fetch-c-receipt-list");
  return response?.data?.receipts ?? response?.data?.c_receipt ?? [];
};

export const fetchCashReceiptById = async (id) => {
  const response = await api.get(`/fetch-c-receipt-by-id/${id}`);
  return response.data;
};

export const createCashReceipt = async (data) => {
  const response = await api.post("/create-c-receipt", data);
  return response.data;
};

export const updateCashReceipt = async ({ id, data }) => {
  const response = await api.put(`/update-c-receipt/${id}`, data);
  return response.data;
};

export const sendCashReceipt = async (id) => {
  const response = await api.get(`/send-receiptc/${id}`);
  return response.data;
};

export const updateDonorEmail = async ({ donorId, email }) => {
  const response = await api.put(`/update-donor-email/${donorId}`, { donor_email: email });
  return response.data;
};

// Material Receipts
export const fetchMaterialReceiptList = async () => {
  const response = await api.get("/fetch-m-receipt-list");
  return response?.data?.receipts ?? response?.data?.m_receipt ?? [];
};

export const fetchMaterialReceiptById = async (id) => {
  const response = await api.get(`/fetch-m-receipt-by-id/${id}`);
  return response.data;
};

export const createMaterialReceipt = async (data) => {
  const response = await api.post("/create-m-receipt", data);
  return response.data;
};

export const updateMaterialReceipt = async ({ id, data }) => {
  const response = await api.put(`/update-m-receipt/${id}`, data);
  return response.data;
};

export const sendMaterialReceipt = async (id) => {
  const response = await api.get(`/send-receiptm/${id}`);
  return response.data;
};

// Dates & Helpers
export const fetchCashReceiptDate = async () => {
  const response = await api.get("/fetch-c-receipt-date");
  return response?.data?.latestdate?.c_receipt_date;
};

export const fetchMaterialReceiptDate = async () => {
  const response = await api.get("/fetch-m-receipt-date");
  return response?.data?.latestdate?.m_receipt_date;
};
