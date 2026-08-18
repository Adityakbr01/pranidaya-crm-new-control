import api from "@/lib/axios";

export const fetchDonorList = async () => {
  const response = await api.get("/fetch-donor-list");
  return response?.data?.donor ?? [];
};

export const createDonor = async (payload) => {
  const response = await api.post("/create-donor", payload);
  return response.data;
};

export const fetchDonorById = async (id) => {
  const response = await api.get(`/fetch-donor-by-id/${id}`);
  return response?.data?.donor ?? response.data;
};

export const fetchStates = async () => {
  const response = await api.get("/fetch-states");
  return response?.data?.states ?? [];
};

export const updateDonorById = async ({ id, data }) => {
  const response = await api.put(`/update-donor-by-id/${id}`, data);
  return response.data;
};

export const updateDonor = async ({ id, data }) => {
  const response = await api.put(`/update-donor/${id}`, data);
  return response.data;
};

export const fetchDonorReceiptsById = async (id) => {
  const response = await api.get(`/fetch-donor-receipts-by-id/${id}`);
  return response?.data?.donor ?? response.data;
};

export const fetchDonorReceiptsByIdNew = async (id) => {
  const response = await api.get(`/fetch-donor-receipt-by-id-new/${id}`);
  return response.data;
};

export const fetchDonorViewById = async (id) => {
  const response = await api.get(`/fetch-donor-view-by-id/${id}`);
  return response?.data ?? response.data;
};

export const fetchFamilyMemberById = async (id) => {
  const response = await api.get(`/fetch-family-member-by-id/${id}`);
  return response?.data?.donor ?? response?.data?.family_member ?? [];
};

export const createFamilyMember = async ({ donorId, familyFullName, familyRelation }) => {
  const response = await api.post("/create-family-member", {
    donor_fts_id: donorId,
    family_full_name: familyFullName,
    family_relation: familyRelation,
  });
  return response.data;
};

export const fetchDonorsDuplicate = async () => {
  const response = await api.get("/fetch-donors-duplicate");
  return response?.data?.individualCompanies ?? [];
};
export const fetchDonorDuplicateList = fetchDonorsDuplicate;

export const updateDonorsDuplicateById = async (id) => {
  const response = await api.put(`/update-donors-duplicate-by-id/${id}`);
  return response.data;
};
export const convertDonorDuplicate = updateDonorsDuplicateById;

export const fetchDonorsDuplicateById = async (id) => {
  const response = await api.get(`/fetch-donors-duplicate-by-id/${id}`);
  return response.data;
};
export const fetchDonorDuplicateById = fetchDonorsDuplicateById;

export const updateDonorsDuplicate = async ({ id, data }) => {
  const response = await api.put(`/update-donors-duplicate/${id}`, data);
  return response.data;
};
export const updateDonorDuplicate = updateDonorsDuplicate;

export const updateDonorsDuplicateReceiptFamilyMember = async ({ id, data }) => {
  const response = await api.put(`/update-donors-duplicate-receipt-family-member/${id}`, data);
  return response.data;
};

export const updateDonorsDuplicateZeroReceiptFamilyMember = async ({ id, data }) => {
  const response = await api.put(`/update-donors-duplicate-zero-receipt-family-member/${id}`, data);
  return response.data;
};

export const fetchDonors = async () => {
  const response = await api.get("/fetch-donors");
  return response?.data?.individualCompanies ?? [];
};

export const fetchCashReceiptsAllById = async (id) => {
  const response = await api.get(`/fetch-c-receipt-all-by-id/${id}`);
  return response?.data?.receipts ?? [];
};

export const fetchMaterialReceiptsAllById = async (id) => {
  const response = await api.get(`/fetch-m-receipt-all-by-id/${id}`);
  return response?.data?.receipts ?? [];
};
