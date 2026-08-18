import Layout from "@/layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import CommonListing from "@/pages/DonorList/CommonListing.jsx";
import { Spinner } from "@material-tailwind/react";
import {
  AddDonor,
  AddMaterialReceipt,
  CashReceiptDonor,
  EditDonor,
  FamilyMemberDonor,
  MaterialReceiptDonor,
  ViewDonor,
} from "@/components/ButtonComponents.jsx";
import { inputClass } from "@/components/common/Buttoncss.jsx";
import { encryptId } from "@/components/common/EncryptDecrypt.jsx";
import { useDonorList } from "@/modules/DonorList/hooks/useDonorList";

const DonorList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDonorList();
  const columns = [
    {
      name: "donor_fts_id",
      label: "PDS ID",
      options: {
        filter: false,
        print: false,
        download: false,
        display: "included",
        sort: false,
      },
    },
    {
      name: "donor_full_name",
      label: " Name ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "donor_mobile",
      label: " Mobile ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "donor_email",
      label: " Email ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <ViewDonor
                // onClick={() => navigate(`/viewdonor-list/${id}`)}
                onClick={() => {
                  const encryptedId = encryptId(id); // Encrypt the ID
                  navigate(
                    `/viewdonor-list/${encodeURIComponent(encryptedId)}`,
                  );
                }}
                className="h-5 w-5 cursor-pointer text-blue-500 "
              />

              <EditDonor
                // onClick={() => navigate(`/edit-donor/${id}`)}
                onClick={() => {
                  const encryptedId = encryptId(id); // Encrypt the ID
                  navigate(`/edit-donor/${encodeURIComponent(encryptedId)}`);
                }}
                className="h-5 w-5 cursor-pointer text-blue-500 "
              />

              <CashReceiptDonor
                // onClick={() => navigate(`/createrecepit-donor/${id}`)}
                onClick={() => {
                  const encryptedId = encryptId(id); // Encrypt the ID
                  navigate(
                    `/createrecepit-donor/${encodeURIComponent(encryptedId)}`,
                  );
                }}
                className="h-5 w-5 cursor-pointer text-blue-500 mr-2"
              />

              <MaterialReceiptDonor
                // onClick={() => navigate(`/create-donor/${id}`)}
                onClick={() => {
                  const encryptedId = encryptId(id); // Encrypt the ID
                  navigate(`/create-donor/${encodeURIComponent(encryptedId)}`);
                }}
                className="h-5 w-5 cursor-pointer text-blue-500 mr-2"
              />

              <FamilyMemberDonor
                // onClick={() => navigate(`/create-family/${id}`)}
                onClick={() => {
                  const encryptedId = encryptId(id); // Encrypt the ID
                  navigate(`/create-family/${encodeURIComponent(encryptedId)}`);
                }}
                className="h-5 w-5 cursor-pointer text-blue-500 mr-2"
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    filter: false,
    customToolbar: () => {
      return (
        <>
          <AddMaterialReceipt
            onClick={() => navigate("/materialrecepitall")}
            className={inputClass}
          />
          <AddDonor
            onClick={() => navigate("/add-donor")}
            className={inputClass}
          />
        </>
      );
    },
  };

  return (
    <Layout>
      <CommonListing />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold"> Donor List</span>
              </div>
            }
            data={data || []}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default DonorList;
