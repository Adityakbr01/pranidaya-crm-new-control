import api from "@/lib/axios";

// Animal Type
export const fetchAnimalTypeList = async () => {
  const response = await api.get("/fetch-animalType-list");
  return response?.data?.animalType ?? [];
};

export const fetchAnimalTypeById = async (id) => {
  const response = await api.get(`/fetch-animalType-by-id/${id}`);
  return response?.data?.animalType ?? response.data;
};

export const fetchAnimalTypeByGender = async (gender) => {
  const response = await api.get(`/fetch-animalType-by-value/${gender}`);
  return response?.data?.animalType ?? [];
};

export const createAnimalType = async (data) => {
  const response = await api.post("/create-animalType", data);
  return response.data;
};

export const updateAnimalType = async ({ id, data }) => {
  const response = await api.put(`/update-animalType/${id}`, data);
  return response.data;
};

// Animal Born / Arrival
export const fetchAnimalBornArrivalList = async () => {
  const response = await api.get("/fetch-animalBornArrival-list");
  return response?.data?.animalBornArrival ?? [];
};

export const fetchAnimalBornArrivalOptions = async () => {
  const response = await api.get("/fetch-animalBornArrival");
  return response?.data?.animalBornArrival ?? [];
};

export const fetchAnimalBornArrivalByGender = async (gender) => {
  const response = await api.get(`/fetch-animalBornArrival-by-value/${gender}`);
  return response?.data?.animalBornArrival ?? {};
};

export const fetchAnimalMeetByFatherMother = async (fatherNo, motherNo) => {
  const response = await api.get(`/fetch-animalMeet-by-value/${fatherNo}/${motherNo}`);
  return response?.data?.animalMeet ?? {};
};

export const fetchAnimalBornArrivalGenderCount = async (animalTypeId) => {
  const response = await api.get(`/fetch-animalBornArrival-gender-count/${animalTypeId}`);
  return response?.data?.animalBornArrival ?? response.data;
};

export const createAnimalBornArrival = async (data) => {
  const response = await api.post("/create-animalBornArrival", data);
  return response.data;
};

// Animal Dead
export const fetchAnimalDeadList = async () => {
  const response = await api.get("/fetch-animalDead-list");
  return response?.data?.animalDead ?? [];
};

export const createAnimalDead = async (data) => {
  const response = await api.post("/create-animalDead", data);
  return response.data;
};

// Animal Meat / Meet
export const fetchAnimalMeatList = async () => {
  const response = await api.get("/fetch-animalMeet-list");
  return response?.data?.animalMeet ?? [];
};

export const fetchAnimalMeatById = async (id) => {
  const response = await api.get(`/fetch-animalMeet-by-id/${id}`);
  return response?.data?.animalMeet ?? response.data;
};

export const createAnimalMeat = async (data) => {
  const response = await api.post("/create-animalMeet", data);
  return response.data;
};

export const updateAnimalMeat = async ({ id, data }) => {
  const response = await api.put(`/update-animalMeet/${id}`, data);
  return response.data;
};

// Animal Stocks Summary
export const fetchAnimalTypeStock = async (payload) => {
  const response = await api.post("/fetch-animalType-stock", payload);
  return response.data;
};

export const fetchAnimalStockSummary = async (payload) => {
  const response = await api.post("/fetch-animal-stock-summary", payload);
  return response.data;
};

export const fetchAnimalStockSummaryView = async (payload) => {
  const response = await api.post("/fetch-animal-stock-summary-view", payload);
  return response.data;
};

export const downloadAnimalStockSummary = async (payload) => {
  const response = await api.post("/download-animalstock-summary", payload, {
    responseType: "blob",
  });
  return response.data;
};

export const downloadAnimalStockSummaryDetail = async (payload) => {
  const response = await api.post("/download-animalstock-summary-detail", payload, {
    responseType: "blob",
  });
  return response.data;
};
