import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchYear,
  fetchStates,
  fetchVendorOptions,
  fetchItemOptions,
  fetchOccasionOptions,
  fetchItemList,
  fetchItemById,
  createItem,
  updateItem,
  fetchOccasionList,
  fetchOccasionById,
  createOccasion,
  updateOccasion,
  fetchVendorList,
  fetchVendorById,
  createVendor,
  updateVendor,
} from "@/modules/Master/api/master";

// Lookups
export const useYear = () =>
  useQuery({
    queryKey: ["year"],
    queryFn: fetchYear,
    staleTime: 5 * 60_000,
  });

export const useStates = () =>
  useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
    staleTime: 5 * 60_000,
  });

export const useVendorOptions = () =>
  useQuery({
    queryKey: ["vendor-options"],
    queryFn: fetchVendorOptions,
    staleTime: 60_000,
  });

export const useItemOptions = () =>
  useQuery({
    queryKey: ["item-options"],
    queryFn: fetchItemOptions,
    staleTime: 60_000,
  });

export const useOccasionOptions = () =>
  useQuery({
    queryKey: ["occasion-options"],
    queryFn: fetchOccasionOptions,
    staleTime: 60_000,
  });

// Items
export const useItemList = () =>
  useQuery({
    queryKey: ["item-list"],
    queryFn: fetchItemList,
    staleTime: 60_000,
  });

export const useItemById = (id, options = {}) =>
  useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateItem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["item-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateItem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["item-list"] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

// Occasions
export const useOccasionList = () =>
  useQuery({
    queryKey: ["occasion-list"],
    queryFn: fetchOccasionList,
    staleTime: 60_000,
  });

export const useOccasionById = (id, options = {}) =>
  useQuery({
    queryKey: ["occasion", id],
    queryFn: () => fetchOccasionById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateOccasion = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOccasion,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["occasion-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateOccasion = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOccasion,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["occasion-list"] });
      queryClient.invalidateQueries({ queryKey: ["occasion"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

// Vendors
export const useVendorList = () =>
  useQuery({
    queryKey: ["vendor-list"],
    queryFn: fetchVendorList,
    staleTime: 60_000,
  });

export const useVendorById = (id, options = {}) =>
  useQuery({
    queryKey: ["vendor", id],
    queryFn: () => fetchVendorById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateVendor = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVendor,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["vendor-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateVendor = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVendor,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["vendor-list"] });
      queryClient.invalidateQueries({ queryKey: ["vendor"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};
