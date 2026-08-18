import React from "react";
import Layout from "@/layout/Layout.jsx";
import EnquiryFilter from "@/components/EnquiryFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Spinner } from "@material-tailwind/react";
import {
  AddVendorItem,
  EditVendorItem,
} from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useVendorList } from "@/modules/Master";

const VendorList = () => {
  const navigate = useNavigate();
  const { data: overdueListData = [], isLoading } = useVendorList();

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
      name: "vendor_name",
      label: "Vendor Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "vendor_gst",
      label: "GST Number",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "vendor_mobile",
      label: "Mobile Number",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "vendor_email",
      label: "Email Address",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "vendor_status",
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
            <EditVendorItem
              onClick={() => {
                const encryptedId = encryptId(id);
                navigate(`/EditVendors/${encodeURIComponent(encryptedId)}`);
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
      <AddVendorItem
        onClick={() => navigate("/addVendor")}
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
                <span className="text-lg font-semibold">Vendors List</span>
              </div>
            }
            data={overdueListData}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default VendorList;
