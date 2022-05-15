import React from "react";

import ActiveButtons from "./ActiveButtons.component";
import InactiveButtons from "./InactiveButtons.component";

const NavigationButtons = ({
  customer,
  openCreateDispatchModal,
  openDispatchListModal,
  openPartsQuotesModal,
  openEquipmentQuotesModal,
  openWarrantyListModal,
  openMaintenanceListModal,
}) => {
  if (customer === null || customer.id === "") {
    return <InactiveButtons />;
  } else {
    return (
      <ActiveButtons
        customer={customer}
        openCreateDispatchModal={openCreateDispatchModal}
        openDispatchListModal={openDispatchListModal}
        openPartsQuotesModal={openPartsQuotesModal}
        openEquipmentQuotesModal={openEquipmentQuotesModal}
        openWarrantyListModal={openWarrantyListModal}
        openMaintenanceListModal={openMaintenanceListModal}
      />
    );
  }
};

export default NavigationButtons;
