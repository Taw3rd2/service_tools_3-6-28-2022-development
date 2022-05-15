import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";

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
  const [client, setClient] = useState({ id: "" });

  const setDefaultCustomerInfo = () => {
    setClient({ id: "" });
  };

  useEffect(() => {
    if (customer === null || customer.id === "") {
      setDefaultCustomerInfo();
    } else {
      let unsubscribe = firebase
        .firestore()
        .collection("customers")
        .doc(customer.id)
        .onSnapshot((customer) => {
          let newCustomer = customer.data();
          newCustomer.id = customer.id;
          setClient(newCustomer);
        });
      return () => unsubscribe();
    }
  }, [customer]);

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
