import React, { useState } from "react";
import firebase from "firebase/compat/app";

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
import { Close, Delete, ArrowUpward } from "@mui/icons-material";

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

const EditCustomerInfo = ({
  customer,
  isEditCustomerModalOpen,
  closeEditCustomerModal,
  openDeleteCustomerModal,
}) => {
  const [lastNameError, setLastNameError] = useState(false);

  const [billingiscommercial, setToCommercial] = useState(
    customer.billingiscommercial ? customer.billingiscommercial : false
  );
  const [noService, setNoService] = useState(
    customer.noService ? customer.noService : false
  );
  const [firstname, setFirstName] = useState(
    customer.firstname ? customer.firstname : ""
  );
  const [lastname, setLastName] = useState(
    customer.lastname ? customer.lastname : ""
  );
  const [street, setStreet] = useState(customer.street ? customer.street : "");
  const [city, setCity] = useState(customer.city ? customer.city : "");
  const [state, setState] = useState(customer.state ? customer.state : "");
  const [zip, setZip] = useState(customer.zip ? customer.zip : "");
  const [phoneName, setPhoneName] = useState(
    customer.phoneName ? customer.phoneName : ""
  );
  const [altPhoneName, setAltPhoneName] = useState(
    customer.altPhoneName ? customer.altPhoneName : ""
  );
  const [otherPhoneName, setOtherPhoneName] = useState(
    customer.otherPhoneName ? customer.otherPhoneName : ""
  );
  const [phone, setPhone] = useState(customer.phone ? customer.phone : "");
  const [altphone, setAltPhone] = useState(
    customer.altphone ? customer.altphone : ""
  );
  const [otherPhone, setOtherPhone] = useState(
    customer.otherPhone ? customer.otherPhone : ""
  );
  const [email, setEmail] = useState(customer.email ? customer.email : "");

  const updateCustomer = (event) => {
    event.preventDefault();
    const customerToUpdate = {
      billingiscommercial,
      noService,
      firstname,
      lastname,
      street,
      city,
      state,
      zip,
      phoneName,
      altPhoneName,
      otherPhoneName,
      phone,
      altphone,
      otherPhone,
      email,
    };
    if (lastname === "") {
      setLastNameError(true);
      return;
    } else {
      firebase
        .firestore()
        .collection("customers")
        .doc(customer.id)
        .update(customerToUpdate)
        .then(() => {
          //editClientSaveSuccessIndicator();
          closeEditCustomerModal();
        });
    }
  };

  return (
    <Modal
      aria-labelledby="edit-customer-modal"
      aria-describedby="modal to edit a customer"
      open={isEditCustomerModalOpen}
      onClose={closeEditCustomerModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditCustomerModalOpen}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ color: "teal" }}>
                Edit Customer
              </Typography>
            </Grid>
          </Grid>

          <form onSubmit={updateCustomer} autoComplete="new-password">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3>
                  Commercial:
                  <Checkbox
                    name="billingiscommercial"
                    color="primary"
                    checked={billingiscommercial}
                    onChange={(e) => setToCommercial(e.target.checked)}
                  />
                </h3>
              </Grid>
              <Grid item xs={6}>
                <h3>
                  No Service:
                  <Checkbox
                    name="noService"
                    color="primary"
                    checked={noService}
                    onChange={(e) => setNoService(e.target.checked)}
                  />
                </h3>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={firstname}
                  label="First Name"
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value)}
                  inputProps={{ tabIndex: "1" }}
                />
              </Grid>
              {lastNameError ? (
                <Grid item xs={6}>
                  <TextField
                    error
                    value={lastname}
                    label="Last Name"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <TextField
                    value={lastname}
                    label="Last Name"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  value={street}
                  label="Street Address"
                  fullWidth
                  onChange={(e) => setStreet(e.target.value)}
                  inputProps={{ tabIndex: "3" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={city}
                  label="City"
                  fullWidth
                  onChange={(e) => setCity(e.target.value)}
                  inputProps={{ tabIndex: "4" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={state}
                  label="State"
                  fullWidth
                  onChange={(e) => setState(e.target.value)}
                  inputProps={{ tabIndex: "5" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={zip}
                  label="Zip"
                  fullWidth
                  onChange={(e) => setZip(e.target.value)}
                  inputProps={{ tabIndex: "6" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={phoneName}
                  label="Primary Contact Name"
                  fullWidth
                  onChange={(e) => setPhoneName(e.target.value)}
                  inputProps={{ tabIndex: "7" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={altPhoneName}
                  label="Secondary Contact Name"
                  fullWidth
                  onChange={(e) => setAltPhoneName(e.target.value)}
                  inputProps={{ tabIndex: "9" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={otherPhoneName}
                  label="Other Contact Name"
                  fullWidth
                  onChange={(e) => setOtherPhoneName(e.target.value)}
                  inputProps={{ tabIndex: "11" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={phone}
                  label="Primary Phone Number"
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                  inputProps={{ tabIndex: "8" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={altphone}
                  label="Secondary Phone Number"
                  fullWidth
                  onChange={(e) => setAltPhone(e.target.value)}
                  inputProps={{ tabIndex: "10" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={otherPhone}
                  label="Other Phone Number"
                  fullWidth
                  onChange={(e) => setOtherPhone(e.target.value)}
                  inputProps={{ tabIndex: "12" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  label="Email Address"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{ tabIndex: "13" }}
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
                sx={{ marginLeft: "8px", color: "red" }}
                onClick={() => openDeleteCustomerModal()}
                variant="outlined"
                tabIndex={14}
                startIcon={<Delete />}
              >
                Delete Customer
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                variant="outlined"
                color="primary"
                tabIndex={15}
                type="submit"
                startIcon={<ArrowUpward />}
              >
                Save Changes
              </Button>

              <Button
                sx={{ marginLeft: "8px" }}
                onClick={() => closeEditCustomerModal()}
                variant="outlined"
                color="primary"
                tabIndex={16}
                startIcon={<Close />}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditCustomerInfo;
