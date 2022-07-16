import React, { useState } from "react";

import { doc, getFirestore } from "firebase/firestore";

import { updateDocument } from "../../firebase/firestore.utils";

import { getRootModalStyle, lightTheme } from "../../theme/Theme";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close, Delete } from "@mui/icons-material";

const MaintenanceDetails = ({
  isMaintenanceDetailsModalOpen,
  closeMaintenanceDetailsModal,
  openDeleteMaintenanceModal,
  selectedMaintenance,
  customer,
}) => {
  const db = getFirestore();

  const mNumber = selectedMaintenance.mNumber;

  const [salePrice, setSalePrice] = useState(
    selectedMaintenance.salePrice ? selectedMaintenance.salePrice : ""
  );
  const [saleDate, setSaleDate] = useState(
    selectedMaintenance.saleDate
      ? selectedMaintenance.saleDate.toDate()
      : new Date()
  );
  const [expirationDate, setExpirationDate] = useState(
    selectedMaintenance.expirationDate
      ? selectedMaintenance.expirationDate.toDate()
      : new Date()
  );
  const [completedDate, setCompletedDate] = useState(
    selectedMaintenance.completedDate === null
      ? null
      : selectedMaintenance.completedDate.toDate()
  );

  const onSubmitMaintenanceUpdate = (e) => {
    e.preventDefault();
    const updatedMaintenance = {
      mNumber,
      saleDate,
      salePrice,
      expirationDate,
      completedDate,
      equipment: selectedMaintenance.equipmentName,
    };
    updateDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Maintenance",
        selectedMaintenance.mNumber
      ),
      updatedMaintenance
    )
      .then(() => {
        console.log("Contract Updated");
        closeMaintenanceDetailsModal();
      })
      .catch((e) => {
        console.log("firebase error", e);
      });
    updateDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Equipment",
        selectedMaintenance.equipmentName
      ),
      { equipmentContract: "" }
    )
      .then(() => {
        console.log("Android Contract Updated");
        closeMaintenanceDetailsModal();
      })
      .catch((e) => {
        console.log("firebase error", e);
      });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="maintenance-details-modal"
        aria-describedby="modal for maintenance details"
        open={isMaintenanceDetailsModalOpen}
        onClose={closeMaintenanceDetailsModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isMaintenanceDetailsModalOpen}>
          <div style={getRootModalStyle("45%")}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`${selectedMaintenance.equipmentName} Maintenance Details`}
                </Typography>
              </Grid>
            </Grid>

            <form
              onSubmit={onSubmitMaintenanceUpdate}
              autoComplete="new password"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom color="primary">
                    {mNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Sale Price"
                    variant="outlined"
                    value={salePrice}
                    fullWidth
                    sx={{ input: { color: "primary" } }}
                    onChange={(event) => setSalePrice(event.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Sale Date"
                      fullWidth
                      value={saleDate}
                      onChange={(newValue) => {
                        setSaleDate(newValue);
                      }}
                      color="primary"
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "100%" }} />
                      )}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Expiration Date"
                      fullWidth
                      value={expirationDate}
                      onChange={(newValue) => {
                        setExpirationDate(newValue);
                      }}
                      color="primary"
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "100%" }} />
                      )}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date Completed"
                      fullWidth
                      value={completedDate}
                      onChange={(newValue) => {
                        setCompletedDate(newValue);
                      }}
                      color="primary"
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "100%" }} />
                      )}
                    />
                  </LocalizationProvider>
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
                  variant="outlined"
                  color="inherit"
                  startIcon={<Delete />}
                  onClick={() => openDeleteMaintenanceModal()}
                >
                  Delete
                </Button>
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="submit"
                  variant="outlined"
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  sx={{ marginLeft: "8px" }}
                  variant="outlined"
                  color="primary"
                  startIcon={<Close />}
                  onClick={() => closeMaintenanceDetailsModal()}
                >
                  Close
                </Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default MaintenanceDetails;
