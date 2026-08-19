import { Typography } from "@material-tailwind/react";
import { BaseUrl } from "@/base/BaseUrl.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function Footer() {
  const brandName = "AG Solutions";
  const brandLink = "https://www.ag-solutions.in";

  const fetchYearData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BaseUrl}/fetch-year`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.year.current_year;
  };

  const { data } = useQuery({
    queryKey: ["fetchYear"],
    queryFn: fetchYearData,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <footer className="py-3">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2">
        <Typography variant="small" className="font-normal text-slate-600 dark:text-slate-400 text-xs">
          Copyright@ {data} by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold dark:text-slate-200"
          >
            {brandName}
          </a>{" "}
          . All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
