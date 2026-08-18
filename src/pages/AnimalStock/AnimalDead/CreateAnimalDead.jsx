import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { toast } from "react-toastify";
import { Input, Textarea } from "@material-tailwind/react";
import Dropdown from "@/components/common/DropDown.jsx";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import {
  useAnimalTypeList,
  useAnimalBornArrivalOptions,
  useCreateAnimalDead,
} from "@/modules/AnimalStock";

const AnimalTypeSource = [
  { value: "Death", label: "Death" },
  { value: "Given", label: "Given" },
];

const CreateAnimalDead = () => {
  const navigate = useNavigate();
  const [animalborn, setAnimalBorn] = useState({
    animal_type_no: "",
    animal_dead_source: "",
    animal_dead_date: "",
    animal_type_remarks: "",
  });

  const { data: AnimalTypeData } = useAnimalTypeList();
  const { data: AnimalTypeNoData } = useAnimalBornArrivalOptions();

  const { mutate: createDead, isPending } = useCreateAnimalDead({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Animal Dead Created Successfully");
        navigate("/animal-dead");
      } else {
        toast.error("Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const onInputChange = (e) => {
    setAnimalBorn({
      ...animalborn,
      [e.target.name]: e.target.value,
    });
  };

  const onInputChangeN = (name, value) => {
    setAnimalBorn({
      ...animalborn,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["animal_dead_source", "animal_type_no"];
    let isValid = true;
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!animalborn[field]) {
        isValid = false;
        missingFields.push(field);
      }
    });

    if (!isValid) {
      toast.error(
        `Please fill the following required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    createDead(animalborn);
  };

  const handleBackButton = () => {
    navigate("/animal-dead");
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Create Animal Death /Given
            </h1>
          </div>
          <form id="addIndiv" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
              <div>
                <Dropdown
                  label="Animal Govt Id"
                  className="required"
                  name="animal_type_no"
                  required={true}
                  value={animalborn.animal_type_no}
                  options={
                    AnimalTypeNoData?.map((animal) => ({
                      value: animal.animal_type_no,
                      label: animal.animal_type_no,
                    })) ?? []
                  }
                  onChange={(value) => onInputChangeN("animal_type_no", value)}
                />
              </div>
              <div>
                <Dropdown
                  required={true}
                  label="Source"
                  className="required"
                  name="animal_dead_source"
                  value={animalborn.animal_dead_source}
                  options={AnimalTypeSource}
                  onChange={(value) =>
                    onInputChangeN("animal_dead_source", value)
                  }
                />
              </div>
              <div>
                <Input
                  required
                  label="Dead Date"
                  type="date"
                  value={animalborn.animal_dead_date}
                  onChange={onInputChange}
                  name="animal_dead_date"
                />
              </div>
            </div>
            <div className="w-full">
              <Textarea
                id="animal_remark"
                name="animal_type_remarks"
                value={animalborn.animal_type_remarks}
                onChange={onInputChange}
                rows={6}
                label="Remark"
                className="resize-y"
              />
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

export default CreateAnimalDead;
