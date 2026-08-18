import React from "react";
import Layout from "@/layout/Layout.jsx";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import { useWebsiteDonationList } from "@/modules/WebDonation";

const WebDonation = () => {
  const { data: webdonation = [], isLoading } = useWebsiteDonationList();

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
      name: "payment_user",
      label: "Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "payment_mobile",
      label: "Mobile",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "payment_date",
      label: "Date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "payment_exemption_type",
      label: "Exemption Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "payment_donation_type",
      label: "Donation Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "payment_amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
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
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  Website Donation List
                </span>
              </div>
            }
            data={webdonation}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default WebDonation;
