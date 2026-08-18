import { useQuery } from "@tanstack/react-query";
import { fetchDonationSummary, fetchStockSummaryReport } from "@/modules/Reports/api/reports";

export const useDonationSummary = (payload, options = {}) =>
  useQuery({
    queryKey: ["donation-summary", payload],
    queryFn: () => fetchDonationSummary(payload),
    enabled: Boolean(payload),
    ...options,
  });

export const useStockSummaryReport = (payload, options = {}) =>
  useQuery({
    queryKey: ["stock-summary-report", payload],
    queryFn: () => fetchStockSummaryReport(payload),
    enabled: Boolean(payload),
    ...options,
  });
