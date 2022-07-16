import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  getDateFromString,
  getUnixFromDate,
} from "../../../../utilities/dateUtils";

import {
  defaultBodyTableCell,
  defaultTableButton,
  getDefaultHeadTableCell,
  getRootModalStyle,
  greenBodyTableCell,
  lightTheme,
  redBodyTableCell,
} from "../../../../theme/Theme";

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
  Typography,
} from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";

const EquipmentList = ({
  customer,
  isEquipmentListModalOpen,
  closeEquipmentListModal,
  openEditCustomerEquipmentModal,
  openCreateCustomerEquipmentModal,
}) => {
  const db = getFirestore();
  const [equipment, setEquipment] = useState([]);

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
        aria-labelledby="equipment-list-modal"
        aria-describedby="opens a customer equipment list"
        open={isEquipmentListModalOpen}
        onClose={closeEquipmentListModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isEquipmentListModalOpen}>
          <div style={getRootModalStyle("70%")}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Equipment List
                </Typography>
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                size="small"
                aria-label="equipment list table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={getDefaultHeadTableCell(170)}>
                      Equipment Name
                    </TableCell>
                    <TableCell align="left" sx={getDefaultHeadTableCell(170)}>
                      Brand
                    </TableCell>
                    <TableCell align="left" sx={getDefaultHeadTableCell(170)}>
                      Model
                    </TableCell>
                    <TableCell align="left" sx={getDefaultHeadTableCell(170)}>
                      Serial
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(100)}>
                      Maintenance Expiration
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(100)}>
                      Parts Expiration
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(100)}>
                      Labor Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={getDefaultHeadTableCell(100)}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equipment.map((unit, index) => (
                    <TableRow
                      key={index}
                      onClick={() => openEditCustomerEquipmentModal(unit)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="left" sx={defaultBodyTableCell}>
                        {unit.equipmentName}
                      </TableCell>
                      <TableCell align="left" sx={defaultBodyTableCell}>
                        {unit.equipmentBrand}
                      </TableCell>
                      <TableCell align="left" sx={defaultBodyTableCell}>
                        {unit.equipmentModel}
                      </TableCell>
                      <TableCell align="left" sx={defaultBodyTableCell}>
                        {unit.equipmentSerial}
                      </TableCell>
                      {getStyledTableCell(unit.equipmentContract)}
                      {getStyledTableCell(unit.equipmentWarranty)}
                      {getStyledTableCell(unit.laborWarranty)}
                      <TableCell align="center">
                        <Button variant="outlined" color="primary">
                          Details
                        </Button>
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
                onClick={() => openCreateCustomerEquipmentModal()}
                variant="outlined"
                color="primary"
                startIcon={<AddCircleOutline />}
                sx={defaultTableButton}
              >
                Add New Equipment
              </Button>
              <Button
                onClick={() => closeEquipmentListModal()}
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                sx={defaultTableButton}
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

export default EquipmentList;
