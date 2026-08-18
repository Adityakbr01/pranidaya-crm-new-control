import Layout from "@/layout/Layout.jsx";
import Dropdown from "@/components/common/DropDown.jsx";
import { Input } from "@material-tailwind/react";
import Moment from "moment";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadCommon from "@/pages/download/DeliveryDownload.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import {
  downloadPurchase,
  downloadDetailPurchase,
} from "@/modules/Downloads";
import { useItemOptions } from "@/modules/Master";

function CashPurchase() {
  const twoMonthsAgo = Moment().subtract(2, "months").format("YYYY-MM-DD");
  const userType = localStorage.getItem("user_type_id");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisableds, setIsButtonDisableds] = useState(false);

  const unit = [
    { value: "Kg", label: "Kg" },
    { value: "Ton", label: "Ton" },
    { value: "Bag", label: "Bag" },
  ];

  // Get the first and last date
  const todayback = Moment().format("YYYY-MM-DD");
  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [receiptsdwn, setPurchaseDownload] = useState({
    purchase_from_date: firstdate,
    purchase_to_date: todayback,
    purchase_sub_item: "",
    purchase_sub_unit: "",
  });

  const { data: item = [] } = useItemOptions();

  // Input change handler for native inputs
  const onInputChangeN = (name, value) => {
    setPurchaseDownload({
      ...receiptsdwn,
      [name]: value,
    });
  };

  const onInputChange = (e) => {
    setPurchaseDownload({
      ...receiptsdwn,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler for download
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      purchase_from_date: receiptsdwn.purchase_from_date,
      purchase_to_date: receiptsdwn.purchase_to_date,
      purchase_sub_item: receiptsdwn.purchase_sub_item,
      purchase_sub_unit: receiptsdwn.purchase_sub_unit,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisabled(true);

      try {
        const blob = await downloadPurchase(data);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "purchase_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Purchase is Downloaded Successfully");
      } catch (err) {
        toast.error("Purchase is Not Downloaded");
        console.error("Download error:", err);
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  // SUBMIT HANDLER FOR DOWNLOAD DETAILS
  const onSubmit1 = async (e) => {
    e.preventDefault();
    let data = {
      purchase_from_date: receiptsdwn.purchase_from_date,
      purchase_to_date: receiptsdwn.purchase_to_date,
      purchase_sub_item: receiptsdwn.purchase_sub_item,
      purchase_sub_unit: receiptsdwn.purchase_sub_unit,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisableds(true);

      try {
        const blob = await downloadDetailPurchase(data);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "purchase_detail_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Purchase Details is Downloaded Successfully");
      } catch (err) {
        toast.error("Purchase Details is Not Downloaded");
        console.error("Download error:", err);
      } finally {
        setIsButtonDisableds(false);
      }
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <ToastContainer />
      <div className="bg-white mt-4 p-4 rounded-lg shadow-md">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold text-gray-700 mb-4">
          Download Purchase
        </h3>
        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                className="required"
                required
                name="purchase_from_date"
                min={userType === "4" ? undefined : twoMonthsAgo}
                max={userType === "4" ? undefined : todayback}
                value={receiptsdwn.purchase_from_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                required
                className="required"
                name="purchase_to_date"
                min={userType === "4" ? undefined : twoMonthsAgo}
                max={userType === "4" ? undefined : todayback}
                value={receiptsdwn.purchase_to_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Item"
                className="required"
                name="purchase_sub_item"
                value={receiptsdwn.purchase_sub_item}
                options={
                  item?.map((items) => ({
                    value: items.item_name,
                    label: items.item_name,
                  })) ?? []
                }
                onChange={(value) =>
                  onInputChangeN("purchase_sub_item", value)
                }
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Unit"
                className="required"
                name="purchase_sub_unit"
                value={receiptsdwn.purchase_sub_unit}
                options={unit}
                onChange={(value) =>
                  onInputChangeN("purchase_sub_unit", value)
                }
              />
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              className={inputClass}
              type="submit"
              onClick={onSubmit}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Downloading..." : "Download"}
            </button>
            <button
              className={inputClass}
              type="button"
              onClick={onSubmit1}
              disabled={isButtonDisableds}
            >
              {isButtonDisableds ? "Downloading..." : "Details"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CashPurchase;
