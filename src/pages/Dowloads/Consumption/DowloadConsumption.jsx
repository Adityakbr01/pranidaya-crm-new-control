import { Input } from "@material-tailwind/react";
import Moment from "moment";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import Dropdown from "@/components/common/DropDown.jsx";
import Layout from "@/layout/Layout.jsx";
import DownloadCommon from "@/pages/download/DeliveryDownload.jsx";
import { downloadConsumption } from "@/modules/Downloads";
import { useItemOptions } from "@/modules/Master";

function DowloadConsumption() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const twoMonthsAgo = Moment().subtract(2, "months").format("YYYY-MM-DD");
  const userType = localStorage.getItem("user_type_id");
  const unit = [
    { value: "Kg", label: "Kg" },
    { value: "Ton", label: "Ton" },
    { value: "Bag", label: "Bag" },
  ];

  // Get the first and last date
  const todayback = Moment().format("YYYY-MM-DD");
  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [receiptsdwn, setConsumptionDownload] = useState({
    cons_from_date: firstdate,
    cons_to_date: todayback,
    cons_sub_item: "",
    cons_sub_unit: "",
  });

  const { data: item = [] } = useItemOptions();

  // Input change handler for native inputs
  const onInputChangeN = (name, value) => {
    setConsumptionDownload({
      ...receiptsdwn,
      [name]: value,
    });
  };

  const onInputChange = (e) => {
    setConsumptionDownload({
      ...receiptsdwn,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler for download
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      cons_from_date: receiptsdwn.cons_from_date,
      cons_to_date: receiptsdwn.cons_to_date,
      cons_sub_item: receiptsdwn.cons_sub_item,
      cons_sub_unit: receiptsdwn.cons_sub_unit,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisabled(true);

      try {
        const blob = await downloadConsumption(data);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "consumption_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Consumption is Downloaded Successfully");
      } catch (err) {
        toast.error("Consumption is Not Downloaded");
        console.error("Download error:", err);
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <div className="bg-white mt-4 p-4 rounded-lg shadow-md">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold text-gray-700 mb-4">
          Download Consumption
        </h3>
        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                className="required"
                required
                name="cons_from_date"
                min={userType === "4" ? undefined : twoMonthsAgo}
                max={userType === "4" ? undefined : todayback}
                value={receiptsdwn.cons_from_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                required
                className="required"
                name="cons_to_date"
                min={userType === "4" ? undefined : twoMonthsAgo}
                max={userType === "4" ? undefined : todayback}
                value={receiptsdwn.cons_to_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Item"
                className="required"
                name="cons_sub_item"
                value={receiptsdwn.cons_sub_item}
                options={
                  item?.map((items) => ({
                    value: items.item_name,
                    label: items.item_name,
                  })) ?? []
                }
                onChange={(value) => onInputChangeN("cons_sub_item", value)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Unit"
                className="required"
                name="cons_sub_unit"
                value={receiptsdwn.cons_sub_unit}
                options={unit}
                onChange={(value) => onInputChangeN("cons_sub_unit", value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className={inputClass}
              type="submit"
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default DowloadConsumption;
