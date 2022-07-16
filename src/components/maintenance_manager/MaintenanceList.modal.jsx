import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  getFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../utilities/dateUtils";

import {
  defaultBodyTableCell,
  defaultTableButton,
  getDefaultHeadTableCell,
  getRootModalStyle,
  greenBodyTableCell,
  lightTheme,
  redBodyTableCell,
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

const MaintenanceList = ({
  isMaintenanceListModalOpen,
  closeMaintenanceListModal,
  openCreateMaintenanceModal,
  openMaintenanceDetailsModal,
  customer,
}) => {
  const db = getFirestore();

  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "customers", customer.id, "Maintenance"),
      (snapshot) => {
        setMaintenance(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
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

  const getCompletedTableCell = (stringValue) => {
    if (stringValue === "Not done yet") {
      return (
        <TableCell align="center" sx={redBodyTableCell}>
          <strong>{stringValue}</strong>
        </TableCell>
      );
    } else {
      return (
        <TableCell align="center" sx={greenBodyTableCell}>
          <strong>{stringValue}</strong>
        </TableCell>
      );
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="maintenance-list"
        aria-describedby="modal for maintenance list"
        open={isMaintenanceListModalOpen}
        onClose={closeMaintenanceListModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isMaintenanceListModalOpen}>
          <div style={getRootModalStyle("70%")}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Maintenance Contracts
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
                      Contract Number
                    </TableCell>
                    <TableCell align="left" sx={getDefaultHeadTableCell(350)}>
                      Equipment Name
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Start Date
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Sale Price
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Expiration Date
                    </TableCell>
                    <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                      Maintenance Completed
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
                  {maintenance.map((maint, index) => (
                    <TableRow
                      key={maint.id}
                      sx={{ cursor: "pointer" }}
                      onClick={() => openMaintenanceDetailsModal(maint)}
                    >
                      <TableCell align="center" sx={defaultBodyTableCell}>
                        {maint.mNumber}
                      </TableCell>
                      <TableCell align="left" sx={defaultBodyTableCell}>
                        {maint.equipmentName}
                      </TableCell>
                      <TableCell align="center" sx={defaultBodyTableCell}>
                        {getFormattedDate(maint.saleDate)}
                      </TableCell>
                      <TableCell align="center" sx={defaultBodyTableCell}>
                        {maint.salePrice}
                      </TableCell>
                      {getStyledTableCell(
                        getFormattedDate(maint.expirationDate)
                      )}
                      {getCompletedTableCell(
                        getFormattedDate(maint.completedDate)
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
                onClick={() => openCreateMaintenanceModal()}
              >
                Add New Maintenance
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                sx={defaultTableButton}
                onClick={() => closeMaintenanceListModal()}
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

export default MaintenanceList;
