import React from "react";

import { Button, Grid, List, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

import BusinessContactField from "../fields/BusinessContactField";
import ContactField from "../fields/ContactField";
import EmailField from "../fields/EmailField";
import MainField from "../fields/MainField";
import Spinner from "../../spinner/Spinner";
import { Edit } from "@mui/icons-material";

const ServiceCustomer = ({
  customer,
  openEditCustomerModal,
  openEditBillingModal,
  openEquipmentListModal,
  getCurrentCustomer,
}) => {
  const handleOpeningEditCustomerModal = () => {
    openEditCustomerModal();
    getCurrentCustomer(customer);
  };

  const handleOpeningEditBillingModal = () => {
    openEditBillingModal();
    getCurrentCustomer(customer);
  };

  if (customer.lastname === "") {
    return <Spinner />;
  } else {
    return (
      <ThemeProvider theme={lightTheme}>
        <div
          style={{
            flexGrow: 1,
            border: "1px solid black",
            backgroundColor: "lightgray",
          }}
        >
          <Grid container>
            {customer.billingiscommercial && (
              <Grid item xs={12}>
                <div style={{ padding: "8px" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ textAlign: "center", color: "red" }}
                  >
                    Commercial
                  </Typography>
                </div>
              </Grid>
            )}
            <Grid item xs={6}>
              <div style={{ padding: "8px" }}>
                <MainField
                  title={"Customer Information"}
                  name={`${customer.firstname} ${customer.lastname}`}
                  address={customer.street}
                  address2={`${customer.city},${customer.state} ${customer.zip}`}
                  business={false}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              {customer.billingorg && (
                <div style={{ padding: "8px" }}>
                  <MainField
                    title={"Billing Information"}
                    name={customer.billingorg}
                    address={customer.billingstreet}
                    address2={`${customer.billingcity},${customer.billingstate} ${customer.billingzip}`}
                    business={true}
                  />
                </div>
              )}
            </Grid>

            <Grid item xs={6}>
              {customer.phoneName || customer.phone ? (
                <div style={{ padding: "8px" }}>
                  <ContactField
                    title={"Primary Contact"}
                    name={customer.phoneName}
                    phone={customer.phone}
                  />
                </div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              {customer.billingPrimaryName || customer.billingPrimaryPhone ? (
                <div style={{ padding: "8px" }}>
                  <BusinessContactField
                    title={"Primary Billing Contact"}
                    name={customer.billingPrimaryName}
                    phone={customer.billingPrimaryPhone}
                    email={customer.billingPrimaryEmail}
                  />
                </div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              {customer.altphone || customer.altPhoneName ? (
                <div style={{ padding: "8px" }}>
                  <ContactField
                    title={"Alternate Contact"}
                    name={customer.altPhoneName}
                    phone={customer.altphone}
                  />
                </div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              {customer.billingAlternateName ||
              customer.billingAlternatePhone ? (
                <div style={{ padding: "8px" }}>
                  <BusinessContactField
                    title={"Alternate Billing Contact"}
                    name={customer.billingAlternateName}
                    phone={customer.billingAlternatePhone}
                    email={customer.billingAlternateEmail}
                  />
                </div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              {customer.otherPhone || customer.otherPhoneName ? (
                <div style={{ padding: "8px" }}>
                  <ContactField
                    title={"Other Contact"}
                    name={customer.otherPhoneName}
                    phone={customer.otherPhone}
                  />
                </div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              {customer.billingOtherPhone || customer.billingOtherName ? (
                <div style={{ padding: "8px" }}>
                  <BusinessContactField
                    title={"Other Billing Contact"}
                    name={customer.billingOtherName}
                    phone={customer.billingOtherPhone}
                    email={customer.billingOtherEmail}
                  />
                </div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              {customer.email && (
                <div style={{ padding: "8px" }}>
                  <EmailField
                    title={"Customers Email"}
                    email={customer.email}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={6} />

            <Grid item xs={4}>
              <div style={{ padding: "8px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ background: lightTheme.palette.primary.contrastText }}
                  onClick={() => handleOpeningEditCustomerModal()}
                  startIcon={<Edit />}
                  fullWidth
                >
                  Edit Client
                </Button>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div style={{ padding: "8px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ background: lightTheme.palette.primary.contrastText }}
                  onClick={() => openEquipmentListModal()}
                  startIcon={<List />}
                  fullWidth
                >
                  Equipment
                </Button>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div style={{ padding: "8px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ background: lightTheme.palette.primary.contrastText }}
                  onClick={() => handleOpeningEditBillingModal()}
                  startIcon={<Edit />}
                  fullWidth
                >
                  Edit Billing
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
};

export default ServiceCustomer;
