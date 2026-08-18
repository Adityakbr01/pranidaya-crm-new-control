import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { useCreateAnimalType } from "@/modules/AnimalStock";

const CreateAnimal = () => {
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    animal_type: "",
  });

  const { mutate: createAnimal, isPending } = useCreateAnimalType({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Animal Created Successfully");
        navigate("/animalStock");
      } else {
        toast.error("Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const onInputChange = (e) => {
    setAnimal({
      ...animal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = document.getElementById("addIndiv").checkValidity();

    if (isValid) {
      createAnimal({
        animal_type: animal.animal_type,
      });
    }
  };

  const handleBackButton = () => {
    navigate("/animalStock");
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Create Animal Type
            </h1>
          </div>
          <form id="addIndiv" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 my-4">
              <div className="mb-4">
                <Fields
                  required
                  type="textField"
                  label="Animal Type"
                  value={animal.animal_type}
                  onChange={onInputChange}
                  name="animal_type"
                />
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="submit"
                disabled={isPending}
                className={`${inputClass} ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? "Submitting..." : "Submit"}
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

export default CreateAnimal;
