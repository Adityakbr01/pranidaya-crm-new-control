import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItemStock,
  fetchStockSummary,
  fetchPurchaseList,
  fetchPurchaseById,
  createPurchase,
  updatePurchase,
  fetchConsumptionList,
  fetchConsumptionById,
  createConsumption,
  updateConsumption,
} from "@/modules/Stock/api/stock";

export const useItemStock = () =>
  useQuery({
    queryKey: ["item-stock"],
    queryFn: fetchItemStock,
    staleTime: 60_000,
  });

export const usePurchaseList = () =>
  useQuery({
    queryKey: ["purchase-list"],
    queryFn: fetchPurchaseList,
    staleTime: 60_000,
  });

export const usePurchaseById = (id, options = {}) =>
  useQuery({
    queryKey: ["purchase", id],
    queryFn: () => fetchPurchaseById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreatePurchase = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPurchase,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["purchase-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdatePurchase = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePurchase,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["purchase-list"] });
      queryClient.invalidateQueries({ queryKey: ["purchase"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useConsumptionList = () =>
  useQuery({
    queryKey: ["consumption-list"],
    queryFn: fetchConsumptionList,
    staleTime: 60_000,
  });

export const useConsumptionById = (id, options = {}) =>
  useQuery({
    queryKey: ["consumption", id],
    queryFn: () => fetchConsumptionById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateConsumption = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConsumption,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["consumption-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateConsumption = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateConsumption,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["consumption-list"] });
      queryClient.invalidateQueries({ queryKey: ["consumption"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};
