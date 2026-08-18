import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { useCreateOccasion } from "@/modules/Master";

const AddOccasion = () => {
  const navigate = useNavigate();
  const [occasion, setOccasion] = useState({
    occasion_name: "",
  });

  const { mutate: createOccasionRecord, isPending: isSubmitting } = useCreateOccasion({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success(res?.msg || "Item is Created Successfully");
        navigate("/occasion");
      } else if (res?.code == "403" || res?.code == 403) {
        toast.error("Duplicate Entry");
      } else {
        toast.error(res?.msg || "Error occurred");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const handleBackButton = () => {
    navigate("/occasion");
  };

  // Validate only text input
  const validateOnlyText = (inputtxt) => {
    var re = /^[A-Za-z ]+$/;
    if (inputtxt === "" || re.test(inputtxt)) {
      return true;
    } else {
      return false;
    }
  };

  // Handle input change
  const onInputChange = (e) => {
    if (e.target.name === "occasion_name") {
      if (validateOnlyText(e.target.value)) {
        setOccasion({
          ...occasion,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setOccasion({
        ...occasion,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (form && form.checkValidity() && form.reportValidity()) {
      createOccasionRecord({ occasion_name: occasion.occasion_name });
    }
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
              Create Occasion
            </h1>
          </div>

          <form autoComplete="off" id="addIndiv" onSubmit={onSubmit}>
            <div className="md:flex gap-2 justify-start mb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between">
                <div>
                  <Fields
                    required={true}
                    label="Occasion Name"
                    type="textField"
                    autoComplete="Name"
                    name="occasion_name"
                    value={occasion.occasion_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className={`${inputClass} ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button type="button" onClick={handleBackButton} className={inputClassBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddOccasion;
