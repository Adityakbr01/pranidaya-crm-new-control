import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/common/DropDown.jsx";
import moment from "moment";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import {
  fetchAnimalTypeByGender,
  useCreateAnimalMeat,
} from "@/modules/AnimalStock";

const CreateAnimalMeat = () => {
  const navigate = useNavigate();
  const todayDate = moment().format("YYYY-MM-DD");

  const [animalmeet, setAnimalMeet] = useState({
    animal_male_no: "",
    animal_female_no: "",
    animal_meet_date: todayDate,
  });

  const { data: AnimalMeetMaleData } = useQuery({
    queryKey: ["MaleTypeList"],
    queryFn: () => fetchAnimalTypeByGender("Male"),
  });
  const { data: AnimalMeetFemaleData } = useQuery({
    queryKey: ["FemaleTypeList"],
    queryFn: () => fetchAnimalTypeByGender("Female"),
  });

  const { mutate: createMeat, isPending } = useCreateAnimalMeat({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Animal Meet Created Successfully");
        navigate("/animal-meet");
      } else {
        toast.error("Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const onInputChange = (e) => {
    setAnimalMeet({
      ...animalmeet,
      [e.target.name]: e.target.value,
    });
  };

  const onInputChangeN = (name, value) => {
    setAnimalMeet({
      ...animalmeet,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = document.getElementById("addIndiv").checkValidity();

    if (isValid) {
      createMeat({
        animal_male_no: animalmeet.animal_male_no,
        animal_female_no: animalmeet.animal_female_no,
        animal_meet_date: animalmeet.animal_meet_date,
      });
    }
  };

  const handleBackButton = () => {
    navigate("/animal-meet");
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Create Animal Meet
            </h1>
          </div>
          <form id="addIndiv" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 my-4">
              <div>
                <Dropdown
                  label="Male Govt Id"
                  className="required"
                  name="animal_male_no"
                  value={animalmeet.animal_male_no}
                  options={
                    AnimalMeetMaleData?.map((animal) => ({
                      value: animal.animal_type_no,
                      label: animal.animal_type_no,
                    })) ?? []
                  }
                  onChange={(value) => onInputChangeN("animal_male_no", value)}
                />
              </div>
              <div>
                <Dropdown
                  label="Female Govt Id"
                  className="required"
                  name="animal_female_no"
                  value={animalmeet.animal_female_no}
                  options={
                    AnimalMeetFemaleData?.map((animal) => ({
                      value: animal.animal_type_no,
                      label: animal.animal_type_no,
                    })) ?? []
                  }
                  onChange={(value) =>
                    onInputChangeN("animal_female_no", value)
                  }
                />
              </div>

              <div>
                <Input
                  required
                  label="Meet Date"
                  type="date"
                  value={animalmeet.animal_meet_date}
                  onChange={onInputChange}
                  name="animal_meet_date"
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

export default CreateAnimalMeat;
