import React, { useState } from "react";
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
import { useCreateConsumption } from "@/modules/Stock";
import { useItemOptions, useYear } from "@/modules/Master";

const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const AddConsumption = () => {
  const navigate = useNavigate();
  const todayDate = moment().format("YYYY-MM-DD");

  const [cons, setCons] = useState({
    cons_date: todayDate,
    cons_year: "",
    cons_count: "",
    cons_sub_data: [],
  });

  const [fabric_inward_count, setCount] = useState(1);
  const useTemplate = {
    cons_sub_item: "",
    cons_sub_qnty: "",
    cons_sub_unit: "",
  };

  const [users, setUsers] = useState([useTemplate]);

  const { data: items = [] } = useItemOptions();
  const { data: currentYear = "" } = useYear();

  const { mutate: createCons, isPending: isSubmitting } = useCreateConsumption({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Consumption is Created Successfully");
        navigate("/consumption");
      } else {
        toast.error("Duplicate Entry");
      }
    },
    onError: () => {
      toast.error("An error occurred while creating consumption.");
    },
  });

  const addItem = () => {
    setUsers([...users, { ...useTemplate }]);
    setCount(fabric_inward_count + 1);
  };

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i ? { ...user, [e.target.name]: e.target.value } : user
    );
    setUsers(updatedUsers);
  };

  const removeUser = (index) => {
    const filteredUsers = users.filter((_, i) => i !== index);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };

  const onInputChange = (e) => {
    setCons({
      ...cons,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackButton = () => {
    navigate("/consumption");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      cons_date: cons.cons_date,
      cons_year: currentYear,
      cons_count: fabric_inward_count,
      cons_sub_data: users,
    };

    createCons(data);
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Create Consumption
            </h1>
          </div>
          <form id="addIndiv" onSubmit={onSubmit}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-4">
              <Input
                required
                label="Date"
                type="date"
                value={cons.cons_date}
                onChange={onInputChange}
                name="cons_date"
              />
            </div>

            {users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-4 items-center"
              >
                <div>
                  <Dropdown
                    label="Item"
                    className="required"
                    name="cons_sub_item"
                    value={user.cons_sub_item}
                    options={
                      items?.map((item) => ({
                        value: item.item_name,
                        label: item.item_name,
                      })) ?? []
                    }
                    onChange={(value) =>
                      onChange(
                        { target: { name: "cons_sub_item", value } },
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
                    value={user.cons_sub_qnty}
                    onChange={(e) => onChange(e, index)}
                    name="cons_sub_qnty"
                  />
                </div>
                <div>
                  <Dropdown
                    label="Unit"
                    className="required"
                    name="cons_sub_unit"
                    value={user.cons_sub_unit}
                    options={unitOptions}
                    onChange={(value) =>
                      onChange(
                        { target: { name: "cons_sub_unit", value } },
                        index
                      )
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
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

export default AddConsumption;
