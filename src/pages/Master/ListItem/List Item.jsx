import React from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EnquiryFilter from "@/components/EnquiryFilter.jsx";
import { Spinner } from "@material-tailwind/react";
import {
  AddListItem,
  EditListItem,
} from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useItemList } from "@/modules/Master";

const OpenListEnquiry = () => {
  const navigate = useNavigate();
  const { data: openListData = [], isLoading } = useItemList();

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
      name: "item_name",
      label: "Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "item_status",
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
            <EditListItem
              onClick={() => {
                const encryptedId = encryptId(id);
                navigate(`/edit-enquiry/${encodeURIComponent(encryptedId)}`);
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
      <AddListItem
        onClick={() => navigate("/add-enquiry")}
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
                <span className="text-lg font-semibold">Enquiry List</span>
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

export default OpenListEnquiry;
