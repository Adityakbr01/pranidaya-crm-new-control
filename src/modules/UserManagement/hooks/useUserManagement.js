import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPageControls,
  updatePageControl,
  fetchButtonControls,
  updateButtonControl,
  createButtonControl,
} from "@/modules/UserManagement/api/userManagement";

export const usePageControls = () =>
  useQuery({
    queryKey: ["page-controls"],
    queryFn: fetchPageControls,
    staleTime: 60_000,
  });

export const useUpdatePageControl = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePageControl,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["page-controls"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useButtonControls = () =>
  useQuery({
    queryKey: ["button-controls"],
    queryFn: fetchButtonControls,
    staleTime: 60_000,
  });

export const useUpdateButtonControl = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateButtonControl,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["button-controls"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useCreateButtonControl = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createButtonControl,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["button-controls"] });
      queryClient.invalidateQueries({ queryKey: ["page-controls"] });
      options.onSuccess?.(...args);
    },
    ...options,
  });
};
