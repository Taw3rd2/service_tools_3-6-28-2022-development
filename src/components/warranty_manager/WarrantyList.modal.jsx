import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  Backdrop,
  Button,
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
  ThemeProvider,
  Typography,
} from "@mui/material";
import { lightTheme } from "../../theme/Theme";
import {
  getFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../utilities/dateUtils";
import { AddCircleOutline, Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "53%",
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const WarrantyList = ({
  isWarrantyListModalOpen,
  closeWarrantyListModal,
  openWarrantyModal,
  openCreateWarrantyModal,
  customer,
}) => {
  const db = getFirestore();

  const [warranties, setWarranties] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "customers", customer.id, "Equipment"),
      (snapshot) => {
        let newWarranties = [];

        snapshot.docs.forEach((doc) => {
          let warr = {
            key: "",
            equipment: "",
            equipmentName: "",
            equipmentBrand: "",
            equipmentModel: "",
            equipmentSerial: "",
            jobNumber: "",
            startDate: "",
            partsExpirationDate: "",
            laborExpirationDate: "",
          };
          let equipment = doc.data();
          equipment.id = doc.id;
          if (typeof equipment.warranty != "undefined") {
            warr.id = equipment.id;
            warr.key = equipment.warranty.key;
            warr.equipment = equipment.warranty.equipment;
            warr.equipmentBrand = equipment.warranty.equipmentBrand;
            warr.equipmentModel = equipment.warranty.equipmentModel;
            warr.equipmentSerial = equipment.warranty.equipmentSerial;
            warr.equipmentName = equipment.warranty.equipmentName;
            warr.jobNumber = equipment.warranty.jobNumber;
            warr.startDate = equipment.warranty.startDate;
            warr.partsExpirationDate = equipment.warranty.partsExpirationDate;
            warr.laborExpirationDate = equipment.warranty.laborExpirationDate;
            newWarranties.push(warr);
          }
        });
        setWarranties(newWarranties);
      },
      (error) => {
        console.log(error.message);
      }
    );
    return () => unsubscribe();
  }, [db, customer]);

  const getStyledTableCell = (stringValue) => {
    const dateValue = getDateFromString(stringValue);
    if (getUnixFromDate(dateValue) < getUnixFromDate(new Date())) {
      return (
        <TableCell
          align="center"
          sx={{
            fontSize: 18,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            color: "red",
          }}
        >
          {stringValue}
        </TableCell>
      );
    } else {
      return (
        <TableCell
          align="center"
          sx={{
            fontSize: 18,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            color: "green",
          }}
        >
          {stringValue}
        </TableCell>
      );
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="warranty-list"
        aria-describedby="modal for warranty list"
        open={isWarrantyListModalOpen}
        onClose={closeWarrantyListModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isWarrantyListModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Warranty
                </Typography>
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              sx={{ overflow: "auto", maxHeight: 440, marginTop: "8px" }}
            >
              <Table stickyHeader size="small" aria-label="warranty-list-table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: 150,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                      }}
                    >
                      Job Number
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        minWidth: 350,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                      }}
                    >
                      Equipment
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: 150,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                      }}
                    >
                      Start Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: 150,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                      }}
                    >
                      Parts Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: 150,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                      }}
                    >
                      Labor Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: "100px",
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                      }}
                    >
                      Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warranties.map((warranty) => (
                    <TableRow
                      key={warranty.id}
                      sx={{ cursor: "pointer" }}
                      onClick={() => openWarrantyModal(warranty)}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 18,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {warranty.jobNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 18,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {warranty.equipmentName}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 18,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {getFormattedDate(warranty.startDate)}
                      </TableCell>
                      {getStyledTableCell(
                        getFormattedDate(warranty.partsExpirationDate)
                      )}
                      {getStyledTableCell(
                        getFormattedDate(warranty.laborExpirationDate)
                      )}
                      <TableCell align="center">
                        <Button variant="outlined">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddCircleOutline />}
                sx={{
                  marginTop: "16px",
                  marginLeft: "8px",
                  background: lightTheme.palette.primary.contrastText,
                }}
                onClick={() => openCreateWarrantyModal()}
              >
                Add New Warranty
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                sx={{
                  marginTop: "16px",
                  marginLeft: "8px",
                  background: lightTheme.palette.primary.contrastText,
                }}
                onClick={() => closeWarrantyListModal()}
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

export default WarrantyList;
