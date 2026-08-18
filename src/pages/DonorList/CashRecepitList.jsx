import React from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { MdKeyboardBackspace } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";
import moment from "moment/moment";
import { useCashReceiptList } from "@/modules/Receipts";

const CashRecepitList = () => {
  const navigate = useNavigate();
  const { data: rawData = [], isLoading } = useCashReceiptList();

  const cashListData = Array.isArray(rawData)
    ? rawData.map((item, index) => [
        index + 1,
        item.c_receipt_no || (item.donor ? item.donor + (item.donor_full_name || "") : ""),
        item.donor_full_name || item.c_donor_name || "",
        moment(item.receipt_date).format("DD-MM-YYYY"),
        item.receipt_exemption_type,
        item.receipt_donation_type,
        item.receipt_total_amount,
        item.id,
      ])
    : [];

  const columns = [
    {
      name: "SlNo",
      options: {
        filter: false,
        print: true,
        download: true,
      },
    },
    {
      name: "Receipt No",
      options: {
        filter: true,
        print: true,
        download: true,
        display: "included",
      },
    },
    "Name",
    "Date",
    "Exemption Type",
    "Donation Type",
    "Amount",
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    setRowProps: () => {
      return {
        style: {
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };
  return (
    <Layout>
      <div className="flex flex-row justify-start p-2">
        <MdKeyboardBackspace
          className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          onClick={() => navigate("/donor-list")}
        />
        <h1 className="text-xl md:text-2xl text-[#464D69] font-semibold ml-2">
          Cash Receipts List
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            data={cashListData}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default CashRecepitList;
