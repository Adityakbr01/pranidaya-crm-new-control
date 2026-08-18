import React, { useEffect } from "react";
import Layout from "@/layout/Layout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { AddFamilyMember } from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { decryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useFamilyMembersById } from "@/modules/DonorList/hooks/useDonorList";
import { Spinner } from "@material-tailwind/react";

const FamilyList = () => {
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (decryptedId) {
      localStorage.setItem("donor_fts_id", decryptedId);
    }
  }, [decryptedId]);

  const { data: familyList = [], isLoading } = useFamilyMembersById(decryptedId);

  const columns = [
    {
      name: "family_full_name",
      label: "Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "family_relation",
      label: "Relation",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "family_status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    filter: false,
    customToolbar: () => (
      <AddFamilyMember
        onClick={() => navigate("/add-family")}
        className={inputClass}
      />
    ),
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Family Member List</span>
              </div>
            }
            data={familyList}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default FamilyList;
