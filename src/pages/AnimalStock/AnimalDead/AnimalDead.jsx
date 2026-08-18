import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { AddAnimalDead } from "@/components/ButtonComponents.jsx";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import AnimalStockFilter from "@/components/common/AnimalStockFilter.jsx";
import moment from "moment";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { useAnimalDeadList } from "@/modules/AnimalStock";

const AnimalDead = () => {
  const navigate = useNavigate();
  const {
    data: animalDeadData = [],
    isLoading,
    isError,
  } = useAnimalDeadList();

  const columns = [
    {
      name: "animal_type",
      label: "Animal Type",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_type_no",
      label: "Govt Id",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_type_gender",
      label: "Gender",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_dead_date",
      label: "Dead Date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return value && moment(value).isValid()
            ? moment(value).format("DD-MM-YYYY")
            : "";
        },
      },
    },
    {
      name: "animal_dead_source",
      label: "Source",
      options: { filter: false, sort: false },
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
        className={inputClass}
      />
    ),
  };

  return (
    <Layout>
      <AnimalStockFilter />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center mt-4">Error loading data</div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  Animal Death /Given List
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
