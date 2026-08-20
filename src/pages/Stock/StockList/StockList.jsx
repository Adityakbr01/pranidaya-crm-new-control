import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import DeliveryFilter from "@/components/DeliveryFilter.jsx";
import MUIDataTable from "mui-datatables";
import { NumericFormat } from "react-number-format";
import { Spinner } from "@material-tailwind/react";
import { useItemStock } from "@/modules/Stock";
import { Package, AlertTriangle, CheckCircle2, TrendingUp, Boxes } from "lucide-react";
import CountUp from "react-countup";

const Stock = () => {
  const { data: stockList = [], isLoading } = useItemStock();

  const stats = useMemo(() => {
    let totalBal = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    stockList.forEach((item) => {
      const bal =
        (Number(item.openpurch) || 0) -
        (Number(item.closesale) || 0) +
        ((Number(item.purch) || 0) - (Number(item.sale) || 0));

      totalBal += bal;
      if (bal <= 0) {
        outOfStockCount++;
      } else if (bal < 10) {
        lowStockCount++;
      }
    });

    return {
      totalItems: stockList.length,
      totalBal,
      lowStockCount,
      outOfStockCount,
    };
  }, [stockList]);

  const columns = [
    {
      name: "SlNo",
      label: "S.No",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <span className="font-medium text-slate-500 dark:text-slate-400 tabular-nums">
            {tableMeta.rowIndex + 1}
          </span>
        ),
      },
    },
    {
      name: "item_name",
      label: "Provision / Item Name",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
              <Package className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value || "Item"}
            </span>
          </div>
        ),
      },
    },
    {
      name: "openpurch",
      label: "Opening Balance (Kgs)",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-medium text-slate-600 dark:text-slate-400 tabular-nums">
            <NumericFormat
              thousandSeparator
              thousandsGroupStyle="lakh"
              displayType="text"
              value={Number(value || 0)}
            />
          </span>
        ),
      },
    },
    {
      name: "purch",
      label: "Received (Kgs)",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
            +<NumericFormat
              thousandSeparator
              thousandsGroupStyle="lakh"
              displayType="text"
              value={Number(value || 0)}
            />
          </span>
        ),
      },
    },
    {
      name: "sale",
      label: "Consumed (Kgs)",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-semibold text-rose-500 tabular-nums">
            -<NumericFormat
              thousandSeparator
              thousandsGroupStyle="lakh"
              displayType="text"
              value={Number(value || 0)}
            />
          </span>
        ),
      },
    },
    {
      name: "close_balance",
      label: "Closing Balance (Kgs)",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_, tableMeta) => {
          const item = stockList[tableMeta.rowIndex];
          if (!item) return "";
          const closeBalance =
            (Number(item.openpurch) || 0) -
            (Number(item.closesale) || 0) +
            ((Number(item.purch) || 0) - (Number(item.sale) || 0));

          const isZero = closeBalance <= 0;
          const isLow = closeBalance < 10 && closeBalance > 0;

          return (
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                <NumericFormat
                  thousandSeparator
                  thousandsGroupStyle="lakh"
                  displayType="text"
                  value={closeBalance}
                />
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  isZero
                    ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800"
                    : isLow
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                    : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                }`}
              >
                {isZero ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
              </span>
            </div>
          );
        },
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
      <DeliveryFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Stock Balance
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tabular-nums">
                <CountUp end={stats.totalBal} separator="," duration={1.2} />
              </h4>
              <span className="text-xs font-bold text-slate-500">Kgs</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Inventory SKUs
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.totalItems} Items
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Low Stock Warnings
            </span>
            <h4 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
              {stats.lowStockCount}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Out of Stock
            </span>
            <h4 className="text-2xl font-extrabold text-rose-500 mt-1 tabular-nums">
              {stats.outOfStockCount}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-800 flex items-center justify-center text-rose-500">
            <AlertTriangle className="w-5 h-5" />
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
                  Current Month Stock Inventory ( In Kgs )
                </span>
              </div>
            }
            data={stockList || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default Stock;
