import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  getDateFromString,
  getUnixFromDate,
} from "../../../../utilities/dateUtils";

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
import { AddCircle, Close } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../../theme/Theme";

const style = {
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
        aria-labelledby="equipment-list-modal"
        aria-describedby="opens a customer equipment list"
        open={isEquipmentListModalOpen}
        onClose={closeEquipmentListModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isEquipmentListModalOpen}>
          <div style={style}>
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
                    <TableCell
                      align="left"
                      sx={{
                        minWidth: "170px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Equipment Name
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        minWidth: "170px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Brand
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        minWidth: "170px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Model
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        minWidth: "170px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Serial
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: "100px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Maintenance Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: "100px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Parts Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: "100px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Labor Expiration
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        minWidth: "100px",
                        background: lightTheme.palette.primary.light,
                        color: lightTheme.palette.primary.contrastText,
                        fontSize: 18,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
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
                      <TableCell
                        align="left"
                        sx={{
                          fontSize: 18,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {unit.equipmentName}
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
                        {unit.equipmentBrand}
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
                        {unit.equipmentModel}
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
                sx={{
                  marginTop: "16px",
                  marginLeft: "8px",
                }}
                startIcon={<AddCircle />}
              >
                Add New Equipment
              </Button>
              <Button
                onClick={() => closeEquipmentListModal()}
                variant="outlined"
                color="primary"
                sx={{
                  marginTop: "16px",
                  marginLeft: "8px",
                }}
                startIcon={<Close />}
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
