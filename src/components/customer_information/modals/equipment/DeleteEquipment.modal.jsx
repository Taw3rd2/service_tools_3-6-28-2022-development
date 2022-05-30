import React from "react";
import { deleteDocument } from "../../../../firebase/firestore.utils";

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
import { doc, getFirestore } from "firebase/firestore";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../../theme/Theme";

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

const DeleteEquipment = ({
  isDeleteCustomerEquipmentModalOpen,
  closeDeleteEquipmentModal,
  closeEditCustomerEquipmentModal,
  equipmentSelected,
}) => {
  const db = getFirestore();

  const onEquipmentDelete = () => {
    const documentReference = doc(
      db,
      "customers",
      equipmentSelected.customerId,
      "Equipment",
      equipmentSelected.equipmentName
    );
    deleteDocument(documentReference).then(() => {
      closeEditCustomerEquipmentModal();
      closeDeleteEquipmentModal();
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="delete-customer-equipment"
        aria-describedby="modal to delete customer equipment"
        open={isDeleteCustomerEquipmentModalOpen}
        onClose={closeDeleteEquipmentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteCustomerEquipmentModalOpen}>
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`Delete ${equipmentSelected.equipmentName}?`}
                </Typography>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    {`Unrecoverable delete!`}
                  </Typography>
                </Grid>
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
                onClick={() => onEquipmentDelete()}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                onClick={() => closeDeleteEquipmentModal()}
              >
                Close
              </Button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default DeleteEquipment;
