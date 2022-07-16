import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  getWarrantyFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../utilities/dateUtils";

import {
  lightTheme,
  defaultBodyTableCell,
  getDefaultHeadTableCell,
  greenBodyTableCell,
  redBodyTableCell,
  getRootModalStyle,
  defaultTableButton,
} from "../../theme/Theme";

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

import { AddCircleOutline, Close } from "@mui/icons-material";

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
        <TableCell align="center" sx={redBodyTableCell}>
          {stringValue}
        </TableCell>
      );
    } else {
      return (
        <TableCell align="center" sx={greenBodyTableCell}>
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
          <div style={getRootModalStyle("55%")}>
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
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Job Number
                    </TableCell>
                    <TableCell align="left" sx={getDefaultHeadTableCell(350)}>
                      Equipment
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Start Date
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Parts Expiration
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Labor Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={getDefaultHeadTableCell("100px")}
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
                      <TableCell align="center" sx={defaultBodyTableCell}>
                        {warranty.jobNumber}
                      </TableCell>
                      <TableCell align="left" sx={defaultBodyTableCell}>
                        {warranty.equipmentName}
                      </TableCell>
                      <TableCell align="center" sx={defaultBodyTableCell}>
                        {getWarrantyFormattedDate(warranty.startDate)}
                      </TableCell>
                      {getStyledTableCell(
                        getWarrantyFormattedDate(warranty.partsExpirationDate)
                      )}
                      {getStyledTableCell(
                        getWarrantyFormattedDate(warranty.laborExpirationDate)
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
                sx={defaultTableButton}
                onClick={() => openCreateWarrantyModal()}
              >
                Add New Warranty
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                sx={defaultTableButton}
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
