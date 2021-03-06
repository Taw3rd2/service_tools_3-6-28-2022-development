import React, { useState, lazy, Suspense } from "react";

import { Grid } from "@mui/material";

import CustomerInformation from "../../components/customer_information/CustomerInformation.component";
import CustomerNotes from "../../components/customer_notes/CustomerNotes.component";
import CustomerSearch from "../../components/customer_search/CustomerSearch.component";
import DailyTasks from "../../components/daily_tasks/DailyTasks.component";
import NavigationButtons from "../../components/navigation_buttons/NavigationButtons.component";
import Spinner from "../../components/spinner/Spinner";

const AddCustomerModal = lazy(() =>
  import("../../components/customer_search/AddCustomer.modal")
);
const EditCustomerInfoModal = lazy(() =>
  import(
    "../../components/customer_information/modals/customer/EditCustomerInfo.modal"
  )
);
const EditBillingModal = lazy(() =>
  import(
    "../../components/customer_information/modals/customer/EditCustomerBilling.modal"
  )
);
const DeleteCustomerModal = lazy(() =>
  import(
    "../../components/customer_information/modals/customer/DeleteCustomer.modal"
  )
);
const EquipmentListModal = lazy(() =>
  import(
    "../../components/customer_information/modals/equipment/EquipmentList.modal"
  )
);
const EditCustomerEquipmentModal = lazy(() =>
  import(
    "../../components/customer_information/modals/equipment/EditCustomerEquipment.modal"
  )
);
const CreateCustomerEquipmentModal = lazy(() =>
  import(
    "../../components/customer_information/modals/equipment/CreateCustomerEquipment.modal"
  )
);
const DeleteCustomersEquipmentModal = lazy(() =>
  import(
    "../../components/customer_information/modals/equipment/DeleteEquipment.modal"
  )
);
const CustomerNoteModal = lazy(() =>
  import("../../components/customer_notes/modals/CustomerNote.modal")
);
const CreateDispatchModal = lazy(() =>
  import(
    "../../components/navigation_buttons/create_new_dispatch/CreateDispatch.modal"
  )
);
const DispatchHistoryModal = lazy(() =>
  import(
    "../../components/navigation_buttons/dispatch_history/DispatchHistory.modal"
  )
);
const WarrantyListModal = lazy(() =>
  import("../../components/warranty_manager/WarrantyList.modal")
);
const WarrantyModal = lazy(() =>
  import("../../components/warranty_manager/Warranty.modal")
);
const CreateWarrantyModal = lazy(() =>
  import("../../components/warranty_manager/CreateWarranty.modal")
);
const DeleteWarrantyModal = lazy(() =>
  import("../../components/warranty_manager/DeleteWarranty.modal")
);
const MaintenanceListModal = lazy(() =>
  import("../../components/maintenance_manager/MaintenanceList.modal")
);
const CreateMaintenanceModal = lazy(() =>
  import("../../components/maintenance_manager/CreateMaintnenance.modal")
);
const MaintenanceDetailsModal = lazy(() =>
  import("../../components/maintenance_manager/MaintenanceDetails.modal")
);
const DeleteMaintenanceModal = lazy(() =>
  import("../../components/maintenance_manager/DeleteMaintenance.modal")
);

