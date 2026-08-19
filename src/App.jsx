import { Route, Routes } from "react-router-dom";
import ForgetPassword from "@/modules/Auth/pages/ForgetPassword";
import SignIn from "@/modules/Auth/pages/SignIn";
import SIgnUp from "@/modules/Auth/pages/SIgnUp";
import Home from "@/pages/dashboard/Home.jsx";
import Maintenance from "@/pages/maintenance/Maintenance.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditMaterial from "@/pages/Recepits/MaterialRecepits/EditMaterial.jsx";
import DisableRightClick from "@/components/common/DisableRightClick.jsx";
import Animal from "@/pages/AnimalStock/Animal/Animal.jsx";
import CreateAnimal from "@/pages/AnimalStock/Animal/CreateAnimal.jsx";
import EditAnimal from "@/pages/AnimalStock/Animal/EditAnimal.jsx";
import AnimalBornArrival from "@/pages/AnimalStock/AnimalBornArrival/AnimalBornArrival.jsx";
import CreateBornArrival from "@/pages/AnimalStock/AnimalBornArrival/CreateBornArrival.jsx";
import AnimalDead from "@/pages/AnimalStock/AnimalDead/AnimalDead.jsx";
import CreateAnimalDead from "@/pages/AnimalStock/AnimalDead/CreateAnimalDead.jsx";
import AnimalMeat from "@/pages/AnimalStock/AnimalMeat/AnimalMeat.jsx";
import CreateAnimalMeat from "@/pages/AnimalStock/AnimalMeat/CreateAnimalMeat.jsx";
import EditAnimalMeat from "@/pages/AnimalStock/AnimalMeat/EditAnimalMeat.jsx";
import AnimalStocks from "@/pages/AnimalStock/AnimalStocks/AnimalStocks.jsx";
import AnimalStocksView from "@/pages/AnimalStock/AnimalStocks/AnimalStocksView.jsx";
import AddDonorList from "@/pages/DonorList/AddDonorList.jsx";
import CashRecepitAll from "@/pages/DonorList/CashRecepitAll.jsx";
import CreateDonorRecepit from "@/pages/DonorList/CreateDonorCashRecepit.jsx";
import CreateDonor from "@/pages/DonorList/CreateDonorMaterialRecepit.jsx";
import DonorList from "@/pages/DonorList/DonorList.jsx";
import DonorReceiptsDetails from "@/pages/DonorList/DonorReceiptsDetails.jsx";
import ConvertDuplicate from "@/pages/DonorList/Duplicate/ConvertDuplicate.jsx";
import DuplicateDonorList from "@/pages/DonorList/Duplicate/DuplicateDonorList.jsx";
import EditDuplicate from "@/pages/DonorList/Duplicate/EditDuplicate.jsx";
import FamilyDonorDuplicate from "@/pages/DonorList/Duplicate/FamilyDonorDuplicate.jsx";
import EditDonorList from "@/pages/DonorList/EditDonorList.jsx";
import AddFamilyMembers from "@/pages/DonorList/FamilyMembers/AddFamilyMembers.jsx";
import FamilyList from "@/pages/DonorList/FamilyMembers/FamilyList.jsx";
import MaterialRecepitAll from "@/pages/DonorList/MaterialRecepitAll.jsx";
import ViewDonorDetails from "@/pages/DonorList/ViewDonorDetails.jsx";
import DowloadConsumption from "@/pages/Dowloads/Consumption/DowloadConsumption.jsx";
import Cash from "@/pages/Dowloads/Delivery/Cash.jsx";
import Donor from "@/pages/Dowloads/Donor/Donor.jsx";
import Exam from "@/pages/Dowloads/MaterialReceipts/MaterialReceipts.jsx";
import Students from "@/pages/Dowloads/Purchase/CashPurchase.jsx";
import DownloadWebDonation from "@/pages/Dowloads/WebDonation/DownloadWebDonation.jsx";
import EnquiryDownload from "@/pages/download/EnquiryDownload.jsx";
import AddEnquiry from "@/pages/Master/ListItem/AddItem.jsx";
import EditList from "@/pages/Master/ListItem/EditList.jsx";
import OpenListEnquiry from "@/pages/Master/ListItem/List Item.jsx";
import AddOccasion from "@/pages/Master/Occasion/Addoccasion.jsx";
import EditOccasion from "@/pages/Master/Occasion/Editoccasion.jsx";
import ListOccasion from "@/pages/Master/Occasion/Listoccasion.jsx";
import AddVendors from "@/pages/Master/Vendors List/AddVendors.jsx";
import EditVendors from "@/pages/Master/Vendors List/EditVendors.jsx";
import VendorList from "@/pages/Master/Vendors List/VendorList.jsx";
import RecepitCashRecepit from "@/pages/Recepits/CashRecepits/CashRecepit.jsx";
import EditRecepit from "@/pages/Recepits/CashRecepits/EditRecepits.jsx";
import ViewCashRecepit from "@/pages/Recepits/CashRecepits/ViewRecepit.jsx";
import MaterialRecepits from "@/pages/Recepits/MaterialRecepits/MaterialRecepits.jsx";
import ViewMaterial from "@/pages/Recepits/MaterialRecepits/ViewMaterial.jsx";
import DonationSummary from "@/pages/Reports/DonationSummary/DonationSummary.jsx";
import DonationSummaryView from "@/pages/Reports/DonationSummary/DonationSummaryView.jsx";
import PendingListTask from "@/pages/Reports/StockReport.jsx";
import ViewStockSummary from "@/pages/Reports/ViewStockSummary.jsx";
import AddConsumption from "@/pages/Stock/Consumption/Addconsumption.jsx";
import Consumption from "@/pages/Stock/Consumption/consumption.jsx";
import EditConsumption from "@/pages/Stock/Consumption/EditConsumption.jsx";
import AddPurchase from "@/pages/Stock/Purchase/AddPurchase.jsx";
import EditPurchase from "@/pages/Stock/Purchase/EditPurchase.jsx";
import PurchaseList from "@/pages/Stock/Purchase/PurchaseList.jsx";
import Stock from "@/pages/Stock/StockList/StockList.jsx";
import CreateButton from "@/pages/userManagement/CreateButton.jsx";
import TabIndex from "@/pages/userManagement/TabIndex.jsx";
import WebDonation from "@/pages/WebDonation/WebDonation.jsx";
import { ThemeProvider } from "next-themes";
const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <>
          {/* <DisableRightClick /> */}
          <ToastContainer />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SIgnUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* <Route path="/enquiry-now" element={<EnquiryNow />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/donor-list" element={<DonorList />} />
          <Route path="/add-donor/:id?" element={<AddDonorList />} />
          <Route path="/edit-donor/:id" element={<EditDonorList />} />
          <Route path="/create-donor/:id" element={<CreateDonor />} />
          <Route path="/create-family/:id" element={<FamilyList />} />
          <Route path="/add-family" element={<AddFamilyMembers />} />
          <Route path="/duplicate" element={<DuplicateDonorList />} />
          <Route path="/edit-duplicate/:id" element={<EditDuplicate />} />
          <Route
            path="/zero-duplicate/:id"
            element={<FamilyDonorDuplicate />}
          />
          <Route path="/no-duplicate/:id" element={<ConvertDuplicate />} />
          <Route
            path="/createrecepit-donor/:id?"
            element={<CreateDonorRecepit />}
          />
          <Route path="/cashrecepitall/:id?" element={<CashRecepitAll />} />
          <Route path="/materialrecepitall" element={<MaterialRecepitAll />} />
          <Route path="/viewdonor-list/:id" element={<ViewDonorDetails />} />
          <Route
            path="/recepitdonor-list/:id"
            element={<DonorReceiptsDetails />}
          />
          {/* MASTER  */}
          <Route path="/master-list" element={<OpenListEnquiry />} />
          <Route path="/add-enquiry" element={<AddEnquiry />} />
          <Route path="/edit-enquiry/:id" element={<EditList />} />
          <Route path="/occasion" element={<ListOccasion />} />
          <Route path="/add-occasion" element={<AddOccasion />} />
          <Route path="/edit-occasion/:id" element={<EditOccasion />} />
          <Route path="/addVendor" element={<AddVendors />} />
          <Route path="/purchase" element={<PurchaseList />} />
          <Route path="/consumption" element={<Consumption />} />
          <Route path="/cashrecepit" element={<RecepitCashRecepit />} />
          <Route path="recepit-material" element={<MaterialRecepits />} />
          {/* Reports  */}
          <Route path="/stock-summary" element={<PendingListTask />} />
          <Route path="/d-summary" element={<DonationSummary />} />
          <Route path="/d-summary-view" element={<DonationSummaryView />} />
          <Route path="/view-stock" element={<ViewStockSummary />} />
          <Route path="/download-enquiry" element={<EnquiryDownload />} />
          <Route path="/donor" element={<Donor />} />
          <Route path="/cashpurchase" element={<Students />} />
          <Route path="/cash" element={<Cash />} />
          <Route path="/M-recepit" element={<Exam />} />
          <Route path="/D-consumption" element={<DowloadConsumption />} />
          <Route path="/VendorList" element={<VendorList />} />
          <Route path="/EditVendors/:id" element={<EditVendors />} />
          <Route path="/add-purchase" element={<AddPurchase />} />
          <Route path="/edit-purchase/:id" element={<EditPurchase />} />
          <Route path="/add-consumption" element={<AddConsumption />} />
          <Route path="/edit-consumption/:id" element={<EditConsumption />} />
          {/* //STOCK */}
          <Route path="/stock" element={<Stock />} />
          <Route path="/recepit-edit/:id" element={<EditRecepit />} />
          <Route path="/recepit-view/:id" element={<ViewCashRecepit />} />
          {/* //MATERIAL Recepits */}
          <Route path="/material-edit/:id" element={<EditMaterial />} />
          <Route path="/material-view/:id" element={<ViewMaterial />} />
          {/* //DOWLOAD */}
          <Route path="/web-donation" element={<DownloadWebDonation />} />
          <Route path="/webdonation" element={<WebDonation />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/userManagement" element={<TabIndex />} />
          <Route path="/create-createMTest" element={<CreateButton />} />
          {/* ///animal stock */}

          <Route path="/animalStock" element={<Animal />} />
          <Route path="/add-animal" element={<CreateAnimal />} />
          <Route path="/edit-animal/:id" element={<EditAnimal />} />
          {/* //animal meet */}
          <Route path="/animal-meet" element={<AnimalMeat />} />
          <Route path="/add-animal-meet" element={<CreateAnimalMeat />} />
          <Route path="/edit-animal-meet/:id" element={<EditAnimalMeat />} />
          {/* //animal born/arrival meet */}
          <Route path="/animal-born-arrival" element={<AnimalBornArrival />} />
          <Route path="/add-born-arrival" element={<CreateBornArrival />} />
          {/* //animal dead */}
          <Route path="/animal-dead" element={<AnimalDead />} />
          <Route path="/add-animal-dead" element={<CreateAnimalDead />} />
          {/* //animal stocks */}
          <Route path="/animal-stock" element={<AnimalStocks />} />
          <Route path="/animal-stock-view" element={<AnimalStocksView />} />
        </Routes>
      </>
    </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
