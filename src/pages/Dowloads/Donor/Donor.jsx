import React, { useState } from "react";
import Layout from "@/layout/Layout.jsx";
import Dropdown from "@/components/common/DropDown.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadCommon from "@/pages/download/DeliveryDownload.jsx";
import { downloadDonorList } from "@/modules/Downloads";
import { Download, FileSpreadsheet, Info, CheckCircle2 } from "lucide-react";

function Donor() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const DonorType = [
    { value: "Individual", label: "Individual" },
    { value: "Private", label: "Private" },
    { value: "Public", label: "Public" },
    { value: "PSU", label: "PSU" },
    { value: "Trust", label: "Trust" },
    { value: "Society", label: "Society" },
    { value: "Others", label: "Others" },
  ];

  const [downloadDonor, setDonorDownload] = useState({
    donor_type: "",
    donor_gender: "",
  });

  const onInputChange = (name, value) => {
    setDonorDownload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      donor_type: downloadDonor.donor_type,
      donor_gender: downloadDonor.donor_gender,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    if (v) {
      setIsButtonDisabled(true);

      try {
        const blob = await downloadDonorList(data);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "donor_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Donor dataset downloaded successfully");
      } catch (err) {
        toast.error("Failed to export donor dataset");
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <ToastContainer />

      <div className="p-6 mt-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Export Donor Records
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generate and download customized CSV exports of registered donor profiles
            </p>
          </div>
        </div>

        <div className="p-3.5 mb-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Filters are optional. Leave fields blank if you wish to download all registered donor records.</span>
        </div>

        <form id="dowRecp" autoComplete="off" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div className="w-full">
              <Dropdown
                label="Donor Category / Type"
                options={DonorType}
                value={downloadDonor.donor_type}
                onChange={(value) => onInputChange("donor_type", value)}
                name="donor_type"
              />
            </div>

            {downloadDonor.donor_type === "Individual" && (
              <div className="w-full">
                <Dropdown
                  label="Gender Filter"
                  value={downloadDonor.donor_gender}
                  options={gender}
                  name="donor_gender"
                  onChange={(value) => onInputChange("donor_gender", value)}
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isButtonDisabled}
              >
                <Download className="w-4 h-4" />
                <span>{isButtonDisabled ? "Generating Export..." : "Download CSV Report"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Donor;
