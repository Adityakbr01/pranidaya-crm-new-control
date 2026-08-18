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
import { useCreateItem } from "@/modules/Master";

const AddEnquiry = () => {
  const navigate = useNavigate();
  const [item, setItems] = useState({
    item_name: "",
  });

  const { mutate: createItemRecord, isPending: isSubmitting } = useCreateItem({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Item is Created Successfully");
        navigate("/master-list");
      } else {
        toast.error("Duplicate Entry");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const handleBackButton = () => {
    navigate("/master-list");
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
    if (e.target.name === "item_name") {
      if (validateOnlyText(e.target.value)) {
        setItems({
          ...item,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setItems({
        ...item,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (form && form.checkValidity() && form.reportValidity()) {
      createItemRecord({ item_name: item.item_name });
    }
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center mb-4">
            Create Item
          </h1>
          <form autoComplete="off" id="addIndiv" onSubmit={onSubmit}>
            <div className="md:flex gap-2 justify-start mb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between">
                <div>
                  <Fields
                    required={true}
                    label="Item Name"
                    type="textField"
                    autoComplete="Name"
                    name="item_name"
                    value={item.item_name}
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

export default AddEnquiry;
