import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import DeliveryFilter from "@/components/DeliveryFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  AddConsumption,
  EditConsumption,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useConsumptionList } from "@/modules/Stock";
import { Flame, Calendar, Layers, CheckCircle2 } from "lucide-react";
import { Tooltip } from "@mui/material";

const Consumption = () => {
  const navigate = useNavigate();
  const { data: consumptionList = [], isLoading } = useConsumptionList();

  const stats = useMemo(() => {
    const totalEntries = consumptionList.length;
    const totalUnits = consumptionList.reduce(
      (sum, c) => sum + (Number(c.cons_count) || 0),
      0
    );
    return { totalEntries, totalUnits };
  }, [consumptionList]);

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
      name: "cons_date",
      label: "Consumption Date",
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
      name: "cons_count",
      label: "Dispatched Items Count",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {value || 0} Units
          </span>
        ),
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
            <Tooltip title="Edit Consumption Record" arrow>
              <div>
                <EditConsumption
                  onClick={() => {
                    const encryptedId = encryptId(id);
                    navigate(`/edit-consumption/${encodeURIComponent(encryptedId)}`);
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
      <AddConsumption
        onClick={() => navigate("/add-consumption")}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      />
    ),
  };

  return (
    <Layout>
      <DeliveryFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Consumption Logs
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.totalEntries} Entries
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Provisions Dispatched
            </span>
            <h4 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
              {stats.totalUnits} Units
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
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
                  Provisions & Feed Consumption Register
                </span>
              </div>
            }
            data={consumptionList || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default Consumption;
