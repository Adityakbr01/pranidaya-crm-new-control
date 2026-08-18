import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { Input } from "@material-tailwind/react";
import Dropdown from "@/components/common/DropDown.jsx";
import moment from "moment";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { useCreatePurchase } from "@/modules/Stock";
import { useVendorOptions, useItemOptions, useYear } from "@/modules/Master";

// Unit options for dropdown
const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const AddPurchase = () => {
  const navigate = useNavigate();
  const todayDate = moment().format("YYYY-MM-DD");

  const [purchase, setPurchase] = useState({
    purchase_date: todayDate,
    purchase_vendor: "",
    purchase_bill_no: "",
    purchase_total_bill: "",
  });

  const useTemplate = {
    purchase_sub_item: "",
    purchase_sub_qnt: "",
    purchase_sub_unit: "",
    purchase_sub_amount: "",
  };

  const [users, setUsers] = useState([useTemplate]);
  const [fabric_inward_count, setCount] = useState(1);

  const { data: vendors = [] } = useVendorOptions();
  const { data: items = [] } = useItemOptions();
  const { data: currentYear = "" } = useYear();

  const { mutate: createPurchaseRecord, isPending: isSubmitting } = useCreatePurchase({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Purchase Created Successfully");
        navigate("/purchase");
      } else {
        toast.error("Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const addItem = () => {
    setUsers([...users, useTemplate]);
    setCount(fabric_inward_count + 1);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };

  const onInputChange = (e) => {
    setPurchase({
      ...purchase,
      [e.target.name]: e.target.value,
    });
  };

  const onItemChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i ? { ...user, [e.target.name]: e.target.value } : user
    );
    setUsers(updatedUsers);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      purchase_date: purchase.purchase_date,
      purchase_vendor: purchase.purchase_vendor,
      purchase_bill_no: purchase.purchase_bill_no,
      purchase_total_bill: purchase.purchase_total_bill,
      purchase_count: fabric_inward_count,
      purchase_sub_data: users,
      purchase_year: currentYear,
    };

    const isValid = document.getElementById("addIndiv").checkValidity();

    if (isValid) {
      createPurchaseRecord(data);
    }
  };

  const handleBackButton = () => {
    navigate("/purchase");
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Create Purchase
            </h1>
          </div>
          <form id="addIndiv" onSubmit={onSubmit}>
            {/* Purchase Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
              <div>
                <Input
                  required
                  label="Date"
                  type="date"
                  value={purchase.purchase_date}
                  onChange={onInputChange}
                  name="purchase_date"
                />
              </div>
              <div>
                <Dropdown
                  label="Vendor"
                  className="required"
                  name="purchase_vendor"
                  value={purchase.purchase_vendor}
                  options={
                    vendors?.map((vendor) => ({
                      value: vendor.vendor_name,
                      label: vendor.vendor_name,
                    })) ?? []
                  }
                  onChange={(value) =>
                    setPurchase({ ...purchase, purchase_vendor: value })
                  }
                />
              </div>
              <div>
                <Fields
                  required
                  type="textField"
                  label="Bill No"
                  value={purchase.purchase_bill_no}
                  onChange={onInputChange}
                  name="purchase_bill_no"
                />
              </div>
              <div>
                <Fields
                  required
                  type="textField"
                  label="Total Bill"
                  value={purchase.purchase_total_bill}
                  onChange={onInputChange}
                  name="purchase_total_bill"
                />
              </div>
            </div>

            {/* Sub-Items Form */}
            {users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-4 items-center"
              >
                <div>
                  <Dropdown
                    label="Item"
                    className="required"
                    name="purchase_sub_item"
                    value={user.purchase_sub_item}
                    options={
                      items?.map((item) => ({
                        value: item.item_name,
                        label: item.item_name,
                      })) ?? []
                    }
                    onChange={(value) =>
                      onItemChange(
                        { target: { name: "purchase_sub_item", value } },
                        index
                      )
                    }
                  />
                </div>
                <div>
                  <Fields
                    required
                    type="textField"
                    label="Quantity"
                    value={user.purchase_sub_qnt}
                    onChange={(e) => onItemChange(e, index)}
                    name="purchase_sub_qnt"
                  />
                </div>
                <div>
                  <Dropdown
                    label="Unit"
                    className="required"
                    name="purchase_sub_unit"
                    value={user.purchase_sub_unit}
                    options={unitOptions}
                    onChange={(value) =>
                      onItemChange(
                        { target: { name: "purchase_sub_unit", value } },
                        index
                      )
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Fields
                    required
                    type="textField"
                    label="Amount"
                    value={user.purchase_sub_amount}
                    onChange={(e) => onItemChange(e, index)}
                    name="purchase_sub_amount"
                  />
                  {users.length > 1 && (
                    <IconButton onClick={() => removeUser(index)}>
                      <MdDelete className="text-red-500" />
                    </IconButton>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end my-4">
              <button
                type="button"
                className={inputClass}
                onClick={addItem}
              >
                Add Item
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${inputClass} ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button type="button" className={inputClassBack} onClick={handleBackButton}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddPurchase;
