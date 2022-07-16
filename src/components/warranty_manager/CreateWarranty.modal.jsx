import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot, doc } from "firebase/firestore";
import { updateDocument } from "../../firebase/firestore.utils";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { getFormattedDate } from "../../utilities/dateUtils";

import {
  defaultBodyTableCell,
  getDefaultHeadTableCell,
  getRootModalStyle,
  lightTheme,
} from "../../theme/Theme";

import {
  Backdrop,
  Button,
  Checkbox,
  Fade,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { AddCircleOutline, Close } from "@mui/icons-material";

const CreateWarranty = ({
  isCreateWarrantyModalOpen,
  closeCreateWarrantyModal,
  customer,
}) => {
  const db = getFirestore();

  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const todaysDate = new Date();
  const defaultLaborWarrantyExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const defaultPartsWarrantyExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  );

  const [jobNumber, setJobNumber] = useState("");
  const [startDate, setStartDate] = useState(todaysDate);
  const [partsExpirationDate, setPartsExpirationDate] = useState(
    defaultPartsWarrantyExpiration
  );
  const [laborExpirationDate, setLaborExpirationDate] = useState(
    defaultLaborWarrantyExpiration
  );

  useEffect(
    () =>
      onSnapshot(
        collection(db, "customers", customer.id, "Equipment"),
        (snapshot) =>
          setEquipment(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          )
      ),
    [db, customer]
  );

  const submitWarranty = (event) => {
    event.preventDefault();
    if (selectedEquipment === undefined || selectedEquipment.length === 0) {
      alert("No equipment selected..");
    } else {
      Object.keys(selectedEquipment).forEach((item) => {
        let newWarr = {
          key: equipment[item].equipmentName,
          equipmentWarranty: getFormattedDate(partsExpirationDate),
          laborWarranty: getFormattedDate(laborExpirationDate),
          warranty: {
            key: equipment[item].equipmentName,
            jobNumber,
            startDate,
            partsExpirationDate,
            laborExpirationDate,
            equipment: equipment[item].equipmentName,
            equipmentName: equipment[item].equipmentName,
            equipmentBrand: equipment[item].equipmentBrand,
            equipmentModel: equipment[item].equipmentModel,
            equipmentSerial: equipment[item].equipmentSerial,
          },
        };
        updateDocument(
          doc(
            db,
            "customers",
            customer.id,
            "Equipment",
            equipment[item].equipmentName
          ),
          newWarr
        ).then(() => {
          closeCreateWarrantyModal();
        });
      });
    }
  };

  const handleCheckChange = (name) => (event) => {
    setSelectedEquipment({
      ...selectedEquipment,
      [name]: event.target.checked,
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="create-warranty"
        aria-describedby="modal for creating warranties"
        open={isCreateWarrantyModalOpen}
        onClose={closeCreateWarrantyModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isCreateWarrantyModalOpen}>
          <div style={getRootModalStyle("45%")}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Add New Warranty's
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={submitWarranty}>
              {equipment.length === 0 ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      There is no equipment to apply a warranty to.
                    </Typography>
                    <Typography variant="h4">
                      Please add equipment, then attach the warranty.
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TableContainer
                      component={Paper}
                      sx={{
                        overflow: "auto",
                        maxHeight: 440,
                        marginTop: "8px",
                      }}
                    >
                      <Table
                        stickyHeader
                        size="small"
                        aria-label="warranty-list-table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={getDefaultHeadTableCell(5)}
                            >
                              #
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={getDefaultHeadTableCell(150)}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={getDefaultHeadTableCell(150)}
                            >
                              Brand
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={getDefaultHeadTableCell(150)}
                            >
                              Model
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={getDefaultHeadTableCell(150)}
                            >
                              Serial
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={getDefaultHeadTableCell(5)}
                            >
                              Add?
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {equipment.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell
                                align="center"
                                sx={defaultBodyTableCell}
                              >{`${index + 1}.`}</TableCell>
                              <TableCell align="left" sx={defaultBodyTableCell}>
                                {item.equipmentName}
                              </TableCell>
                              <TableCell align="left" sx={defaultBodyTableCell}>
                                {item.equipmentBrand}
                              </TableCell>
                              <TableCell align="left" sx={defaultBodyTableCell}>
                                {item.equipmentModel}
                              </TableCell>
                              <TableCell align="left" sx={defaultBodyTableCell}>
                                {item.equipmentSerial}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={defaultBodyTableCell}
                              >
                                <Checkbox
                                  checked={selectedEquipment.index}
                                  value={index}
                                  onChange={handleCheckChange(index)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Job Number"
                      variant="outlined"
                      value={jobNumber}
                      fullWidth
                      sx={{ input: { color: "primary" } }}
                      onChange={(event) => setJobNumber(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        fullWidth
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
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
              )}
              {equipment.length === 0 ? (
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
                    color="primary"
                    type="button"
                    variant="outlined"
                    onClick={() => closeCreateWarrantyModal()}
                    startIcon={<Close />}
                  >
                    Close
                  </Button>
                </Grid>
              ) : (
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
                    color="primary"
                    type="submit"
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
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
                    onClick={() => closeCreateWarrantyModal()}
                    startIcon={<Close />}
                  >
                    Close
                  </Button>
                </Grid>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default CreateWarranty;
