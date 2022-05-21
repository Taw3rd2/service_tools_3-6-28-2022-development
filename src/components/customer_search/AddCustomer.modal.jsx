import React, { useState } from "react";
import { collection, getFirestore } from "firebase/firestore";
import { createUnNamedDocument } from "../../firebase/firestore.utils";

import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCustomer = ({
  isAddCustomerModalOpen,
  closeAddCustomerModal,
  newCustomerSaveIndicator,
}) => {
  const db = getFirestore();

  const cnotes = "";
  const squarefootage = "";
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("MI");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phoneName, setPhoneName] = useState("");
  const [altPhoneName, setAltPhoneName] = useState("");
  const [otherPhoneName, setOtherPhoneName] = useState("");
  const [phone, setPhone] = useState("");
  const [altphone, setAltPhone] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const billingorg = null;
  const billingPrimaryName = null;
  const billingAlternateName = null;
  const billingOtherName = null;
  const billingPrimaryPhone = null;
  const billingAlternatePhone = null;
  const billingOtherPhone = null;
  const billingPrimaryEmail = null;
  const billingAlternateEmail = null;
  const billingOtherEmail = null;
  const billingstreet = null;
  const billingcity = null;
  const billingstate = null;
  const billingzip = null;
  const [billingiscommercial, setToCommercial] = useState(null);

  const submitCustomer = (event) => {
    event.preventDefault();
    const customer = {
      firstname,
      lastname,
      street,
      city,
      state,
      zip,
      email,
      phoneName,
      altPhoneName,
      otherPhoneName,
      phone,
      altphone,
      otherPhone,
      cnotes,
      squarefootage,
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
      billingiscommercial,
    };
    createUnNamedDocument(collection(db, "customers"), customer).then(() =>
      closeAddCustomerModal()
    );
  };

  return (
    <Modal
      aria-labelledby="add-customer-modal"
      aria-describedby="modal to add a new customer"
      open={isAddCustomerModalOpen}
      onClose={closeAddCustomerModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isAddCustomerModalOpen}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom sx={{ color: "teal" }}>
                Add Customer
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <h3>
                Commercial Customer:
                <Checkbox
                  name="billingiscommercial"
                  color="primary"
                  checked={billingiscommercial}
                  onChange={(event) => setToCommercial(event.target.checked)}
                />
              </h3>
            </Grid>
          </Grid>

          <form onSubmit={submitCustomer} autoComplete="new-password">
            <Grid container spacing={2}>
              {billingiscommercial ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="Job Site Business Name or Tennant's Name"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      inputProps={{ tabIndex: "1" }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Job Site Street Address"
                      name="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      inputProps={{ tabIndex: "2" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site City"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      inputProps={{ tabIndex: "3" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site State"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      inputProps={{ tabIndex: "4" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Zip Code"
                      name="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      inputProps={{ tabIndex: "5" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Job Site Contact Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ tabIndex: "6" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Primary Contact"
                      name="phoneName"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "7" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Alternate Contact"
                      name="altPhoneName"
                      value={altPhoneName}
                      onChange={(e) => setAltPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "9" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Other Contact"
                      name="otherPhoneName"
                      value={otherPhoneName}
                      onChange={(e) => setOtherPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "11" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Primary Phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputProps={{ tabIndex: "8" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Alternate Phone"
                      name="altphone"
                      value={altphone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      inputProps={{ tabIndex: "10" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Other Phone"
                      name="otherPhone"
                      value={otherPhone}
                      onChange={(e) => setOtherPhone(e.target.value)}
                      inputProps={{ tabIndex: "12" }}
                      fullWidth
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      inputProps={{ tabIndex: "1" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      inputProps={{ tabIndex: "2" }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Street Address"
                      name="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      inputProps={{ tabIndex: "3" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="City"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      inputProps={{ tabIndex: "4" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="State"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      inputProps={{ tabIndex: "5" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Zip Code"
                      name="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      inputProps={{ tabIndex: "6" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ tabIndex: "7" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Primary Phone Name"
                      name="phoneName"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "8" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Alternate Phone Name"
                      name="altPhoneName"
                      value={altPhoneName}
                      onChange={(e) => setAltPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "10" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Other Phone Name"
                      name="otherPhoneName"
                      value={otherPhoneName}
                      onChange={(e) => setOtherPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "12" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Primary Phone Number"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputProps={{ tabIndex: "9" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Alternate Phone Number"
                      name="altphone"
                      value={altphone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      inputProps={{ tabIndex: "11" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Other Phone Number"
                      name="otherPhone"
                      value={otherPhone}
                      onChange={(e) => setOtherPhone(e.target.value)}
                      inputProps={{ tabIndex: "13" }}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  * Last Name or Buisiness Name Required
                </h3>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
            >
              <Button
                type="submit"
                variant="outlined"
                startIcon={<ArrowUpward />}
                sx={{ marginLeft: "16px" }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={() => closeAddCustomerModal()}
                startIcon={<Close />}
                sx={{ marginLeft: "16px" }}
              >
                Close
              </Button>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddCustomer;
