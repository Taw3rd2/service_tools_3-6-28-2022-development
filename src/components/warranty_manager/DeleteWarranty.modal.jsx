import React from "react";
import { updateDocument } from "../../firebase/firestore.utils";
import { deleteField, doc, getFirestore } from "firebase/firestore";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { getRootModalStyle, lightTheme } from "../../theme/Theme";

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
          <div style={getRootModalStyle(350)}>
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
