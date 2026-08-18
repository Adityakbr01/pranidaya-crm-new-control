import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import Dropdown from "@/components/common/DropDown.jsx";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import { fetchConsumptionById, useUpdateConsumption } from "@/modules/Stock";
import { useItemOptions } from "@/modules/Master";

const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const EditConsumption = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const [cons, setCons] = useState({
    cons_date: "",
    cons_count: "",
    cons_sub_data: [],
  });
  const [users, setUsers] = useState([]);

  const { data: items = [] } = useItemOptions();

  const { mutate: updateCons, isPending: isUpdating } = useUpdateConsumption({
    onSuccess: (res) => {
      if (res?.code == 200 || res?.code == "200" || res?.status === 200) {
        toast.success("Consumption is Updated Successfully");
        navigate("/consumption");
      } else {
        toast.error("Duplicate Entry");
      }
    },
    onError: () => {
      toast.error("An error occurred while updating consumption.");
    },
  });

  useEffect(() => {
    if (decryptedId) {
      fetchConsumptionById(decryptedId)
        .then((data) => {
          if (data?.cons) {
            setCons(data.cons);
            setUsers(data.consSub || []);
          } else if (data) {
            setCons(data);
          }
        })
        .catch((err) => {
          console.error("Error fetching consumption:", err);
        });
    }
  }, [decryptedId]);

  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i ? { ...user, [e.target.name]: e.target.value } : user
    );
    setUsers(updatedUsers);
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
      cons_count: cons.cons_count,
      cons_sub_data: users,
    };

    updateCons({
      id: decryptedId,
      data,
    });
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Edit Consumption
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
              </div>
            ))}

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

export default EditConsumption;
