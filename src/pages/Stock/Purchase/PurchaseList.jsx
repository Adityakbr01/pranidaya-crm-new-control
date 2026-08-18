import React from "react";
import Layout from "@/layout/Layout.jsx";
import DeliveryFilter from "@/components/DeliveryFilter.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  AddPurchase,
  EditPurchase,
} from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { usePurchaseList } from "@/modules/Stock";

const PurchaseList = () => {
  const navigate = useNavigate();
  const { data: purchaseList = [], isLoading } = usePurchaseList();

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
      name: "purchase_date",
      label: " Date ",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
      },
    },
    {
      name: "vendor_name",
      label: " Vendor ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "purchase_bill_no",
      label: " Bill No ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "purchase_total_bill",
      label: " Total Amount ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "purchase_count",
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
            <EditPurchase
              onClick={() => {
                const encryptedId = encryptId(id);
                navigate(
                  `/edit-purchase/${encodeURIComponent(encryptedId)}`
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
      <AddPurchase
        onClick={() => navigate("/add-purchase")}
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
                <span className="text-lg font-semibold">Purchase List</span>
              </div>
            }
            data={purchaseList || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default PurchaseList;
