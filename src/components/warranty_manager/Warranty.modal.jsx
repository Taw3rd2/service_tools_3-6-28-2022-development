import React, { useState } from "react";
import { getFirestore, doc } from "firebase/firestore";

import { updateDocument } from "../../firebase/firestore.utils";

import { getFormattedDate } from "../../utilities/dateUtils";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ArrowUpward, Close, Delete } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const Warranty = ({
  isWarrantyModalOpen,
  closeWarrantyModal,
  openDeleteWarrantyModal,
  customer,
  warrantySelected,
}) => {
  const db = getFirestore();

  const [jobNumber, setJobNumber] = useState(
    warrantySelected ? warrantySelected.jobNumber : ""
  );

  const [laborExpirationDate, setLaborExpirationDate] = useState(
    warrantySelected
      ? warrantySelected.laborExpirationDate.toDate()
      : new Date()
  );

  const [partsExpirationDate, setPartsExpirationDate] = useState(
    warrantySelected
      ? warrantySelected.partsExpirationDate.toDate()
      : new Date()
  );

  const [startDate, setStartDate] = useState(
    warrantySelected ? warrantySelected.startDate.toDate() : new Date()
  );

  const submitWarranty = (event) => {
    event.preventDefault();
    const updatedWarranty = {
      key: warrantySelected.equipmentName,
      equipmentWarranty: getFormattedDate(partsExpirationDate),
      laborWarranty: getFormattedDate(laborExpirationDate),
      warranty: {
        key: warrantySelected.equipmentName,
        jobNumber,
        startDate,
        partsExpirationDate,
        laborExpirationDate,
        equipment: warrantySelected.equipmentName,
        equipmentName: warrantySelected.equipmentName,
        equipmentBrand: warrantySelected.equipmentBrand,
        equipmentModel: warrantySelected.equipmentModel,
        equipmentSerial: warrantySelected.equipmentSerial,
      },
    };
    console.log("updatedWarranty", updatedWarranty);
    updateDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Equipment",
        warrantySelected.equipmentName
      ),
      updatedWarranty
    ).then(() => {
      closeWarrantyModal();
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="warranty-details"
        aria-describedby="modal for warranty details"
        open={isWarrantyModalOpen}
        onClose={closeWarrantyModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isWarrantyModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {warrantySelected ? "Edit Warranty" : "New Warranty"}
                </Typography>
              </Grid>
            </Grid>

            <form onSubmit={submitWarranty} autoComplete="new password">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Job Number"
                    variant="outlined"
                    value={jobNumber}
                    fullWidth
                    sx={{ input: { color: "primary" }, marginTop: "8px" }}
                    onChange={(event) => setJobNumber(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Warranty Start Date"
                      fullWidth
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      color="primary"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: "100%", marginTop: "8px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Parts Expiration Date"
                      fullWidth
                      value={partsExpirationDate}
                      onChange={(newValue) => {
                        setPartsExpirationDate(newValue);
                      }}
                      color="primary"
                      renderInput={(params) => (
                        <TextField {...params} sx={{ width: "100%" }} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Labor Expiration Date"
                      fullWidth
                      value={laborExpirationDate}
                      onChange={(newValue) => {
                        setLaborExpirationDate(newValue);
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
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="error"
                  type="button"
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={() => openDeleteWarrantyModal()}
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
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="button"
                  variant="outlined"
                  onClick={() => closeWarrantyModal()}
                  startIcon={<Close />}
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

export default Warranty;
