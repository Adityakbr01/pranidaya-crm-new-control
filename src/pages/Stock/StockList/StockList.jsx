import React from "react";
import Layout from "@/layout/Layout.jsx";
import DeliveryFilter from "@/components/DeliveryFilter.jsx";
import MUIDataTable from "mui-datatables";
import { NumericFormat } from "react-number-format";
import { Spinner } from "@material-tailwind/react";
import { useItemStock } from "@/modules/Stock";

const Stock = () => {
  const { data: stockList = [], isLoading } = useItemStock();

  const columns = [
    {
      name: "SlNo",
      label: "S.No",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "item_name",
      label: "Item Name",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },
    {
      name: "openpurch",
      label: "Open Balance",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <NumericFormat
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            value={value}
          />
        ),
      },
    },
    {
      name: "purch",
      label: "Received",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <NumericFormat
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            value={value}
          />
        ),
      },
    },
    {
      name: "sale",
      label: "Consumption",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <NumericFormat
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            value={value}
          />
        ),
      },
    },
    {
      name: "close_balance",
      label: "Close Balance",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_, tableMeta) => {
          const item = stockList[tableMeta.rowIndex];
          if (!item) return "";
          const closeBalance =
            (Number(item.openpurch) || 0) -
            (Number(item.closesale) || 0) +
            ((Number(item.purch) || 0) - (Number(item.sale) || 0));
          return (
            <NumericFormat
              thousandSeparator
              thousandsGroupStyle="lakh"
              displayType="text"
              value={closeBalance}
            />
          );
        },
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
                <span className="text-lg font-semibold">
                  Stocks List ( In Kgs )-Current Month
                </span>
              </div>
            }
            data={stockList || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default Stock;
