import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import Dropdown from "@/components/common/DropDown.jsx";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useAnimalTypeById, useUpdateAnimalType } from "@/modules/AnimalStock";

const AnimalStatus = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const EditAnimal = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    animal_type: "",
    animal_type_status: "",
  });

  const { data: fetchedAnimal, isLoading, isError } = useAnimalTypeById(decryptedId);

  const { mutate: updateAnimal, isPending: isUpdating } = useUpdateAnimalType({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Animal Updated Successfully");
        navigate("/animalStock");
      } else {
        toast.error("Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  useEffect(() => {
    if (fetchedAnimal) {
      setAnimal(fetchedAnimal);
    }
  }, [fetchedAnimal]);

  const onInputChange = (e) => {
    setAnimal({
      ...animal,
      [e.target.name]: e.target.value,
    });
  };

  const onInputChangeN = (name, value) => {
    setAnimal({
      ...animal,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = document.getElementById("editAnimalForm").checkValidity();

    if (isValid) {
      updateAnimal({
        id: decryptedId,
        data: {
          animal_type_status: animal.animal_type_status,
        },
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
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading data.</p>
          ) : (
            <>
              <div className="flex mb-4">
                <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
                  Edit Animal Type
                </h1>
              </div>
              <form id="editAnimalForm" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-4">
                  <div className="mb-4">
                    <Fields
                      required
                      type="textField"
                      label="Animal Type"
                      value={animal.animal_type}
                      onChange={onInputChange}
                      name="animal_type"
                      disabled
                      labelProps={{
                        className: "!text-gray-500",
                      }}
                    />
                  </div>
                  <div>
                    <Dropdown
                      label="Status"
                      className="required"
                      value={animal.animal_type_status}
                      name="animal_type_status"
                      required={true}
                      options={AnimalStatus}
                      onChange={(value) =>
                        onInputChangeN("animal_type_status", value)
                      }
                    />
                  </div>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditAnimal;
