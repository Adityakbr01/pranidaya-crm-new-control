import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import RequestFilter from "@/components/RequestFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  EditMaterialReceipt,
  ViewMaterialReceipt,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useMaterialReceiptList } from "@/modules/Receipts";
import { Boxes, IndianRupee, FileText, Calendar, User, Package } from "lucide-react";
import { Tooltip } from "@mui/material";
import CountUp from "react-countup";

const MaterialReceipts = () => {
  const navigate = useNavigate();
  const { data: materialdata = [], isLoading } = useMaterialReceiptList();

  const stats = useMemo(() => {
    const totalReceipts = materialdata.length;
    const totalValue = materialdata.reduce(
      (sum, m) => sum + (Number(m.m_receipt_total_amount) || 0),
      0
    );
    const totalItems = materialdata.reduce(
      (sum, m) => sum + (Number(m.m_receipt_count) || 0),
      0
    );

    return { totalReceipts, totalValue, totalItems };
  }, [materialdata]);

  const columns = [
    {
      name: "m_receipt_no",
      label: "Receipt No",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-800">
            #{value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "m_receipt_date",
      label: "Receipt Date",
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
      name: "donor_full_name",
      label: "Donor / Contributor",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value || "Anonymous Contributor"}
            </span>
          </div>
        ),
      },
    },
    {
      name: "m_receipt_total_amount",
      label: "Approx. Value",
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
    {
      name: "m_receipt_count",
      label: "Dispatched Items",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium tabular-nums">
            {value || 1} Items
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
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-1.5">
              <Tooltip title="View Material Receipt" arrow>
                <div>
                  <ViewMaterialReceipt
                    onClick={() => navigate(`/material-view/${id}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Edit Material Receipt" arrow>
                <div>
                  <EditMaterialReceipt
                    onClick={() => {
                      const encryptedId = encryptId(id);
                      navigate(`/material-edit/${encodeURIComponent(encryptedId)}`);
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
    viewColumns: true,
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
              Approx Material Value
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">₹</span>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tabular-nums">
                <CountUp end={stats.totalValue} separator="," duration={1.2} />
              </h4>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Inward Receipts
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
              Total Provision Units
            </span>
            <h4 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
              {stats.totalItems} Items
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Package className="w-5 h-5" />
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
                  Material & In-Kind Donations Register
                </span>
              </div>
            }
            data={materialdata || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default MaterialReceipts;
