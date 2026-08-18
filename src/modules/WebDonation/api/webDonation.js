import api from "@/lib/axios";

export const fetchWebDonationList = async () => {
  const response = await api.get("/fetch-website-donation-list");
  return response?.data?.website_donation ?? [];
};
export const fetchWebsiteDonationList = fetchWebDonationList;
