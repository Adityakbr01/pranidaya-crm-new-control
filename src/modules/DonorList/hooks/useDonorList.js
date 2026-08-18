import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDonorList,
  createDonor,
  fetchDonorById,
  fetchStates,
  updateDonor,
  fetchDonorReceiptsById,
  fetchDonorViewById,
  fetchFamilyMemberById,
  createFamilyMember,
  fetchDonorDuplicateList,
  fetchDonorDuplicateById,
  updateDonorDuplicate,
  convertDonorDuplicate,
  fetchCashReceiptsAllById,
  fetchMaterialReceiptsAllById,
} from "@/modules/DonorList/api/donor";

export const useDonorList = () =>
  useQuery({
    queryKey: ["donor-list"],
    queryFn: fetchDonorList,
    staleTime: 60_000,
  });

export const useDonorById = (id, options = {}) =>
  useQuery({
    queryKey: ["donor", id],
    queryFn: () => fetchDonorById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useStates = () =>
  useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
    staleTime: 5 * 60_000,
  });

export const useDonorViewById = (id, options = {}) =>
  useQuery({
    queryKey: ["donor-view", id],
    queryFn: () => fetchDonorViewById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useDonorReceiptsById = (id, options = {}) =>
  useQuery({
    queryKey: ["donor-receipts", id],
    queryFn: () => fetchDonorReceiptsById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useFamilyMembersById = (id, options = {}) =>
  useQuery({
    queryKey: ["family-members", id],
    queryFn: () => fetchFamilyMemberById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useDonorDuplicateList = () =>
  useQuery({
    queryKey: ["donor-duplicate-list"],
    queryFn: fetchDonorDuplicateList,
    staleTime: 60_000,
  });

export const useDonorDuplicateById = (id, options = {}) =>
  useQuery({
    queryKey: ["donor-duplicate", id],
    queryFn: () => fetchDonorDuplicateById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCashReceiptsAllById = (id, options = {}) =>
  useQuery({
    queryKey: ["cash-receipts-all", id],
    queryFn: () => fetchCashReceiptsAllById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useMaterialReceiptsAllById = (id, options = {}) =>
  useQuery({
    queryKey: ["material-receipts-all", id],
    queryFn: () => fetchMaterialReceiptsAllById(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateDonor = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDonor,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["donor-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateDonor = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDonor,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["donor-list"] });
      queryClient.invalidateQueries({ queryKey: ["donor"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useCreateFamilyMember = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFamilyMember,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["family-members"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateDonorDuplicate = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDonorDuplicate,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["donor-duplicate-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useConvertDonorDuplicate = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: convertDonorDuplicate,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["donor-duplicate-list"] });
      queryClient.invalidateQueries({ queryKey: ["donor-list"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};
