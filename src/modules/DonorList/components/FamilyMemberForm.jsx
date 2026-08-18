import { Button } from "@material-tailwind/react";
import Fields from "@/components/common/TextField/TextField";
import { inputClass, inputClassBack } from "@/components/common/Buttoncss";

const FamilyMemberForm = ({
  donor,
  isSubmitting,
  onInputChange,
  onSubmit,
  onBack,
}) => (
  <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
    <h1 className="text-2xl text-[#464D69] font-semibold">Personal Details</h1>
    <div className="p-4">
      <form id="dowRecp" onSubmit={onSubmit} autoComplete="off">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="w-full">
            <Fields
              required={true}
              title="Full Name"
              type="textField"
              autoComplete="Name"
              name="family_full_name"
              value={donor.family_full_name}
              onChange={onInputChange}
            />
          </div>
          <div className="w-full">
            <Fields
              title="Relation"
              type="textField"
              autoComplete="Name"
              name="family_relation"
              value={donor.family_relation}
              onChange={onInputChange}
            />
          </div>
          <div className="flex ">
            <div className="w-auto flex justify-center mr-3">
              <button
                className={inputClass}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            <div className="w-auto flex justify-center">
              <button type="button" className={inputClassBack} onClick={onBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default FamilyMemberForm;
