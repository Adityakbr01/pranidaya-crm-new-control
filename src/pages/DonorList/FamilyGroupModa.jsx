import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import { fetchDonorList, updateDonorById } from "@/modules/DonorList/api/donor";

const FamilyGroupModal = ({ showModal, closeModal, id }) => {
  const [loader, setLoader] = useState(true);
  const [donorData, setDonorData] = useState([]);

  useEffect(() => {
    if (showModal) {
      getData();
    }
  }, [showModal]);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await fetchDonorList();
      const tempRows = response.map((donor) => [
        donor["donor_full_name"],
        donor["donor_mobile"],
        donor["donor_related_id"],
      ]);
      setDonorData(tempRows);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoader(false);
    }
  };

  const addMemberToGroup = async (relative_id) => {
    const data = {
      donor_related_id: relative_id,
    };

    try {
      await updateDonorById({ id, data });
      toast.success("Data successfully added to group");
      closeModal();
    } catch (err) {
      toast.error("Error adding member to group, please try again.");
    }
  };

  const columns = [
    "Name",
    "Phone",
    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <Button onClick={() => addMemberToGroup(value)}>Add</Button>
        ),
      },
    },
  ];

  const options = {
    filterType: "textField",
    print: false,
    viewColumns: false,
    filter: false,
    searchOpen: false,
    download: false,
    selectableRows: false,
    responsive: "standard",
    search: false,
  };

  return (
    <Dialog
      open={showModal}
      handler={closeModal}
      fullWidth={true}
      maxWidth="md"
      className="bg-white rounded-lg shadow-md"
    >
      <DialogHeader className="text-xl font-semibold text-gray-800">
        Family Group Actions
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Choose a member to add to the family group:
          </p>

          {loader ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : (
            <div className="responsive-table">
              <MUIDataTable
                data={donorData}
                columns={columns}
                options={options}
              />
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-end gap-4">
        <Button color="gray" variant="text" onClick={closeModal}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FamilyGroupModal;
