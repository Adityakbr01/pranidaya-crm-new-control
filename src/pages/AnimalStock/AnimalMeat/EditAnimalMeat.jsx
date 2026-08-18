import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import { Input, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/common/DropDown.jsx";
import moment from "moment";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import {
  fetchAnimalBornArrivalByGender,
  useAnimalMeatById,
  useUpdateAnimalMeat,
} from "@/modules/AnimalStock";

const EditAnimalMeat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const [animalmeet, setAnimalMeet] = useState({
    animal_male_no: "",
    animal_female_no: "",
    animal_meet_date: "",
    animal_baby_no: "",
    animal_baby_date: "",
  });

  const { data: AnimalMeetMaleData, isLoading: isLoadingMale } = useQuery({
    queryKey: ["MaleBornArrivalList"],
    queryFn: () => fetchAnimalBornArrivalByGender("Male"),
  });

  const { data: AnimalMeetFemaleData, isLoading: isLoadingFemale } = useQuery({
    queryKey: ["FemaleBornArrivalList"],
    queryFn: () => fetchAnimalBornArrivalByGender("Female"),
  });

  const {
    data: fetchedAnimal,
    isLoading: isLoadingAnimal,
    isError,
  } = useAnimalMeatById(decryptedId, {
    enabled: !!decryptedId,
  });

  const { mutate: updateMeat, isPending: isUpdating } = useUpdateAnimalMeat({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Animal Meet Updated Successfully");
        navigate("/animal-meet");
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
      setAnimalMeet({
        ...fetchedAnimal,
        animal_meet_date: fetchedAnimal.animal_meet_date
          ? moment(fetchedAnimal.animal_meet_date).format("YYYY-MM-DD")
          : "",
        animal_baby_date: fetchedAnimal.animal_baby_date
          ? moment(fetchedAnimal.animal_baby_date).format("YYYY-MM-DD")
          : "",
      });
    }
  }, [fetchedAnimal]);

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
    const data = {
      animal_male_no: animalmeet.animal_male_no,
      animal_female_no: animalmeet.animal_female_no,
      animal_meet_date: animalmeet.animal_meet_date,
      animal_baby_no: animalmeet.animal_baby_no,
      animal_baby_date: animalmeet.animal_baby_date,
    };
    const isValid = document.getElementById("editAnimalForm").checkValidity();

    if (isValid) {
      updateMeat({
        id: decryptedId,
        data,
      });
    }
  };

  const handleBackButton = () => {
    navigate("/animal-meet");
  };

  if (isLoadingMale || isLoadingFemale || isLoadingAnimal) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      </Layout>
    );
  }

  if (isError) return <Layout>Error loading data.</Layout>;

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Edit Animal Meet
            </h1>
          </div>

          <form id="editAnimalForm" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
              <div>
                <Dropdown
                  label="Male Govt Id"
                  className="required"
                  name="animal_male_no"
                  value={animalmeet.animal_male_no}
                  disabled={true}
                  required={true}
                  options={
                    Array.isArray(AnimalMeetMaleData)
                      ? AnimalMeetMaleData.map((animal) => ({
                          value: animal.animal_type_no,
                          label: animal.animal_type_no,
                        }))
                      : []
                  }
                  onChange={(value) => onInputChangeN("animal_male_no", value)}
                  labelProps={{
                    className: "!text-gray-500",
                  }}
                />
              </div>
              <div>
                <Dropdown
                  label="Female Govt Id"
                  className="required"
                  name="animal_female_no"
                  value={animalmeet.animal_female_no}
                  disabled={true}
                  required={true}
                  options={
                    Array.isArray(AnimalMeetFemaleData)
                      ? AnimalMeetFemaleData.map((animal) => ({
                          value: animal.animal_type_no,
                          label: animal.animal_type_no,
                        }))
                      : []
                  }
                  onChange={(value) =>
                    onInputChangeN("animal_female_no", value)
                  }
                  labelProps={{
                    className: "!text-gray-500",
                  }}
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
                  disabled
                  labelProps={{
                    className: "!text-gray-500",
                  }}
                />
              </div>

              <div className="mb-4">
                <Fields
                  required
                  type="textField"
                  label="Baby Govt Id"
                  value={animalmeet.animal_baby_no}
                  onChange={onInputChange}
                  name="animal_baby_no"
                />
              </div>
              <div className="mb-4">
                <Input
                  required
                  type="date"
                  label="Animal Baby Date"
                  value={animalmeet.animal_baby_date}
                  onChange={onInputChange}
                  name="animal_baby_date"
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
        </div>
      </div>
    </Layout>
  );
};

export default EditAnimalMeat;
