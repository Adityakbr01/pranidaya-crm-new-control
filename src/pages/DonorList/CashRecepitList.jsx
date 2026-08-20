import React from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import moment from "moment";
import { useCashReceiptList } from "@/modules/Receipts";
import { ArrowLeft, IndianRupee, FileText, Calendar, User, ShieldCheck } from "lucide-react";

const CashRecepitList = () => {
  const navigate = useNavigate();
  const { data: rawData = [], isLoading } = useCashReceiptList();

  const cashListData = Array.isArray(rawData)
    ? rawData.map((item, index) => [
        index + 1,
        item.c_receipt_no || (item.donor ? item.donor + (item.donor_full_name || "") : ""),
        item.donor_full_name || item.c_donor_name || "",
        item.receipt_date ? moment(item.receipt_date).format("DD-MM-YYYY") : "-",
        item.receipt_exemption_type || item.c_receipt_exemption_type || "Standard",
        item.receipt_donation_type || "General",
        item.receipt_total_amount || item.c_receipt_total_amount || 0,
        item.id,
      ])
    : [];

  const columns = [
    {
      name: "SlNo",
      label: "S.No",
      options: {
        filter: false,
        print: true,
        download: true,
        customBodyRender: (value) => (
          <span className="font-medium text-slate-500 dark:text-slate-400 tabular-nums">
            {value}
          </span>
        ),
      },
    },
    {
      name: "Receipt No",
      options: {
        filter: true,
        print: true,
        download: true,
        display: "included",
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
            #{value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "Name",
      label: "Donor Name",
      options: {
        customBodyRender: (value) => (
          <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
            {value || "Anonymous Donor"}
          </span>
        ),
      },
    },
    {
      name: "Date",
      options: {
        customBodyRender: (value) => (
          <span className="text-slate-600 dark:text-slate-400 tabular-nums text-xs font-medium">
            {value}
          </span>
        ),
      },
    },
    {
      name: "Exemption Type",
      options: {
        customBodyRender: (value) => (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <ShieldCheck className="w-3 h-3" />
            <span>{value}</span>
          </span>
        ),
      },
    },
    {
      name: "Donation Type",
      options: {
        customBodyRender: (value) => (
          <span className="text-slate-700 dark:text-slate-300 text-xs font-medium">
            {value}
          </span>
        ),
      },
    },
    {
      name: "Amount",
      options: {
        customBodyRender: (value) => (
          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            ₹{Number(value || 0).toLocaleString()}
          </span>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
  };

  return (
    <Layout>
      <div className="flex items-center gap-3 py-3 mb-4">
        <button
          type="button"
          onClick={() => navigate("/donor-list")}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          title="Back to Donors List"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Donor Cash Receipts Register
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Historical donation audit trail and transaction logs
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
          <MUIDataTable
            data={cashListData}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default CashRecepitList;
