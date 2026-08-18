import api from "@/lib/axios";

export const downloadWebsiteDonation = async (payload) => {
  const response = await api.post("/download-website-donation", payload, {
    responseType: "blob",
  });
  return response.data;
};
export const downloadWebsiteDonations = downloadWebsiteDonation;

export const downloadPurchase = async (payload) => {
  const response = await api.post("/download-purchase", payload, {
    responseType: "blob",
  });
  return response.data;
};

export const downloadDetailPurchase = async (payload) => {
  const response = await api.post("/download-detail-purchase", payload, {
    responseType: "blob",
  });
  return response.data;
};

export const downloadMaterialReceipt = async (payload) => {
  const response = await api.post("/download-material-receipt", payload, {
    responseType: "blob",
  });
  return response.data;
};
export const downloadMaterialReceipts = downloadMaterialReceipt;

export const downloadDetailMaterialReceipt = async (payload) => {
  const response = await api.post("/download-detail-material-receipt", payload, {
    responseType: "blob",
  });
  return response.data;
};
export const downloadDetailMaterialReceipts = downloadDetailMaterialReceipt;

export const downloadDonor = async (payload) => {
  const response = await api.post("/download-donor", payload, {
    responseType: "blob",
  });
  return response.data;
};
export const downloadDonorList = downloadDonor;

export const downloadReceipt = async (payload) => {
  const response = await api.post("/download-receipt", payload, {
    responseType: "blob",
  });
  return response.data;
};
export const downloadCashReceipts = downloadReceipt;

export const downloadConsumption = async (payload) => {
  const response = await api.post("/download-consumption", payload, {
    responseType: "blob",
  });
  return response.data;
};
