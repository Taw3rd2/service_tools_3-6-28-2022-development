import React, { useState, useEffect } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

import NoCustomerLoaded from "./views/NoCustomerLoaded.view";
import NoServiceCustomer from "./views/NoServiceCustomer.view";
import ServiceCustomer from "./views/ServiceCustomer.view";

const CustomerInformation = ({
  customer,
  openEditCustomerModal,
  openEditBillingModal,
  openEquipmentListModal,
  getCurrentCustomer,
}) => {
  const db = getFirestore();

  const [client, setClient] = useState({ id: "" });

  const setDefaultCustomerInfo = () => {
    setClient({ id: "" });
  };

  useEffect(() => {
    if (customer === null || customer.id === "") {
      setDefaultCustomerInfo();
    } else {
      const unsubscribe = onSnapshot(
        doc(db, "customers", customer.id),
        (doc) => {
          setClient(doc.data());
        },
        (error) => {
          console.log(error.message);
        }
      );

      return () => unsubscribe();
    }
  }, [db, customer]);

  if (customer === null || client.id === "" || client.id === null) {
    return <NoCustomerLoaded />;
  } else if (client.noService) {
    return (
      <NoServiceCustomer
        customer={customer}
        openEditCustomerModal={openEditCustomerModal}
        openEditBillingModal={openEditBillingModal}
        openEquipmentListModal={openEquipmentListModal}
        getCurrentCustomer={getCurrentCustomer}
      />
    );
  } else {
    return (
      <ServiceCustomer
        customer={client}
        openEditCustomerModal={openEditCustomerModal}
        openEditBillingModal={openEditBillingModal}
        openEquipmentListModal={openEquipmentListModal}
        getCurrentCustomer={getCurrentCustomer}
      />
    );
  }
};

export default CustomerInformation;
