import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import { useWebsiteDonationList } from "@/modules/WebDonation";
import { Globe, IndianRupee, CreditCard, Calendar, User, Phone, ShieldCheck } from "lucide-react";
import CountUp from "react-countup";

const WebDonation = () => {
  const { data: webdonation = [], isLoading } = useWebsiteDonationList();

  const stats = useMemo(() => {
    const totalTransactions = webdonation.length;
    const totalAmount = webdonation.reduce(
      (sum, w) => sum + (Number(w.payment_amount) || 0),
      0
    );
    const count80G = webdonation.filter(
      (w) => (w.payment_exemption_type || "").includes("80G") && !(w.payment_exemption_type || "").includes("Non")
    ).length;

    return { totalTransactions, totalAmount, count80G };
  }, [webdonation]);

  const columns = [
    {
      name: "sno",
      label: "S.No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <span className="font-medium text-slate-500 dark:text-slate-400 tabular-nums">
            {tableMeta.rowIndex + 1}
          </span>
        ),
      },
    },
    {
      name: "payment_user",
      label: "Online Contributor",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value || "Online Donor"}
            </span>
          </div>
        ),
      },
    },
    {
      name: "payment_mobile",
      label: "Mobile Contact",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          value ? (
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-xs font-medium tabular-nums">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{value}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
          ),
      },
    },
    {
      name: "payment_date",
      label: "Payment Date",
      options: {
        filter: false,
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
      name: "payment_exemption_type",
      label: "Exemption",
      options: {
        filter: false,
        sort: false,
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
              <ShieldCheck className="w-3 h-3" />
              <span>{value || "Standard"}</span>
            </span>
          );
        },
      },
    },
    {
      name: "payment_donation_type",
      label: "Donation Purpose",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {value || "General"}
          </span>
        ),
      },
    },
    {
      name: "payment_amount",
      label: "Donation Amount",
      options: {
        filter: false,
        sort: true,
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
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    filter: false,
  };

  return (
    <Layout>
      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-2">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Gateway Collections
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
              Online Payments Logged
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.totalTransactions} Donations
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              80G Exemption Online
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
                  Website Online Payment Gateway Register
                </span>
              </div>
            }
            data={webdonation}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default WebDonation;
