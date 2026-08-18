import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCashReceiptList,
  fetchCashReceiptById,
  createCashReceipt,
  updateCashReceipt,
  sendCashReceipt,
  fetchMaterialReceiptList,
  fetchMaterialReceiptById,
  createMaterialReceipt,
  updateMaterialReceipt,
  sendMaterialReceipt,
  fetchCashReceiptDate,
  fetchMaterialReceiptDate,
} from "@/modules/Receipts/api/receipts";

// Cash Receipts
export const useCashReceiptList = () =>
  useQuery({
    queryKey: ["cash-receipt-list"],
    queryFn: fetchCashReceiptList,
    staleTime: 60_000,
  });

export const useCashReceiptById = (id, options = {}) =>
  useQuery({
    queryKey: ["cash-receipt", id],
    queryFn: () => fetchCashReceiptById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCashReceiptDate = () =>
  useQuery({
    queryKey: ["cash-receipt-date"],
    queryFn: fetchCashReceiptDate,
    staleTime: 60_000,
  });

export const useCreateCashReceipt = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCashReceipt,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["cash-receipt-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateCashReceipt = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCashReceipt,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["cash-receipt-list"] });
      queryClient.invalidateQueries({ queryKey: ["cash-receipt"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

// Material Receipts
export const useMaterialReceiptList = () =>
  useQuery({
    queryKey: ["material-receipt-list"],
    queryFn: fetchMaterialReceiptList,
    staleTime: 60_000,
  });

export const useMaterialReceiptById = (id, options = {}) =>
  useQuery({
    queryKey: ["material-receipt", id],
    queryFn: () => fetchMaterialReceiptById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useMaterialReceiptDate = () =>
  useQuery({
    queryKey: ["material-receipt-date"],
    queryFn: fetchMaterialReceiptDate,
    staleTime: 60_000,
  });

export const useCreateMaterialReceipt = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMaterialReceipt,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["material-receipt-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateMaterialReceipt = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMaterialReceipt,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["material-receipt-list"] });
      queryClient.invalidateQueries({ queryKey: ["material-receipt"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};
