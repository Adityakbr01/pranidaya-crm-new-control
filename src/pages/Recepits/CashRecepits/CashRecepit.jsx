import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import RequestFilter from "@/components/RequestFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  EditDonationReceipt,
  ViewDonationReceipt,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useCashReceiptList } from "@/modules/Receipts";
import { IndianRupee, FileText, Calendar, ShieldCheck, Heart, User } from "lucide-react";
import { Tooltip } from "@mui/material";
import CountUp from "react-countup";

const RecepitCashRecepit = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useCashReceiptList();

  const stats = useMemo(() => {
    const totalReceipts = data.length;
    const totalAmount = data.reduce(
      (sum, r) => sum + (Number(r.c_receipt_total_amount) || 0),
      0
    );
    const count80G = data.filter(
      (r) => (r.c_receipt_exemption_type || "").includes("80G") && !(r.c_receipt_exemption_type || "").includes("Non")
    ).length;
    const countNon80G = totalReceipts - count80G;

    return { totalReceipts, totalAmount, count80G, countNon80G };
  }, [data]);

  const columns = [
    {
      name: "c_receipt_no",
      label: "Receipt No",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
            #{value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "donor_full_name",
      label: "Name",
      options: {
        filter: false,
        display: "exclude",
        viewColumns: false,
        searchable: true,
        sort: true,
      },
    },
    {
      name: "family_full_name",
      label: "Name",
      options: {
        filter: false,
        display: "exclude",
        viewColumns: false,
        searchable: true,
        sort: true,
      },
    },
    {
      name: "full_name",
      label: "Donor / Contributor",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const donorName = tableMeta.rowData[1];
          const familyName = tableMeta.rowData[2];
          const displayName =
            familyName && familyName.trim() !== "" ? familyName : donorName;

          return (
            <div className="flex items-center gap-2.5 py-1">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                {displayName || "Anonymous Donor"}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "c_receipt_date",
      label: "Date",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-xs font-medium tabular-nums">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{value ? moment(value).format("DD-MM-YYYY") : "-"}</span>
          </div>
        ),
      },
    },
    {
      name: "c_receipt_exemption_type",
      label: "Exemption Type",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: true,
        customBodyRender: (value) => {
          const is80G = (value || "").includes("80G") && !(value || "").includes("Non");
          return (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                is80G
                  ? "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{value || "Standard"}</span>
            </span>
          );
        },
      },
    },
    {
      name: "c_receipt_total_amount",
      label: "Amount",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            ₹{Number(value || 0).toLocaleString()}
          </span>
        ),
      },
    },
    {
      name: "c_receipt_count",
      label: "No of Items",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
        customBodyRender: (value) => (
          <span className="text-slate-600 dark:text-slate-400 tabular-nums font-medium">
            {value || 1}
          </span>
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-1.5">
              <Tooltip title="View Receipt PDF / Details" arrow>
                <div>
                  <ViewDonationReceipt
                    onClick={() => navigate(`/recepit-view/${id}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Edit Donation Receipt" arrow>
                <div>
                  <EditDonationReceipt
                    onClick={() => {
                      const encryptedId = encryptId(id);
                      navigate(`/recepit-edit/${encodeURIComponent(encryptedId)}`);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    filter: false,
    responsive: "standard",
    download: false,
    print: false,
  };

  return (
    <Layout>
      <RequestFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Cash Donations
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">₹</span>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tabular-nums">
                <CountUp end={stats.totalAmount} separator="," duration={1.2} />
              </h4>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Receipts Issued
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.totalReceipts} Receipts
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              80G Tax Exemption
            </span>
            <h4 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 tabular-nums">
              {stats.count80G} Receipts
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Donation Cash Receipts Register
                </span>
              </div>
            }
            data={data || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default RecepitCashRecepit;
