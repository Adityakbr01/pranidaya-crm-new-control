import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { Input } from "@material-tailwind/react";
import Dropdown from "@/components/common/DropDown.jsx";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import { fetchPurchaseById, useUpdatePurchase } from "@/modules/Stock";
import { useVendorOptions, useItemOptions } from "@/modules/Master";

const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const EditPurchase = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const [purchase, setPurchase] = useState({
    purchase_date: "",
    purchase_vendor: "",
    purchase_bill_no: "",
    purchase_total_bill: "",
    purchase_count: "",
  });

  const initialUserTemplate = {
    purchase_sub_item: "",
    purchase_sub_amount: "",
    purchase_sub_qnty: "",
    purchase_sub_unit: "",
  };

  const [users, setUsers] = useState([initialUserTemplate]);

  const { data: vendors = [] } = useVendorOptions();
  const { data: items = [] } = useItemOptions();

  const { mutate: updatePurchaseRecord, isPending: isUpdating } = useUpdatePurchase({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Purchase Updated Successfully");
        navigate("/purchase");
      } else {
        toast.error("Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  useEffect(() => {
    if (decryptedId) {
      fetchPurchaseById(decryptedId)
        .then((data) => {
          if (data?.purchase) {
            setPurchase(data.purchase);
            setUsers(data.purchaseSub || [initialUserTemplate]);
          } else if (data) {
            setPurchase(data);
          }
        })
        .catch((err) => {
          console.error("Error fetching purchase:", err);
        });
    }
  }, [decryptedId]);

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

  const addItem = () => {
    setUsers([...users, initialUserTemplate]);
  };

  const removeUser = (index) => {
    const filteredUsers = users.filter((_, i) => i !== index);
    setUsers(filteredUsers);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      purchase_date: purchase.purchase_date,
      purchase_vendor: purchase.purchase_vendor,
      purchase_bill_no: purchase.purchase_bill_no,
      purchase_total_bill: purchase.purchase_total_bill,
      purchase_count: purchase.purchase_count,
      purchase_sub_data: users,
    };

    const isValid = document.getElementById("addIndiv").checkValidity();
    if (isValid) {
      updatePurchaseRecord({
        id: decryptedId,
        data,
      });
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
              Edit Purchase
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
                    value={user.purchase_sub_qnty}
                    onChange={(e) => onItemChange(e, index)}
                    name="purchase_sub_qnty"
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
                disabled={isUpdating}
                className={`${inputClass} ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Updating..." : "Update"}
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

export default EditPurchase;
