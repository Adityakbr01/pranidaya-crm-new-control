import { useQuery } from "@tanstack/react-query";
import { fetchWebDonationList } from "@/modules/WebDonation/api/webDonation";

export const useWebDonationList = () =>
  useQuery({
    queryKey: ["web-donation-list"],
    queryFn: fetchWebDonationList,
    staleTime: 60_000,
  });

export const useWebsiteDonationList = useWebDonationList;
