import React, { useMemo } from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import CommonListing from "@/pages/DonorList/CommonListing.jsx";
import { Spinner } from "@material-tailwind/react";
import {
  AddDonor,
  AddMaterialReceipt,
  CashReceiptDonor,
  EditDonor,
  FamilyMemberDonor,
  MaterialReceiptDonor,
  ViewDonor,
} from "@/components/ButtonComponents.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useDonorList } from "@/modules/DonorList/hooks/useDonorList";
import { Users, Phone, Mail, User, ShieldCheck, Heart, UserPlus } from "lucide-react";
import { Tooltip } from "@mui/material";

const DonorList = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useDonorList();

  const stats = useMemo(() => {
    const totalDonors = data.length;
    const withMobile = data.filter(
      (d) => d.donor_mobile && d.donor_mobile.trim() !== ""
    ).length;
    const withEmail = data.filter(
      (d) => d.donor_email && d.donor_email.trim() !== ""
    ).length;

    return { totalDonors, withMobile, withEmail };
  }, [data]);

  const columns = [
    {
      name: "donor_fts_id",
      label: "PDS ID",
      options: {
        filter: false,
        print: true,
        download: true,
        display: "included",
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
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
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
      name: "donor_mobile",
      label: "Phone Contact",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          value ? (
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-xs font-medium tabular-nums">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{value}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
          ),
      },
    },
    {
      name: "donor_email",
      label: "Email Address",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          value ? (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[180px]">{value}</span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
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
          const encryptedId = encryptId(id);
          const encoded = encodeURIComponent(encryptedId);

          return (
            <div className="flex items-center space-x-1">
              <Tooltip title="View Donor Profile" arrow>
                <div>
                  <ViewDonor
                    onClick={() => navigate(`/viewdonor-list/${encoded}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Edit Donor Information" arrow>
                <div>
                  <EditDonor
                    onClick={() => navigate(`/edit-donor/${encoded}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Issue Cash Receipt" arrow>
                <div>
                  <CashReceiptDonor
                    onClick={() => navigate(`/createrecepit-donor/${encoded}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Issue Material Receipt" arrow>
                <div>
                  <MaterialReceiptDonor
                    onClick={() => navigate(`/create-donor/${encoded}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Add Family Member" arrow>
                <div>
                  <FamilyMemberDonor
                    onClick={() => navigate(`/create-family/${encoded}`)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    filter: false,
    customToolbar: () => (
      <div className="flex items-center gap-2">
        <AddMaterialReceipt
          onClick={() => navigate("/materialrecepitall")}
          className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        />
        <AddDonor
          onClick={() => navigate("/add-donor")}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        />
      </div>
    ),
  };

  return (
    <Layout>
      <CommonListing />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Registered Donors
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.totalDonors}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Phone Verified
            </span>
            <h4 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
              {stats.withMobile}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Phone className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Contacts
            </span>
            <h4 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
              {stats.withEmail}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Mail className="w-5 h-5" />
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
                  Donor Master & Membership Directory
                </span>
              </div>
            }
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default DonorList;
