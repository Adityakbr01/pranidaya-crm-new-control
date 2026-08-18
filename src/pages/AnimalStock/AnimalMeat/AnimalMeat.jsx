import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { AddAnimalMeet, EditAnimalMeet } from "@/components/ButtonComponents.jsx";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import AnimalStockFilter from "@/components/common/AnimalStockFilter.jsx";
import moment from "moment";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useAnimalMeatList } from "@/modules/AnimalStock";

const AnimalMeat = () => {
  const navigate = useNavigate();
  const {
    data: animalMeetList = [],
    isLoading,
    isError,
  } = useAnimalMeatList();

  const columns = [
    {
      name: "animal_male_no",
      label: "Male Govt Id",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_female_no",
      label: "Female Govt Id",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_meet_date",
      label: "Meet Date",
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
      name: "animal_baby_no",
      label: "Baby Govt Id",
      options: { filter: false, sort: false },
    },
    {
      name: "animal_baby_date",
      label: "Baby Date",
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
      name: "animal_meet_status",
      label: "Status",
      options: { filter: false, sort: false },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => (
          <div className="flex items-center space-x-2">
            <EditAnimalMeet
              onClick={() => {
                const encryptedId = encryptId(id);
                navigate(`/edit-animal-meet/${encodeURIComponent(encryptedId)}`);
              }}
              className="h-5 w-5 cursor-pointer text-blue-500"
            />
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
                <span className="text-lg font-semibold">Animal Meet List</span>
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
