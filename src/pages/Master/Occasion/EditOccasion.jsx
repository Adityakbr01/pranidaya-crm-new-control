import Layout from "@/layout/Layout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import {
  inputClass,
  inputClassBack,
} from "@/components/common/Buttoncss.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import { fetchOccasionById, useUpdateOccasion } from "@/modules/Master";

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const EditOccasion = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);

  const navigate = useNavigate();
  const [occasion, setOccasion] = useState({
    occasion_name: "",
    occasion_status: "",
  });

  const { mutate: updateOccasionRecord, isPending: isUpdating } = useUpdateOccasion({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success(res?.msg || "Item is updated successfully");
        navigate("/occasion");
      } else {
        toast.error(res?.msg || "Duplicate Entry");
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
    if (e.target.name === "occasion_name" || e.target.name === "occasion_status") {
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

  useEffect(() => {
    if (decryptedId) {
      fetchOccasionById(decryptedId)
        .then((resData) => {
          setOccasion(resData?.occasion ?? resData);
        })
        .catch(() => {
          toast.error("Failed to fetch item details");
        });
    }
  }, [decryptedId]);

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (form && form.checkValidity() && form.reportValidity()) {
      updateOccasionRecord({
        id: decryptedId,
        data: {
          occasion_name: occasion.occasion_name,
          occasion_status: occasion.occasion_status,
        },
      });
    }
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          {/* Title */}
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
              Edit Occasion
            </h1>
          </div>

          {/* Form Section */}
          <form autoComplete="off" id="addIndiv" onSubmit={onSubmit}>
            <div className="md:flex gap-2 justify-start mb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between">
                {/* Item Name Field */}
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
                <div>
                  <Fields
                    required={true}
                    title=" Status"
                    type="whatsappDropdown"
                    autoComplete="Name"
                    options={status}
                    name="occasion_status"
                    value={occasion.occasion_status}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className={`${inputClass} ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
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

export default EditOccasion;
