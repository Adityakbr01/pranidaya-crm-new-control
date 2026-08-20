import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import DeliveryFilter from "@/components/DeliveryFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  AddPurchase,
  EditPurchase,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { usePurchaseList } from "@/modules/Stock";
import { ShoppingBag, IndianRupee, FileText, Calendar, Layers } from "lucide-react";
import { Tooltip } from "@mui/material";
import CountUp from "react-countup";

const PurchaseList = () => {
  const navigate = useNavigate();
  const { data: purchaseList = [], isLoading } = usePurchaseList();

  const stats = useMemo(() => {
    const totalInvoices = purchaseList.length;
    const totalSpend = purchaseList.reduce(
      (sum, p) => sum + (Number(p.purchase_total_bill) || 0),
      0
    );
    const totalItems = purchaseList.reduce(
      (sum, p) => sum + (Number(p.purchase_count) || 0),
      0
    );
    return { totalInvoices, totalSpend, totalItems };
  }, [purchaseList]);

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
      name: "purchase_date",
      label: "Purchase Date",
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
      name: "vendor_name",
      label: "Vendor / Supplier",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
            {value || "Unknown Vendor"}
          </span>
        ),
      },
    },
    {
      name: "purchase_bill_no",
      label: "Bill / Invoice No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "purchase_total_bill",
      label: "Total Amount",
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
      name: "purchase_count",
      label: "No of Items",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium tabular-nums">
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
            <Tooltip title="Edit Purchase Bill" arrow>
              <div>
                <EditPurchase
                  onClick={() => {
                    const encryptedId = encryptId(id);
                    navigate(`/edit-purchase/${encodeURIComponent(encryptedId)}`);
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
      <AddPurchase
        onClick={() => navigate("/add-purchase")}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      />
    ),
  };

  return (
    <Layout>
      <DeliveryFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Purchase Spend
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">₹</span>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tabular-nums">
                <CountUp end={stats.totalSpend} separator="," duration={1.2} />
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
              Total Invoices Logged
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.totalInvoices} Bills
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Units Procured
            </span>
            <h4 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
              {stats.totalItems} Items
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ShoppingBag className="w-5 h-5" />
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
                  Stock Procurement & Purchase Invoices
                </span>
              </div>
            }
            data={purchaseList || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default PurchaseList;
