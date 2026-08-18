import { Input } from "@material-tailwind/react";
import Moment from "moment";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import Dropdown from "@/components/common/DropDown.jsx";
import Layout from "@/layout/Layout.jsx";
import { ContextPanel } from "@/utils/ContextPanel.jsx";
import DownloadCommon from "@/pages/download/DeliveryDownload.jsx";
import {
  downloadMaterialReceipts,
  downloadDetailMaterialReceipts,
} from "@/modules/Downloads";
import { useItemOptions } from "@/modules/Master";

const unit = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
  { value: "Bag", label: "Bag" },
];

const manual = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "1",
    label: "Manual",
  },
];

function MaterialReceipts() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisableds, setIsButtonDisableds] = useState(false);
  const { dates } = useContext(ContextPanel);
  const allowedDates = dates?.m_receipt || [];
  const userType = localStorage.getItem("user_type_id");

  // Get the first and last date
  const todayback = Moment().format("YYYY-MM-DD");
  let firstdate = Moment().startOf("month").format("YYYY-MM-DD");
  if (userType == 5 && allowedDates.length > 0) {
    firstdate = allowedDates[allowedDates.length - 1];
  }
  const [receiptsdwn, setPurchaseDownload] = useState({
    receipt_from_date: firstdate,
    receipt_to_date: todayback,
    purchase_sub_item: "",
    purchase_sub_unit: "",
    m_manual_receipt_no: "",
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
      receipt_from_date: receiptsdwn.receipt_from_date,
      receipt_to_date: receiptsdwn.receipt_to_date,
      purchase_sub_item: receiptsdwn.purchase_sub_item,
      purchase_sub_unit: receiptsdwn.purchase_sub_unit,
      m_manual_receipt_no: receiptsdwn.m_manual_receipt_no,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisabled(true);

      try {
        const blob = await downloadMaterialReceipts(data);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "receipt_material_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Receipt Material is Downloaded Successfully");
      } catch (err) {
        toast.error("Receipt Material is Not Downloaded");
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
      receipt_from_date: receiptsdwn.receipt_from_date,
      receipt_to_date: receiptsdwn.receipt_to_date,
      purchase_sub_item: receiptsdwn.purchase_sub_item,
      purchase_sub_unit: receiptsdwn.purchase_sub_unit,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisableds(true);

      try {
        const blob = await downloadDetailMaterialReceipts(data);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "receipt_material_detail_list.csv");
        document.body.appendChild(link);
        link.click();
        toast.success("Receipt Material Detail is Downloaded Successfully");
      } catch (err) {
        toast.error("Receipt Material Detail is Not Downloaded");
        console.error("Download error:", err);
      } finally {
        setIsButtonDisableds(false);
      }
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <div className="bg-white mt-4 p-4 rounded-lg shadow-md">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold text-gray-700 mb-4">
          Download Material Receipts
        </h3>
        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                className="required"
                required
                name="receipt_from_date"
                min={userType == 5 ? allowedDates[0] : undefined}
                max={
                  userType == 5
                    ? allowedDates[allowedDates.length - 1]
                    : undefined
                }
                value={receiptsdwn.receipt_from_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                required
                className="required"
                name="receipt_to_date"
                min={userType == 5 ? allowedDates[0] : undefined}
                max={
                  userType == 5
                    ? allowedDates[allowedDates.length - 1]
                    : undefined
                }
                value={receiptsdwn.receipt_to_date}
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
                onChange={(value) => onInputChangeN("purchase_sub_item", value)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Unit"
                className="required"
                name="purchase_sub_unit"
                value={receiptsdwn.purchase_sub_unit}
                options={unit}
                onChange={(value) => onInputChangeN("purchase_sub_unit", value)}
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Manual"
                className="required"
                name="m_manual_receipt_no"
                value={receiptsdwn.m_manual_receipt_no}
                options={manual}
                onChange={(value) =>
                  onInputChangeN("m_manual_receipt_no", value)
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

export default MaterialReceipts;
