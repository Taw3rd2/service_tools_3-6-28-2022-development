import React, { useState } from "react";
import { doc, getFirestore } from "firebase/firestore";

import { updateDocument } from "../../../../firebase/firestore.utils";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Close, ArrowUpward } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../../theme/Theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const EditCustomerBilling = ({
  customer,
  isEditBillingModalOpen,
  closeEditBillingModal,
}) => {
  const db = getFirestore();

  //field values
  const [billingorg, setBillingOrg] = useState(
    customer.billingorg ? customer.billingorg : ""
  );
  const [billingPrimaryName, setBillingPrimaryName] = useState(
    customer.billingPrimaryName ? customer.billingPrimaryName : ""
  );
  const [billingAlternateName, setBillingAlternateName] = useState(
    customer.billingAlternateName ? customer.billingAlternateName : ""
  );
  const [billingOtherName, setBillingOtherName] = useState(
    customer.billingOtherName ? customer.billingOtherName : ""
  );
  const [billingPrimaryPhone, setBillingPrimaryPhone] = useState(
    customer.billingPrimaryPhone ? customer.billingPrimaryPhone : ""
  );
  const [billingAlternatePhone, setBillingAlternatePhone] = useState(
    customer.billingAlternatePhone ? customer.billingAlternatePhone : ""
  );
  const [billingOtherPhone, setBillingOtherPhone] = useState(
    customer.billingOtherPhone ? customer.billingOtherPhone : ""
  );
  const [billingPrimaryEmail, setBillingPrimaryEmail] = useState(
    customer.billingPrimaryEmail ? customer.billingPrimaryEmail : ""
  );
  const [billingAlternateEmail, setBillingAlternateEmail] = useState(
    customer.billingAlternateEmail ? customer.billingAlternateEmail : ""
  );
  const [billingOtherEmail, setBillingOtherEmail] = useState(
    customer.billingOtherEmail ? customer.billingOtherEmail : ""
  );
  const [billingstreet, setBillingStreet] = useState(
    customer.billingstreet ? customer.billingstreet : ""
  );
  const [billingcity, setBillingCity] = useState(
    customer.billingcity ? customer.billingcity : ""
  );
  const [billingstate, setBillingState] = useState(
    customer.billingstate ? customer.billingstate : ""
  );
  const [billingzip, setBillingZip] = useState(
    customer.billingzip ? customer.billingzip : ""
  );

  const updateBilling = async (event) => {
    event.preventDefault();
    const payload = {
      billingorg,
      billingPrimaryName,
      billingAlternateName,
      billingOtherName,
      billingPrimaryPhone,
      billingAlternatePhone,
      billingOtherPhone,
      billingPrimaryEmail,
      billingAlternateEmail,
      billingOtherEmail,
      billingstreet,
      billingcity,
      billingstate,
      billingzip,
    };

    const customerBillingDoc = doc(db, "customers", customer.id);

    updateDocument(customerBillingDoc, payload).then(() => {
      closeEditBillingModal();
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="edit-billing-modal"
        aria-describedby="modal to edit billing"
        open={isEditBillingModalOpen}
        onClose={closeEditBillingModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isEditBillingModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Edit Billing Information
                </Typography>
              </Grid>
            </Grid>

            <form onSubmit={updateBilling} autoComplete="new-password">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    value={billingorg}
                    label="Organization Name"
                    fullWidth
                    sx={{ marginTop: "16px" }}
                    onChange={(e) => setBillingOrg(e.target.value)}
                    inputProps={{ tabIndex: "1" }}
                    required
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={4}>
                  <TextField
                    value={billingPrimaryName}
                    label="Primary Contact Name"
                    fullWidth
                    onChange={(e) => setBillingPrimaryName(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingAlternateName}
                    label="Alternate Contact Name"
                    fullWidth
                    onChange={(e) => setBillingAlternateName(e.target.value)}
                    inputProps={{ tabIndex: "5" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingOtherName}
                    label="Other Contact Name"
                    fullWidth
                    onChange={(e) => setBillingOtherName(e.target.value)}
                    inputProps={{ tabIndex: "8" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingPrimaryPhone}
                    label="Primary Phone Number"
                    fullWidth
                    onChange={(e) => setBillingPrimaryPhone(e.target.value)}
                    inputProps={{ tabIndex: "3" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingAlternatePhone}
                    label="Alternate Phone Number"
                    fullWidth
                    onChange={(e) => setBillingAlternatePhone(e.target.value)}
                    inputProps={{ tabIndex: "6" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingOtherPhone}
                    label="Other Phone Number"
                    fullWidth
                    onChange={(e) => setBillingOtherPhone(e.target.value)}
                    inputProps={{ tabIndex: "9" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingPrimaryEmail}
                    label="Primary Email"
                    fullWidth
                    onChange={(e) => setBillingPrimaryEmail(e.target.value)}
                    inputProps={{ tabIndex: "4" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingAlternateEmail}
                    label="Alternate Email"
                    fullWidth
                    onChange={(e) => setBillingAlternateEmail(e.target.value)}
                    inputProps={{ tabIndex: "7" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingOtherEmail}
                    label="Other Email"
                    fullWidth
                    onChange={(e) => setBillingOtherEmail(e.target.value)}
                    inputProps={{ tabIndex: "10" }}
                  />
                </Grid>
                <hr />
                <Grid item xs={12}>
                  <TextField
                    value={billingstreet}
                    label="Billing Street Address"
                    fullWidth
                    onChange={(e) => setBillingStreet(e.target.value)}
                    inputProps={{ tabIndex: "11" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingcity}
                    label="City"
                    fullWidth
                    onChange={(e) => setBillingCity(e.target.value)}
                    inputProps={{ tabIndex: "12" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingstate}
                    label="State"
                    fullWidth
                    onChange={(e) => setBillingState(e.target.value)}
                    inputProps={{ tabIndex: "13" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={billingzip}
                    label="Zip Code"
                    fullWidth
                    onChange={(e) => setBillingZip(e.target.value)}
                    inputProps={{ tabIndex: "14" }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-start"
                justifyContent="flex-end"
                direction="row"
                sx={{ marginTop: "24px" }}
              >
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  variant="outlined"
                  color="primary"
                  tabIndex={15}
                  type="submit"
                  startIcon={<ArrowUpward />}
                >
                  Save Changes
                </Button>
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  onClick={() => closeEditBillingModal()}
                  variant="outlined"
                  color="primary"
                  tabIndex={16}
                  startIcon={<Close />}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default EditCustomerBilling;
