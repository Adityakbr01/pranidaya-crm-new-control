import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkStatus,
  fetchDates,
  fetchPagePermission,
  fetchPermissions,
  login,
  sendPasswordReset,
} from "@/modules/Auth/api";

export const useLogin = (options = {}) =>
  useMutation({
    mutationFn: ({ username, password }) => login({ username, password }),
    ...options,
  });

export const useSendPasswordReset = (options = {}) =>
  useMutation({
    mutationFn: ({ username, email }) => sendPasswordReset({ username, email }),
    ...options,
  });

export const usePanelStatus = () =>
  useQuery({
    queryKey: ["auth", "panel-status"],
    queryFn: checkStatus,
    staleTime: 60_000,
    refetchInterval: 300_000,
    retry: false,
  });

export const useUserPermissions = () =>
  useQuery({
    queryKey: ["auth", "permissions"],
    queryFn: fetchPermissions,
    enabled: Boolean(localStorage.getItem("token")),
    staleTime: 60_000,
    retry: false,
  });

export const usePagePermissions = () =>
  useQuery({
    queryKey: ["auth", "page-permissions"],
    queryFn: fetchPagePermission,
    enabled: Boolean(localStorage.getItem("token")),
    staleTime: 60_000,
    retry: false,
  });

export const useAuthDates = () =>
  useQuery({
    queryKey: ["auth", "dates"],
    queryFn: fetchDates,
    enabled: Boolean(localStorage.getItem("token")),
    staleTime: 60_000,
    retry: false,
  });