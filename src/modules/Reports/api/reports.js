import api from "@/lib/axios";

export const fetchDonationSummary = async (payload) => {
  const response = await api.post("/fetch-donation-summary", payload);
  return response.data;
};

export const fetchStockSummaryReport = async (payload) => {
  const response = await api.post("/fetch-stock-summary", payload);
  return response.data;
};
export const fetchStockSummary = fetchStockSummaryReport;
