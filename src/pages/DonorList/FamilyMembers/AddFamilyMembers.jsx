import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import FamilyMemberForm from "@/modules/DonorList/components/FamilyMemberForm";
import { useCreateFamilyMember } from "@/modules/DonorList/hooks/useDonorList";

function AddFamilyMembers() {
  const navigate = useNavigate();
  const donorid = localStorage.getItem("donor_fts_id");
  const [donor, setDonor] = useState({
    family_full_name: "",
    donor_fts_id: "",
    family_relation: "",
  });

  const { mutate: createFamilyMember, isPending } = useCreateFamilyMember({
    onSuccess: () => {
      toast.success("Family Member Created Sucessfully");
      const encryptedId = encryptId(donorid);
      navigate(`/create-family/${encodeURIComponent(encryptedId)}`);
    },
    onError: () => {
      toast.error("Duplicate Entry");
    },
  });

  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createFamilyMember({
      donorId: donorid,
      familyFullName: donor.family_full_name,
      familyRelation: donor.family_relation,
    });
  };

  return (
    <Layout>
      <FamilyMemberForm
        donor={donor}
        isSubmitting={isPending}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onBack={() => navigate(`/create-family/${donorid}`)}
      />
    </Layout>
  );
}

export default AddFamilyMembers;
