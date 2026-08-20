import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { AddAnimalMeet, EditAnimalMeet } from "@/components/ButtonComponents.jsx";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import AnimalStockFilter from "@/components/common/AnimalStockFilter.jsx";
import moment from "moment";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useAnimalMeatList } from "@/modules/AnimalStock";
import { Heart, Calendar, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import { Tooltip } from "@mui/material";

const AnimalMeat = () => {
  const navigate = useNavigate();
  const {
    data: animalMeetList = [],
    isLoading,
    isError,
  } = useAnimalMeatList();

  const stats = useMemo(() => {
    const total = animalMeetList.length;
    const withOffspring = animalMeetList.filter(
      (a) => a.animal_baby_no && a.animal_baby_no.trim() !== ""
    ).length;

    return { total, withOffspring };
  }, [animalMeetList]);

  const columns = [
    {
      name: "animal_male_no",
      label: "Sire (Male UID)",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
            {value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "animal_female_no",
      label: "Dam (Female UID)",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <span className="font-mono text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-2 py-0.5 rounded border border-pink-200 dark:border-pink-800">
            {value || "N/A"}
          </span>
        ),
      },
    },
    {
      name: "animal_meet_date",
      label: "Mating Date",
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
      name: "animal_baby_no",
      label: "Offspring UID",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          value ? (
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              {value}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-xs italic">Pending</span>
          ),
      },
    },
    {
      name: "animal_baby_date",
      label: "Birth Date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          value && moment(value).isValid() ? (
            <span className="text-slate-700 dark:text-slate-300 text-xs font-medium tabular-nums">
              {moment(value).format("DD-MM-YYYY")}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
          ),
      },
    },
    {
      name: "animal_meet_status",
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
              <span>{value || "Recorded"}</span>
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
            <Tooltip title="Edit Mating & Birth Record" arrow>
              <div>
                <EditAnimalMeet
                  onClick={() => {
                    const encryptedId = encryptId(id);
                    navigate(`/edit-animal-meet/${encodeURIComponent(encryptedId)}`);
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
      <AddAnimalMeet
        onClick={() => navigate("/add-animal-meet")}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs cursor-pointer"
      />
    ),
  };

  return (
    <Layout>
      <AnimalStockFilter />

      {/* KPI Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Mating Logs
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">
              {stats.total} Records
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Heart className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Offspring Delivered
            </span>
            <h4 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
              {stats.withOffspring} Calves
            </h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : isError ? (
        <div className="text-rose-500 text-center mt-4">Error loading mating logs</div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Breeding, Mating & Offspring Registry
                </span>
              </div>
            }
            data={animalMeetList}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default AnimalMeat;
