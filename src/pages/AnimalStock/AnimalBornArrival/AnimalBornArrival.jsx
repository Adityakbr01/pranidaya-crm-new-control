import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { AddBornorArrival } from "@/components/ButtonComponents.jsx";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import AnimalStockFilter from "@/components/common/AnimalStockFilter.jsx";
import moment from "moment";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { useAnimalBornArrivalList } from "@/modules/AnimalStock";

const AnimalBornArrival = () => {
  const navigate = useNavigate();
  const {
    data: animalBornArrivalList = [],
    isLoading,
    isError,
  } = useAnimalBornArrivalList();

  const columns = [
    {
      name: "animal_type",
      label: "Animal Type",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_type_date",
      label: "Date",
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
      name: "animal_type_source",
      label: "Type Source",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_type_mother_no",
      label: "Mother Govt Id",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_type_father_no",
      label: "Father Govt Id",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_type_status",
      label: "Status",
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
      <AddBornorArrival
        onClick={() => navigate("/add-born-arrival")}
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
                  Animal Born or Arrival List
                </span>
              </div>
            }
            data={animalBornArrivalList}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default AnimalBornArrival;
