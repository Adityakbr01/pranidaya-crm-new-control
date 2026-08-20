import React, { useState } from "react";
import Layout from "@/layout/Layout.jsx";
import TaskManagerFilter from "@/components/TaskManagerFilter.jsx";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { FileBarChart, Calendar, ArrowRight, Info } from "lucide-react";

const DonationSummary = () => {
  const navigate = useNavigate();
  const [downloadDonation, setDonationDownload] = useState({
    receipt_from_date: "",
    receipt_to_date: "",
  });

  const onInputChange = (e) => {
    setDonationDownload({
      ...downloadDonation,
      [e.target.name]: e.target.value,
    });
  };

  const onReportView = (e) => {
    e.preventDefault();
    const form = document.getElementById("dowRecp");
    if (form && form.checkValidity()) {
      localStorage.setItem("receipt_from_date", downloadDonation.receipt_from_date);
      localStorage.setItem("receipt_to_date", downloadDonation.receipt_to_date);
      navigate("/d-summary-view");
    } else if (form) {
      form.reportValidity();
    }
  };

  return (
    <Layout>
      <TaskManagerFilter />

      <div className="p-6 mt-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <FileBarChart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Donation Summary & Financial Statement
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select date ranges to generate comprehensive revenue breakdown and 80G tax reports
            </p>
          </div>
        </div>

        <div className="p-3.5 mb-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Specify both From Date and To Date to pull the full audited donation register.</span>
        </div>

        <form id="dowRecp" autoComplete="off" onSubmit={onReportView}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                required
                name="receipt_from_date"
                value={downloadDonation.receipt_from_date}
                onChange={onInputChange}
              />
            </div>

            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                required
                name="receipt_to_date"
                value={downloadDonation.receipt_to_date}
                onChange={onInputChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
              >
                <span>Generate Summary Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DonationSummary;
