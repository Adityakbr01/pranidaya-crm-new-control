import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EnquiryFilter from "@/components/EnquiryFilter.jsx";
import { Spinner } from "@material-tailwind/react";
import {
  AddOccassionItem,
  EditOccassionItem,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useOccasionList } from "@/modules/Master";
import { CalendarDays, CheckCircle2, AlertCircle } from "lucide-react";
import { Tooltip } from "@mui/material";

const ListOccasion = () => {
  const navigate = useNavigate();
  const { data: openListData = [], isLoading } = useOccasionList();

  const stats = useMemo(() => {
    const total = openListData.length;
    const active = openListData.filter(
      (item) => (item.occasion_status || "").toLowerCase() === "active"
    ).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [openListData]);

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
      name: "occasion_name",
      label: "Occasion / Event Name",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <CalendarDays className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value || "Unnamed Occasion"}
            </span>
          </div>
        ),
      },
    },
    {
      name: "occasion_status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const isActive = (value || "").toLowerCase() === "active";
          return (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                }`}
              />
              <span>{value || "Unknown"}</span>
            </span>
          );
        },
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => (
          <div className="flex items-center space-x-2">
            <Tooltip title="Edit Occasion Details" arrow>
              <div>
                <EditOccassionItem
                  onClick={() => {
                    const encryptedId = encryptId(id);
                    navigate(`/edit-occasion/${encodeURIComponent(encryptedId)}`);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                />
              </div>
            </Tooltip>
          </div>
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
    customToolbar: () => (
      <AddOccassionItem
        onClick={() => navigate("/add-occasion")}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      />
    ),
  };

  return (
    <Layout>
      <EnquiryFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Occasions
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.total}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <CalendarDays className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Events
            </span>
            <h4 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
              {stats.active}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Inactive
            </span>
            <h4 className="text-2xl font-extrabold text-slate-600 dark:text-slate-300 mt-1 tabular-nums">
              {stats.inactive}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500">
            <AlertCircle className="w-5 h-5" />
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
                  Occasion Master & Event Directory
                </span>
              </div>
            }
            data={openListData}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default ListOccasion;
