import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAnimalTypeList,
  fetchAnimalTypeById,
  createAnimalType,
  updateAnimalType,
  fetchAnimalBornArrivalList,
  fetchAnimalBornArrivalOptions,
  fetchAnimalBornArrivalGenderCount,
  createAnimalBornArrival,
  fetchAnimalDeadList,
  createAnimalDead,
  fetchAnimalMeatList,
  fetchAnimalMeatById,
  createAnimalMeat,
  updateAnimalMeat,
  fetchAnimalStockSummary,
  fetchAnimalStockSummaryView,
} from "@/modules/AnimalStock/api/animal";

// Animal Types
export const useAnimalTypeList = () =>
  useQuery({
    queryKey: ["animal-type-list"],
    queryFn: fetchAnimalTypeList,
    staleTime: 60_000,
  });

export const useAnimalTypeById = (id, options = {}) =>
  useQuery({
    queryKey: ["animal-type", id],
    queryFn: () => fetchAnimalTypeById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateAnimalType = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnimalType,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["animal-type-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateAnimalType = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAnimalType,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["animal-type-list"] });
      queryClient.invalidateQueries({ queryKey: ["animal-type"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

// Born Arrival
export const useAnimalBornArrivalList = () =>
  useQuery({
    queryKey: ["animal-born-arrival-list"],
    queryFn: fetchAnimalBornArrivalList,
    staleTime: 60_000,
  });

export const useAnimalBornArrivalOptions = () =>
  useQuery({
    queryKey: ["animal-born-arrival-options"],
    queryFn: fetchAnimalBornArrivalOptions,
    staleTime: 60_000,
  });

export const useCreateAnimalBornArrival = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnimalBornArrival,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["animal-born-arrival-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

// Animal Dead
export const useAnimalDeadList = () =>
  useQuery({
    queryKey: ["animal-dead-list"],
    queryFn: fetchAnimalDeadList,
    staleTime: 60_000,
  });

export const useCreateAnimalDead = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnimalDead,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["animal-dead-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

// Animal Meat
export const useAnimalMeatList = () =>
  useQuery({
    queryKey: ["animal-meat-list"],
    queryFn: fetchAnimalMeatList,
    staleTime: 60_000,
  });

export const useAnimalMeatById = (id, options = {}) =>
  useQuery({
    queryKey: ["animal-meat", id],
    queryFn: () => fetchAnimalMeatById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateAnimalMeat = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnimalMeat,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["animal-meat-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateAnimalMeat = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAnimalMeat,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["animal-meat-list"] });
      queryClient.invalidateQueries({ queryKey: ["animal-meat"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};
