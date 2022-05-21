import React from "react";
import { doc, getFirestore } from "firebase/firestore";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { deleteDocument } from "../../../../firebase/firestore.utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteCustomer = ({
  isDeleteCustomerModalOpen,
  closeEditCustomerModal,
  closeDeleteCustomerModal,
  setCustomer,
  customer,
}) => {
  const db = getFirestore();

  const onCustomerDelete = () => {
    setCustomer({ id: "" });
    deleteDocument(doc(db, "customers", customer.id))
      .then(() => closeEditCustomerModal())
      .then(() => closeDeleteCustomerModal());

    //set the current customer to {}
  };

  return (
    <Modal
      aria-labelledby="delete-customer"
      aria-describedby="modal to delete customer"
      open={isDeleteCustomerModalOpen}
      onClose={closeDeleteCustomerModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDeleteCustomerModalOpen}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ color: "teal" }}>
                {`Delete ${customer.lastname}?`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="cation" gutterBottom>
                {`Unrecoverable delete!`}
              </Typography>
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
              size="large"
              variant="outlined"
              startIcon={<Delete />}
              onClick={() => onCustomerDelete()}
            >
              Delete
            </Button>
            <Button
              sx={{ marginLeft: "8px" }}
              size="large"
              color="primary"
              variant="outlined"
              startIcon={<Close />}
              onClick={() => closeDeleteCustomerModal()}
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteCustomer;
