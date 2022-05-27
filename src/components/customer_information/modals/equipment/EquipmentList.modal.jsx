import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import {
  Backdrop,
  Box,
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

  return (
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
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ color: "teal" }}>
                Equipment List
              </Typography>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader size="small" aria-label="equipment list table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "170px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Equipment Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "170px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "170px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Model
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "170px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Serial
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "100px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Maintenance Expiration
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "100px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Parts Expiration
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "100px",
                      background: "teal",
                      color: "white",
                    }}
                  >
                    Labor Expiration
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "100px",
                      background: "teal",
                      color: "white",
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
                    <TableCell align="left">{unit.equipmentName}</TableCell>
                    <TableCell align="left">{unit.equipmentBrand}</TableCell>
                    <TableCell align="left">{unit.equipmentModel}</TableCell>
                    <TableCell align="left">{unit.equipmentSerial}</TableCell>
                    <TableCell align="left">{unit.equipmentContract}</TableCell>
                    <TableCell align="left">{unit.equipmentWarranty}</TableCell>
                    <TableCell align="left">{unit.laborWarranty}</TableCell>
                    <TableCell align="left">
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
              onClick={() => openCreateCustomerEquipmentModal()}
              variant="outlined"
              color="primary"
              sx={{ marginTop: "16px", marginLeft: "8px" }}
              startIcon={<AddCircle />}
            >
              Add New Equipment
            </Button>
            <Button
              onClick={() => closeEquipmentListModal()}
              variant="outlined"
              color="primary"
              sx={{ marginTop: "16px", marginLeft: "8px" }}
              startIcon={<Close />}
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EquipmentList;
