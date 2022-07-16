import React from "react";

import { doc, getFirestore } from "firebase/firestore";

import { getRootModalStyle, lightTheme } from "../../theme/Theme";

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
import { deleteDocument, updateDocument } from "../../firebase/firestore.utils";

const DeleteMaintenance = ({
  isDeleteMaintenanceModalOpen,
  closeDeleteMaintenanceModal,
  closeMaintenanceDetailsModal,
  selectedMaintenance,
  customer,
}) => {
  const db = getFirestore();

  const onMaintenanceDelete = () => {
    updateDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Equipment",
        selectedMaintenance.equipmentName
      ),
      { equipmentContract: "" }
    ).then(() => {
      console.log("Android Contract Deleted");
    });
    deleteDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Maintenance",
        selectedMaintenance.mNumber
      )
    ).then(() => {
      console.log("Contract Deleted");
      closeDeleteMaintenanceModal();
      closeMaintenanceDetailsModal();
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="maintenance-delete"
        aria-describedby="modal to delete maintenance"
        open={isDeleteMaintenanceModalOpen}
        onClose={closeDeleteMaintenanceModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteMaintenanceModalOpen}>
          <div style={getRootModalStyle(350)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`Delete Maintenance For ${selectedMaintenance.equipmentName}?`}
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
                onClick={() => onMaintenanceDelete()}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                onClick={() => closeDeleteMaintenanceModal()}
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

export default DeleteMaintenance;
