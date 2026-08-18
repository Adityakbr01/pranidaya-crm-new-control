import React from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EnquiryFilter from "@/components/EnquiryFilter.jsx";
import { Spinner } from "@material-tailwind/react";
import {
  AddOccassionItem,
  EditOccassionItem,
} from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useOccasionList } from "@/modules/Master";

const ListOccasion = () => {
  const navigate = useNavigate();
  const { data: openListData = [], isLoading } = useOccasionList();

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
      name: "occasion_name",
      label: "Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "occasion_status",
      label: "Status",
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
            <EditOccassionItem
              onClick={() => {
                const encryptedId = encryptId(id);
                navigate(`/edit-occasion/${encodeURIComponent(encryptedId)}`);
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
      <AddOccassionItem
        onClick={() => navigate("/add-occasion")}
        className={inputClass}
      />
    ),
  };

  return (
    <Layout>
      <EnquiryFilter />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Occasions List</span>
              </div>
            }
            data={openListData}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default ListOccasion;
