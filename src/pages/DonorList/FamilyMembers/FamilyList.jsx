import React, { useEffect } from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { AddFamilyMember } from "@/components/ButtonComponents.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useFamilyMembersById } from "@/modules/DonorList/hooks/useDonorList";
import { Spinner } from "@material-tailwind/react";
import { ArrowLeft, Users, User, Heart } from "lucide-react";

const FamilyList = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (decryptedId) {
      localStorage.setItem("donor_fts_id", decryptedId);
    }
  }, [decryptedId]);

  const { data: familyList = [], isLoading } = useFamilyMembersById(decryptedId);

  const columns = [
    {
      name: "family_full_name",
      label: "Family Member Name",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-2.5 py-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {value || "Family Member"}
            </span>
          </div>
        ),
      },
    },
    {
      name: "family_relation",
      label: "Relationship",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Heart className="w-3 h-3" />
            <span>{value || "Relative"}</span>
          </span>
        ),
      },
    },
    {
      name: "family_status",
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
              <span>{value || "Active"}</span>
            </span>
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
    customToolbar: () => (
      <AddFamilyMember
        onClick={() => navigate("/add-family")}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      />
    ),
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
            Donor Family Tree & Dependents
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Registered family members and linked contributor profiles
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
            title={
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Family Members List ({familyList.length})
                </span>
              </div>
            }
            data={familyList}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default FamilyList;
