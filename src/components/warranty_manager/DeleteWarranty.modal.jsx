import React from "react";
import { updateDocument } from "../../firebase/firestore.utils";

import { Backdrop, Button, Fade, Grid, Modal, Typography } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { deleteField, doc, getFirestore } from "firebase/firestore";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const DeleteWarranty = ({
  isDeleteWarrantyModalOpen,
  closeDeleteWarrantyModal,
  closeWarrantyModal,
  warrantySelected,
  customer,
}) => {
  const db = getFirestore();

  const onWarrantyDelete = () => {
    console.log("customer id: ", customer.id);
    console.log("equipmentName: ", warrantySelected.equipmentName);
    updateDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Equipment",
        warrantySelected.equipmentName
      ),
      { equipmentWarranty: "", laborWarranty: "", warranty: deleteField() }
    ).then(() => {
      console.log("Removed String Representations, and Objects");
      closeWarrantyModal();
      closeDeleteWarrantyModal();
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="warranty-delete"
        aria-describedby="modal to delete a warranty"
        open={isDeleteWarrantyModalOpen}
        onClose={closeDeleteWarrantyModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteWarrantyModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`Delete Warranty For ${warrantySelected.equipmentName}?`}
                </Typography>

                <Typography variant="body1" gutterBottom>
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
                color="inherit"
                startIcon={<Delete />}
                onClick={() => onWarrantyDelete()}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                onClick={() => closeDeleteWarrantyModal()}
              >
                Close
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default DeleteWarranty;
