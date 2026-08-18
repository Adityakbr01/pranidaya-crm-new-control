import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import Layout from "@/layout/Layout.jsx";
import Fields from "@/components/common/TextField/TextField.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inputClass, inputClassBack } from "@/components/common/Buttoncss.jsx";
import { useCreateVendor } from "@/modules/Master";

const AddVendors = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    vendor_name: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_gst: "",
    vendor_address: "",
  });

  const { mutate: createVendorRecord, isPending: isSubmitting } = useCreateVendor({
    onSuccess: (res) => {
      if (res?.code == "200" || res?.code == 200 || res?.status === 200) {
        toast.success("Item is Created Successfully");
        navigate("/VendorList");
      } else {
        toast.error("Duplicate Entry");
      }
    },
    onError: () => {
      toast.error("An error occurred, please try again.");
    },
  });

  const handleBackButton = () => {
    navigate("/VendorList");
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

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle input change
  const onInputChange = (e) => {
    if (e.target.name == "vendor_mobile") {
      if (validateOnlyNumber(e.target.value)) {
        setVendor({
          ...vendor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setVendor({
        ...vendor,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (form && form.checkValidity() && form.reportValidity()) {
      createVendorRecord({
        vendor_name: vendor.vendor_name,
        vendor_mobile: vendor.vendor_mobile,
        vendor_email: vendor.vendor_email,
        vendor_gst: vendor.vendor_gst,
        vendor_address: vendor.vendor_address,
      });
    }
  };

  return (
    <Layout>
      <div>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <div className="flex mb-4">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2 content-center">
              Create Vendor
            </h1>
          </div>
          <form autoComplete="off" id="addIndiv" onSubmit={onSubmit}>
            <div className="md:flex gap-2 justify-start mb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between">
                <div>
                  <Fields
                    required={true}
                    label="Vendor Name"
                    type="textField"
                    autoComplete="Name"
                    name="vendor_name"
                    value={vendor.vendor_name}
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <Input
                    label="Mobile"
                    type="tel"
                    maxLength={10}
                    name="vendor_mobile"
                    value={vendor.vendor_mobile}
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <Input
                    label="Email"
                    type="email"
                    name="vendor_email"
                    value={vendor.vendor_email}
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <Fields
                    label="GST No"
                    type="textField"
                    autoComplete="Name"
                    name="vendor_gst"
                    value={vendor.vendor_gst}
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <Fields
                    label="Address"
                    type="textField"
                    autoComplete="Name"
                    name="vendor_address"
                    value={vendor.vendor_address}
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
              <button
                type="button"
                onClick={handleBackButton}
                className={inputClassBack}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddVendors;
