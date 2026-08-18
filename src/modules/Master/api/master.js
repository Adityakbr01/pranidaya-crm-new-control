import api from "@/lib/axios";

// Common Master Lookups
export const fetchYear = async () => {
  const response = await api.get("/fetch-year");
  return response?.data?.year?.current_year ?? response.data;
};

export const fetchStates = async () => {
  const response = await api.get("/fetch-states");
  return response?.data?.states ?? [];
};

export const fetchVendorOptions = async () => {
  const response = await api.get("/fetch-vendor");
  return response?.data?.vendor ?? [];
};

export const fetchItemOptions = async () => {
  const response = await api.get("/fetch-item");
  return response?.data?.item ?? [];
};

export const fetchOccasionOptions = async () => {
  const response = await api.get("/fetch-occasion");
  return response?.data?.occasion ?? [];
};

// Item List / Enquiry List
export const fetchItemList = async () => {
  const response = await api.get("/fetch-item-list");
  return response?.data?.item ?? [];
};

export const fetchItemById = async (id) => {
  const response = await api.get(`/fetch-item-by-id/${id}`);
  return response?.data?.item ?? response.data;
};

export const createItem = async (data) => {
  const response = await api.post("/create-item", data);
  return response.data;
};

export const updateItem = async ({ id, data }) => {
  const response = await api.put(`/update-item-by-id/${id}`, data);
  return response.data;
};

// Occasion List
export const fetchOccasionList = async () => {
  const response = await api.get("/fetch-occasion-list");
  return response?.data?.occasion ?? [];
};

export const fetchOccasionById = async (id) => {
  const response = await api.get(`/fetch-occasion-by-id/${id}`);
  return response?.data?.occasion ?? response.data;
};

export const createOccasion = async (data) => {
  const response = await api.post("/create-occasion", data);
  return response.data;
};

export const updateOccasion = async ({ id, data }) => {
  const response = await api.put(`/update-occasion-by-id/${id}`, data);
  return response.data;
};

// Vendor List
export const fetchVendorList = async () => {
  const response = await api.get("/fetch-vendor-list");
  return response?.data?.vendor ?? [];
};

export const fetchVendorById = async (id) => {
  const response = await api.get(`/fetch-vendor-by-id/${id}`);
  return response?.data?.vendor ?? response.data;
};

export const createVendor = async (data) => {
  const response = await api.post("/create-vendor", data);
  return response.data;
};

export const updateVendor = async ({ id, data }) => {
  const response = await api.put(`/update-vendor-by-id/${id}`, data);
  return response.data;
};
