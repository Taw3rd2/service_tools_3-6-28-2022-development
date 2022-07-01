import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  getFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../utilities/dateUtils";

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
import { AddCircleOutline, Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

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

  const getCompletedTableCell = (stringValue) => {
    if (stringValue === "Not done yet") {
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
          <strong>{stringValue}</strong>
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
          <div style={modalStyle}>
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
                      Contract Number
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
                      Equipment Name
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
                      Sale Price
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
                      Expiration Date
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
                      Maintenance Completed
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
                  {maintenance.map((maint, index) => (
                    <TableRow
                      key={maint.id}
                      sx={{ cursor: "pointer" }}
                      onClick={() => openMaintenanceDetailsModal()}
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
                        {maint.mNumber}
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
                        {maint.equipmentName}
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
                        {getFormattedDate(maint.saleDate)}
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
                sx={{
                  marginTop: "16px",
                  marginLeft: "8px",
                  background: lightTheme.palette.primary.contrastText,
                }}
                onClick={() => openCreateMaintenanceModal()}
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