const HomePage = () => {
  //CustomerSearch
  const [customer, setCustomer] = useState({ id: "" });
  const handleCustomerSelected = (customer) => {
    setCustomer(customer);
  };

  const [currentCustomer, setCurrentCustomer] = useState({});
  const getCurrentCustomer = (currentCustomerData) => {
    setCurrentCustomer(currentCustomerData);
  };

  //Add Customer Modal
  const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const openAddCustomerModal = () => {
    setAddCustomerModalOpen(true);
  };
  const closeAddCustomerModal = () => {
    setAddCustomerModalOpen(false);
  };

  //Edit Customer Modal
  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const openEditCustomerModal = () => {
    setEditCustomerModalOpen(true);
  };
  const closeEditCustomerModal = () => {
    setEditCustomerModalOpen(false);
  };

  //Edit Customer Billing Modal
  const [isEditBillingModalOpen, setEditBillingModalOpen] = useState(false);
  const openEditBillingModal = () => {
    setEditBillingModalOpen(true);
  };
  const closeEditBillingModal = () => {
    setEditBillingModalOpen(false);
  };

  //Delete Customer Confirmation Modal
  const [isDeleteCustomerModalOpen, setDeleteCustomerModalOpen] =
    useState(false);
  const openDeleteCustomerModal = () => {
    setDeleteCustomerModalOpen(true);
  };
  const closeDeleteCustomerModal = () => {
    setDeleteCustomerModalOpen(false);
  };

  //Customers Equipment List Modal
  const [isEquipmentListModalOpen, setEquipmentListModalOpen] = useState(false);
  const openEquipmentListModal = () => {
    setEquipmentListModalOpen(true);
  };
  const closeEquipmentListModal = () => {
    setEquipmentListModalOpen(false);
  };

  //Edit Customers Equipment Modal
  const [isEditCustomerEquipmentOpen, setEditCustomerEquipmentOpen] =
    useState(false);
  const [equipmentSelected, setEquipmentSelected] = useState({});
  const openEditCustomerEquipmentModal = (equipmentDetails) => {
    setEquipmentSelected(equipmentDetails);
    setEditCustomerEquipmentOpen(true);
  };
  const closeEditCustomerEquipmentModal = () => {
    setEquipmentSelected({});
    setEditCustomerEquipmentOpen(false);
  };

  //Create Customers Equipment Modal
  const [
    isCreateCustomerEquipmentModalOpen,
    setCreateCustomerEquipmentModalOpen,
  ] = useState(false);
  const openCreateCustomerEquipmentModal = () => {
    setCreateCustomerEquipmentModalOpen(true);
  };
  const closeCreateCustomerEquipmentModal = () => {
    setCreateCustomerEquipmentModalOpen(false);
  };

  //Delete Customers Equipment Confirmation Modal
  const [
    isDeleteCustomerEquipmentModalOpen,
    setDeleteCustomerEquipmentModalOpen,
  ] = useState(false);
  const openDeleteCustomerEquipmentModal = () => {
    setDeleteCustomerEquipmentModalOpen(true);
  };
  const closeDeleteCustomerEquipmentModal = () => {
    setDeleteCustomerEquipmentModalOpen(false);
  };

  //Add New Customer Note
  const [isCustomerNoteModalOpen, setCustomerNoteModalOpen] = useState(false);
  const [note, setNote] = useState({});
  const openCustomerNoteModal = (note) => {
    setNote(note);
    setCustomerNoteModalOpen(true);
  };
  const closeCustomerNoteModal = () => {
    setCustomerNoteModalOpen(false);
  };

  //Create Disptch
  const [isCreateDispatchModalOpen, setCreateDispatchmodalOpen] =
    useState(false);
  const openCreateDispatchModal = () => {
    setCreateDispatchmodalOpen(true);
  };
  const closeCreateDispatchModal = () => {
    setCreateDispatchmodalOpen(false);
  };

  //Dispatch History
  const [isDispatchHistoryModalOpen, setDispatchHistoryModalOpen] =
    useState(false);
  const openDispatchHistoryModal = () => {
    setDispatchHistoryModalOpen(true);
  };
  const closeDispatchHistoryModal = () => {
    setDispatchHistoryModalOpen(false);
  };

  //Warranty Manager
  const [isWarrantyListModalOpen, setWarrantyListModalOpen] = useState(false);
  const openWarrantyListModal = () => {
    setWarrantyListModalOpen(true);
  };
  const closeWarrantyListModal = () => {
    setWarrantyListModalOpen(false);
  };

  const [isWarrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const [warrantySelected, setWarrantySelected] = useState({});
  const openWarrantyModal = (warr) => {
    setWarrantySelected(warr);
    setWarrantyModalOpen(true);
  };
  const closeWarrantyModal = () => {
    setWarrantyModalOpen(false);
  };

  const [isCreateWarrantyModalOpen, setCreateWarrantyModalOpen] =
    useState(false);
  const openCreateWarrantyModal = () => {
    setCreateWarrantyModalOpen(true);
  };
  const closeCreateWarrantyModal = () => {
    setCreateWarrantyModalOpen(false);
  };

  const [isDeleteWarrantyModalOpen, setDeleteWarrantyModalOpen] =
    useState(false);
  const openDeleteWarrantyModal = () => {
    setDeleteWarrantyModalOpen(true);
  };
  const closeDeleteWarrantyModal = () => {
    setDeleteWarrantyModalOpen(false);
  };

  //Maintenance Manager
  const [isMaintenanceListModalOpen, setMaintenanceListModalOpen] =
    useState(false);
  const openMaintenanceListModal = () => {
    setMaintenanceListModalOpen(true);
  };
  const closeMaintenanceListModal = () => {
    setMaintenanceListModalOpen(false);
  };
  const [isMaintenanceDetailsModalOpen, setMaintenanceDetailsModalOpen] =
    useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState({});
  const openMaintenanceDetailsModal = (maint) => {
    setSelectedMaintenance(maint);
    setMaintenanceDetailsModalOpen(true);
  };
  const closeMaintenanceDetailsModal = () => {
    setMaintenanceDetailsModalOpen(false);
  };
  const [isCreateMaintenanceModalOpen, setCreateMaintenanceModalOpen] =
    useState(false);
  const openCreateMaintenanceModal = () => {
    setCreateMaintenanceModalOpen(true);
  };
  const closeCreateMaintenanceModal = () => {
    setCreateMaintenanceModalOpen(false);
  };
  const [isDeleteMaintenanceModalOpen, setDeleteMaintenanceModalOpen] =
    useState(false);
  const openDeleteMaintenanceModal = () => {
    setDeleteMaintenanceModalOpen(true);
  };
  const closeDeleteMaintenanceModal = () => {
    setDeleteMaintenanceModalOpen(false);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ marginTop: "4px" }}>
          <CustomerSearch
            handleCustomerSelected={handleCustomerSelected}
            openAddCustomerModal={openAddCustomerModal}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "4px" }}>
          <CustomerInformation
            customer={customer}
            openEditCustomerModal={openEditCustomerModal}
            openEquipmentListModal={openEquipmentListModal}
            openEditBillingModal={openEditBillingModal}
            getCurrentCustomer={getCurrentCustomer}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "4px" }}>
          <NavigationButtons
            openCreateDispatchModal={openCreateDispatchModal}
            openDispatchHistoryModal={openDispatchHistoryModal}
            openMaintenanceListModal={openMaintenanceListModal}
            openWarrantyListModal={openWarrantyListModal}
            customer={customer}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ marginTop: "4px" }}>
          <DailyTasks />
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "4px" }}>
          <CustomerNotes
            customer={customer}
            openCustomerNoteModal={openCustomerNoteModal}
          />
        </Grid>
      </Grid>
      {isAddCustomerModalOpen && (
        <Suspense fallback={<Spinner />}>
          <AddCustomerModal
            isAddCustomerModalOpen={isAddCustomerModalOpen}
            closeAddCustomerModal={closeAddCustomerModal}
          />
        </Suspense>
      )}
      {isEditCustomerModalOpen && (
        <Suspense fallback={<Spinner />}>
          <EditCustomerInfoModal
            customer={currentCustomer}
            isEditCustomerModalOpen={isEditCustomerModalOpen}
            closeEditCustomerModal={closeEditCustomerModal}
            openDeleteCustomerModal={openDeleteCustomerModal}
          />
        </Suspense>
      )}
      {isEditBillingModalOpen && (
        <Suspense fallback={<Spinner />}>
          <EditBillingModal
            customer={currentCustomer}
            isEditBillingModalOpen={isEditBillingModalOpen}
            closeEditBillingModal={closeEditBillingModal}
          />
        </Suspense>
      )}
      {isDeleteCustomerModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteCustomerModal
            isDeleteCustomerModalOpen={isDeleteCustomerModalOpen}
            closeEditCustomerModal={closeEditCustomerModal}
            closeDeleteCustomerModal={closeDeleteCustomerModal}
            setCustomer={setCustomer}
            customer={customer}
          />
        </Suspense>
      )}
      {isEquipmentListModalOpen && (
        <Suspense fallback={<Spinner />}>
          <EquipmentListModal
            customer={customer}
            isEquipmentListModalOpen={isEquipmentListModalOpen}
            closeEquipmentListModal={closeEquipmentListModal}
            openCreateCustomerEquipmentModal={openCreateCustomerEquipmentModal}
            openEditCustomerEquipmentModal={openEditCustomerEquipmentModal}
          />
        </Suspense>
      )}
      {isEditCustomerEquipmentOpen && (
        <Suspense fallback={<Spinner />}>
          <EditCustomerEquipmentModal
            isEditCustomerEquipmentOpen={isEditCustomerEquipmentOpen}
            closeEditCustomerEquipmentModal={closeEditCustomerEquipmentModal}
            openDeleteEquipmentModal={openDeleteCustomerEquipmentModal}
            equipmentSelected={equipmentSelected}
          />
        </Suspense>
      )}
      {isCreateCustomerEquipmentModalOpen && (
        <Suspense fallback={<Spinner />}>
          <CreateCustomerEquipmentModal
            isCreateCustomerEquipmentModalOpen={
              isCreateCustomerEquipmentModalOpen
            }
            closeCreateCustomerEquipmentModal={
              closeCreateCustomerEquipmentModal
            }
            customer={customer}
          />
        </Suspense>
      )}
      {isDeleteCustomerEquipmentModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteCustomersEquipmentModal
            isDeleteCustomerEquipmentModalOpen={
              isDeleteCustomerEquipmentModalOpen
            }
            closeDeleteEquipmentModal={closeDeleteCustomerEquipmentModal}
            closeEditCustomerEquipmentModal={closeEditCustomerEquipmentModal}
            equipmentSelected={equipmentSelected}
          />
        </Suspense>
      )}
      {isCustomerNoteModalOpen && (
        <Suspense fallback={<Spinner />}>
          <CustomerNoteModal
            isCustomerNoteModalOpen={isCustomerNoteModalOpen}
            closeCustomerNoteModal={closeCustomerNoteModal}
            customer={customer}
            note={note}
          />
        </Suspense>
      )}
      {isCreateDispatchModalOpen && (
        <Suspense fallback={<Spinner />}>
          <CreateDispatchModal
            isCreateDispatchModalOpen={isCreateDispatchModalOpen}
            closeCreateDispatchModal={closeCreateDispatchModal}
            customer={customer}
          />
        </Suspense>
      )}
      {isDispatchHistoryModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DispatchHistoryModal
            isDispatchHistoryModalOpen={isDispatchHistoryModalOpen}
            closeDispatchHistoryModal={closeDispatchHistoryModal}
            customer={customer}
          />
        </Suspense>
      )}
      {isWarrantyListModalOpen && (
        <Suspense fallback={<Spinner />}>
          <WarrantyListModal
            isWarrantyListModalOpen={isWarrantyListModalOpen}
            closeWarrantyListModal={closeWarrantyListModal}
            openWarrantyModal={openWarrantyModal}
            openCreateWarrantyModal={openCreateWarrantyModal}
            customer={customer}
          />
        </Suspense>
      )}
      {isWarrantyModalOpen && (
        <Suspense fallback={<Spinner />}>
          <WarrantyModal
            isWarrantyModalOpen={isWarrantyModalOpen}
            closeWarrantyModal={closeWarrantyModal}
            openDeleteWarrantyModal={openDeleteWarrantyModal}
            customer={customer}
            warrantySelected={warrantySelected}
          />
        </Suspense>
      )}
      {isCreateWarrantyModalOpen && (
        <Suspense fallback={<Spinner />}>
          <CreateWarrantyModal
            isCreateWarrantyModalOpen={isCreateWarrantyModalOpen}
            closeCreateWarrantyModal={closeCreateWarrantyModal}
            customer={customer}
          />
        </Suspense>
      )}
      {isDeleteWarrantyModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteWarrantyModal
            isDeleteWarrantyModalOpen={isDeleteWarrantyModalOpen}
            closeDeleteWarrantyModal={closeDeleteWarrantyModal}
            closeWarrantyModal={closeWarrantyModal}
            customer={customer}
            warrantySelected={warrantySelected}
          />
        </Suspense>
      )}
      {isMaintenanceListModalOpen && (
        <Suspense fallback={<Spinner />}>
          <MaintenanceListModal
            isMaintenanceListModalOpen={isMaintenanceListModalOpen}
            closeMaintenanceListModal={closeMaintenanceListModal}
            openCreateMaintenanceModal={openCreateMaintenanceModal}
            openMaintenanceDetailsModal={openMaintenanceDetailsModal}
            customer={customer}
          />
        </Suspense>
      )}
      {isCreateMaintenanceModalOpen && (
        <Suspense fallback={<Spinner />}>
          <CreateMaintenanceModal
            isCreateMaintenanceModalOpen={isCreateMaintenanceModalOpen}
            closeCreateMaintenanceModal={closeCreateMaintenanceModal}
            customer={customer}
          />
        </Suspense>
      )}
      {isDeleteMaintenanceModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteMaintenanceModal
            isDeleteMaintenanceModalOpen={isDeleteMaintenanceModalOpen}
            closeDeleteMaintenanceModal={closeDeleteMaintenanceModal}
            closeMaintenanceDetailsModal={closeMaintenanceDetailsModal}
            selectedMaintenance={selectedMaintenance}
            customer={customer}
          />
        </Suspense>
      )}
      {isMaintenanceDetailsModalOpen && (
        <Suspense fallback={<Spinner />}>
          <MaintenanceDetailsModal
            isMaintenanceDetailsModalOpen={isMaintenanceDetailsModalOpen}
            closeMaintenanceDetailsModal={closeMaintenanceDetailsModal}
            openDeleteMaintenanceModal={openDeleteMaintenanceModal}
            selectedMaintenance={selectedMaintenance}
            customer={customer}
          />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
