import React from "react";

import ActiveButtons from "./ActiveButtons.component";
import InactiveButtons from "./InactiveButtons.component";

const NavigationButtons = ({
  customer,
  openCreateDispatchModal,
  openDispatchHistoryModal,
  openPartsQuotesModal,
  openEquipmentQuotesModal,
  openMaintenanceListModal,
  openWarrantyListModal,
}) => {
  if (customer === null || customer.id === "") {
    return <InactiveButtons />;
  } else {
    return (
      <ActiveButtons
        customer={customer}
        openCreateDispatchModal={openCreateDispatchModal}
        openDispatchHistoryModal={openDispatchHistoryModal}
        openPartsQuotesModal={openPartsQuotesModal}
        openEquipmentQuotesModal={openEquipmentQuotesModal}
        openWarrantyListModal={openWarrantyListModal}
        openMaintenanceListModal={openMaintenanceListModal}
      />
    );
  }
};

export default NavigationButtons;
