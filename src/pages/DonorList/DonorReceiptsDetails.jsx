import Layout from "@/layout/Layout.jsx";
import { Spinner } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { fetchDonorReceiptsByIdNew } from "@/modules/DonorList/api/donor";

function DonorReceiptsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState([]);
  const [famgroup, setFamgroup] = useState([]);
  const [membership, setMembership] = useState([]);
  const [loader, setLoader] = useState(true);

  // DATA FOR THE TABLE DONATION DETAILS
  useEffect(() => {
    const fetchRecepitData = async () => {
      try {
        const resData = await fetchDonorReceiptsByIdNew(id);

        setDonation(resData.donor_receipts || []);
        setFamgroup(resData.related_group || []);
        setMembership(resData.membership_details || []);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      } finally {
        setLoader(false);
      }
    };

    if (id) {
      fetchRecepitData();
    }
  }, [id]);

  // DATA FOR THE TABLE MEMEBER DETAILS

  return (
    <Layout>
      <div className="p-6 mt-5 bg-white shadow-md rounded-lg  min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-2 bg-white rounded-lg">
          <div className="flex flex-row justify-start p-2">
            <h1 className="text-xl md:text-2xl text-[#464D69] font-semibold ml-2">
              Receipts Details
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="text-gray-700">
              <strong>Family Group of:{famgroup[0]?.donor_full_name}</strong>
            </div>{" "}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="p-4 w-full overflow-x-auto">
            {loader ? (
              <div className="flex justify-center items-center h-64">
                <Spinner className="h-12 w-12" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-[10px] text-sm">
                  <thead>
                    <tr className="bg-gray-300">
                      <th className="border p-2">R.No</th>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Date</th>
                      <th className="border p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donation.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="border-2 p-2 text-center text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    ) : (
                      donation.map((stockItem, index) => (
                        <tr key={index} className="border-2 text-center">
                          <td className="border-2 p-2">
                            {stockItem.c_receipt_no}
                          </td>
                          <td className="border-2 p-2 text-center">
                            {stockItem.donor_full_name}
                          </td>
                          <td className="border-2 p-2 text-center">
                            {moment(stockItem.c_receipt_date).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td className="border-2 p-2 text-center">
                            {stockItem.c_receipt_total_amount}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DonorReceiptsDetails;
