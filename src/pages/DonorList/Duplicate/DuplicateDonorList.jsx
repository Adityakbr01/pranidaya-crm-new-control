import React, { useEffect, useState, useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import CommonListing from "@/pages/DonorList/CommonListing.jsx";
import { toast } from "react-toastify";
import {
  DeleteDuplicateDonor,
  EditDuplicateDonor,
  NoDuplicateDonor,
  ZeroDuplicateDonor,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { fetchDonorsDuplicate, updateDonorsDuplicateById } from "@/modules/DonorList/api/donor";
import { AlertTriangle, UserCheck, Trash2, Phone, Mail, User, ShieldAlert } from "lucide-react";
import { Tooltip } from "@mui/material";

const DuplicateDonorList = () => {
  const [duplicate, setDuplicate] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPendingRData = async () => {
    try {
      setLoading(true);
      const res = await fetchDonorsDuplicate();
      setDuplicate(res || []);
    } catch (error) {
      console.error("Error fetching pending list request data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRData();
  }, []);

  const stats = useMemo(() => {
    const total = duplicate.length;
    const withReceipts = duplicate.filter((d) => (Number(d.c_receipt_count) || 0) > 0).length;
    const zeroReceipts = total - withReceipts;
    return { total, withReceipts, zeroReceipts };
  }, [duplicate]);

  const updateData = async (id) => {
    try {
      await updateDonorsDuplicateById(id);
      toast.success("Duplicate Record Resolved");
      setDuplicate((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, c_receipt_count: 0 } : item
        )
      );
      fetchPendingRData();
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating duplicate record");
    }
  };

  const columns = [
    {
      name: "donor_fts_id",
      label: "PDS ID",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "donor_full_name",
      label: "Donor Name",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value || "Unknown Donor"}
            </span>
          </div>
        ),
      },
    },
    {
      name: "donor_type",
      label: "Donor Type",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {value || "Individual"}
          </span>
        ),
      },
    },
    {
      name: "donor_spouse_name",
      label: "Spouse / Contact Person",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const type = tableMeta.rowData[2];
          const contact =
            type === "Individual"
              ? value
              : duplicate[tableMeta.rowIndex]?.donor_contact_name;
          return <span className="text-slate-600 dark:text-slate-400 text-xs">{contact || "-"}</span>;
        },
      },
    },
    {
      name: "donor_mobile",
      label: "Mobile Contact",
      options: {
        sort: true,
        customBodyRender: (value) =>
          value ? (
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 text-xs font-medium tabular-nums">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{value}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
          ),
      },
    },
    {
      name: "c_receipt_count",
      label: "Active Receipts",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          const count = Number(value) || 0;
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border tabular-nums ${
                count > 0
                  ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
            >
              {count} Receipts
            </span>
          );
        },
      },
    },
    {
      name: "actions",
      label: "Merge / Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_, tableMeta) => {
          const item = duplicate[tableMeta.rowIndex];
          if (!item) return null;
          const id = item.id;
          const receiptCount = Number(item.c_receipt_count) || 0;
          const encryptedId = encryptId(id);
          const encoded = encodeURIComponent(encryptedId);

          return (
            <div className="flex items-center space-x-1.5">
              {receiptCount !== 0 ? (
                <>
                  <Tooltip title="Edit Duplicate Details" arrow>
                    <div>
                      <EditDuplicateDonor
                        className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        onClick={() => navigate(`/edit-duplicate/${encoded}`)}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Mark as Unique (Not Duplicate)" arrow>
                    <div>
                      <NoDuplicateDonor
                        className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        onClick={() => navigate(`/no-duplicate/${encoded}`)}
                      />
                    </div>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Delete Zero-Receipt Duplicate" arrow>
                    <div>
                      <DeleteDuplicateDonor
                        className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        onClick={() => updateData(id)}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Zero Receipt Deduplication" arrow>
                    <div>
                      <ZeroDuplicateDonor
                        className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        onClick={() => navigate(`/zero-duplicate/${encoded}`)}
                      />
                    </div>
                  </Tooltip>
                </>
              )}
            </div>
          );
        },
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
    filter: false,
  };

  return (
    <Layout>
      <CommonListing />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Duplicate Flags
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.total}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Has Linked Receipts
            </span>
            <h4 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
              {stats.withReceipts}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Zero Receipt (Safe to Purge)
            </span>
            <h4 className="text-2xl font-extrabold text-rose-500 mt-1 tabular-nums">
              {stats.zeroReceipts}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-800 flex items-center justify-center text-rose-500">
            <Trash2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Duplicate Donor Reconciliation Queue
                </span>
              </div>
            }
            data={duplicate}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default DuplicateDonorList;
