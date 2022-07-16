import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot, doc } from "firebase/firestore";
import {
  createNamedDocument,
  updateDocument,
} from "../../firebase/firestore.utils";

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

const CreateMaintenance = ({
  isCreateMaintenanceModalOpen,
  closeCreateMaintenanceModal,
  customer,
}) => {
  const db = getFirestore();

  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const todaysDate = new Date();
  const defaultExpirationDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const [mNumber, setMNumber] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleDate, setSaleDate] = useState(todaysDate);
  const [expirationDate, setExpirationDate] = useState(defaultExpirationDate);

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

  const submitMaintenance = (e) => {
    e.preventDefault();

    if (selectedEquipment === undefined || selectedEquipment.length === 0) {
      console.log("No equipment selected");
    } else {
      Object.keys(selectedEquipment).forEach((item) => {
        const androidUpdate = {
          equipmentContract: getFormattedDate(expirationDate),
        };
        let newMaint = {
          key: item,
          customerId: `${customer.id}`,
          customerLastName: `${customer.lastname}`,
          mNumber: `${mNumber} - ${equipment[item].equipmentName}`,
          salePrice,
          saleDate,
          expirationDate,
          completedDate: null,
          equipment: equipment[item].equipmentName,
          equipmentName: equipment[item].equipmentName,
          equipmentBrand: equipment[item].equipmentBrand,
          equipmentModel: equipment[item].equipmentModel,
          equipmentSerial: equipment[item].equipmentSerial,
        };
        createNamedDocument(
          doc(
            db,
            "customers",
            customer.id,
            "Maintenance",
            `${mNumber} - ${equipment[item].equipmentName}`
          ),
          newMaint
        )
          .then(() => {
            console.log("Contract Added");
            closeCreateMaintenanceModal();
          })
          .catch((error) => {
            console.log("firebase error ", error);
          });
        console.log("android update: ", androidUpdate);
        updateDocument(
          doc(
            db,
            "customers",
            customer.id,
            "Equipment",
            equipment[item].equipmentName
          ),
          androidUpdate
        )
          .then(() => {
            console.log("android updated");
          })
          .catch((error) => {
            console.log("firebase error: ", error);
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
        aria-labelledby="create-maintenance"
        aria-describedby="modal for creating maintenance"
        open={isCreateMaintenanceModalOpen}
        onClose={closeCreateMaintenanceModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isCreateMaintenanceModalOpen}>
          <div style={getRootModalStyle("45%")}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Add New Maintenance
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={submitMaintenance} autoComplete="new password">
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
                        aria-label="add-maintenance-list"
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
                              align="left"
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
                      label="M-Number"
                      variant="outlined"
                      value={mNumber}
                      fullWidth
                      sx={{ input: { color: "primary" } }}
                      onChange={(event) => setMNumber(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Sale Price"
                      variant="outlined"
                      value={salePrice}
                      fullWidth
                      sx={{ input: { color: "primary" } }}
                      onChange={(event) => setSalePrice(event.target.value)}
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
                    onClick={() => closeCreateMaintenanceModal()}
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
                    onClick={() => closeCreateMaintenanceModal()}
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

export default CreateMaintenance;
