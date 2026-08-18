import React from "react";
import Layout from "@/layout/Layout.jsx";
import DeliveryFilter from "@/components/DeliveryFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  AddConsumption,
  EditConsumption,
} from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useConsumptionList } from "@/modules/Stock";

const Consumption = () => {
  const navigate = useNavigate();
  const { data: consumptionList = [], isLoading } = useConsumptionList();

  const columns = [
    {
      name: "sno",
      label: "S.No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "cons_date",
      label: " Date ",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
      },
    },
    {
      name: "cons_count",
      label: " No of Item ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => (
          <div className="flex items-center space-x-2">
            <EditConsumption
              onClick={() => {
                const encryptedId = encryptId(id);
                navigate(
                  `/edit-consumption/${encodeURIComponent(encryptedId)}`
                );
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
      <AddConsumption
        onClick={() => navigate("/add-consumption")}
        className={inputClass}
      />
    ),
  };

  return (
    <Layout>
      <DeliveryFilter />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Consumption List</span>
              </div>
            }
            data={consumptionList || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default Consumption;
