import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { AddAnimalDead } from "@/components/ButtonComponents.jsx";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import AnimalStockFilter from "@/components/common/AnimalStockFilter.jsx";
import moment from "moment";
import { useAnimalDeadList } from "@/modules/AnimalStock";
import { HeartCrack, Calendar, Tag, ShieldAlert } from "lucide-react";

const AnimalDead = () => {
  const navigate = useNavigate();
  const {
    data: animalDeadData = [],
    isLoading,
    isError,
  } = useAnimalDeadList();

  const stats = useMemo(() => {
    const total = animalDeadData.length;
    const maleCount = animalDeadData.filter(
      (a) => (a.animal_type_gender || "").toLowerCase().startsWith("m")
    ).length;
    const femaleCount = animalDeadData.filter(
      (a) => (a.animal_type_gender || "").toLowerCase().startsWith("f")
    ).length;

    return { total, maleCount, femaleCount };
  }, [animalDeadData]);

  const columns = [
    {
      name: "animal_type",
      label: "Animal Breed / Category",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
            {value || "Animal"}
          </span>
        ),
      },
    },
    {
      name: "animal_type_no",
      label: "Govt Tag / UID",
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
      name: "animal_type_gender",
      label: "Gender",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const isMale = (value || "").toLowerCase().startsWith("m");
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isMale
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  : "bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
              }`}
            >
              {value || "Unknown"}
            </span>
          );
        },
      },
    },
    {
      name: "animal_dead_date",
      label: "Date of Incident / Relocation",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-xs font-medium tabular-nums">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{value && moment(value).isValid() ? moment(value).format("DD-MM-YYYY") : "-"}</span>
          </div>
        ),
      },
    },
    {
      name: "animal_dead_source",
      label: "Reason / Destination",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            {value || "Deceased / Relocated"}
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
    customToolbar: () => (
      <AddAnimalDead
        onClick={() => navigate("/add-animal-dead")}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      />
    ),
  };

  return (
    <Layout>
      <AnimalStockFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Recorded Departures
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.total} Records
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-800 flex items-center justify-center text-rose-500">
            <HeartCrack className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Male Cattle
            </span>
            <h4 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
              {stats.maleCount}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Female Cattle
            </span>
            <h4 className="text-2xl font-extrabold text-pink-600 dark:text-pink-400 mt-1 tabular-nums">
              {stats.femaleCount}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/50 border border-pink-100 dark:border-pink-800 flex items-center justify-center text-pink-600 dark:text-pink-400">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : isError ? (
        <div className="text-rose-500 text-center mt-4">Error loading departure records</div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Animal Mortality & Relocation Audit Log
                </span>
              </div>
            }
            data={animalDeadData}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default AnimalDead;
