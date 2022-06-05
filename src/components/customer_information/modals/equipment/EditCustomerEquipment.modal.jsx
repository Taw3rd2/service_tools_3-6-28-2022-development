import React, { useState } from "react";
import { doc, getFirestore } from "firebase/firestore";
import {
  createNamedDocument,
  deleteDocument,
  updateDocument,
} from "../../../../firebase/firestore.utils";

import { getDateFromString } from "../../../../utilities/dateUtils";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close, Delete } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../../theme/Theme";

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

const EditCustomerEquipment = ({
  equipmentSelected,
  isEditCustomerEquipmentOpen,
  closeEditCustomerEquipmentModal,
  openDeleteEquipmentModal,
}) => {
  const db = getFirestore();

  const [equipmentBrand, setEquipmentBrand] = useState(
    equipmentSelected.equipmentBrand ? equipmentSelected.equipmentBrand : ""
  );
  const [equipmentBtu, setEquipmentBtu] = useState(
    equipmentSelected.equipmentBtu ? equipmentSelected.equipmentBtu : ""
  );
  const [equipmentEff, setEquipmentEff] = useState(
    equipmentSelected.equipmentEff ? equipmentSelected.equipmentEff : ""
  );
  const [equipmentFuel, setEquipmentFuel] = useState(
    equipmentSelected.equipmentFuel ? equipmentSelected.equipmentFuel : ""
  );
  const [equipmentModel, setEquipmentModel] = useState(
    equipmentSelected.equipmentModel ? equipmentSelected.equipmentModel : ""
  );
  const [equipmentName, setEquipmentName] = useState(
    equipmentSelected.equipmentName ? equipmentSelected.equipmentName : ""
  );
  const [equipmentNotes, setEquipmentNotes] = useState(
    equipmentSelected.equipmentNotes
      ? equipmentSelected.equipmentNotes
      : "No notes yet.."
  );
  const [equipmentSerial, setEquipmentSerial] = useState(
    equipmentSelected.equipmentSerial ? equipmentSelected.equipmentSerial : ""
  );
  const [equipmentVoltage, setEquipmentVoltage] = useState(
    equipmentSelected.equipmentVoltage ? equipmentSelected.equipmentVoltage : ""
  );

  const onSubmitEquipmentUpdates = async (event) => {
    event.preventDefault();
    const payload = {
      customerId: equipmentSelected.customerId,
      equipmentBrand,
      equipmentBtu,
      equipmentContract: equipmentSelected.equipmentContract,
      equipmentEff,
      equipmentFuel,
      equipmentLabor: equipmentSelected.equipmentLabor
        ? equipmentSelected.equipmentLabor
        : "",
      equipmentModel,
      equipmentName,
      equipmentNotes,
      equipmentSerial,
      equipmentVoltage,
      equipmentWarranty: equipmentSelected.equipmentWarranty
        ? equipmentSelected.equipmentWarranty
        : "",
      key: equipmentName,
      laborWarranty: equipmentSelected.laborWarranty
        ? equipmentSelected.laborWarranty
        : "",
    };

    if (
      equipmentSelected.warranty &&
      Object.keys(equipmentSelected.warranty).length > 0
    ) {
      payload.warranty = {};
      payload.warranty.equipment = equipmentName;
      payload.warranty.equipmentBrand = equipmentBrand;
      payload.warranty.equipmentModel = equipmentModel;
      payload.warranty.equipmentName = equipmentName;
      payload.warranty.equipmentSerial = equipmentSerial;
      payload.warranty.jobNumber = equipmentSelected.warranty.jobNumber;
      payload.warranty.key = equipmentName;
      payload.warranty.laborExpirationDate = getDateFromString(
        equipmentSelected.warranty.laborExpirationDate
      );
      payload.warranty.partsExpirationDate = getDateFromString(
        equipmentSelected.warranty.partsExpirationDate
      );
      payload.warranty.startDate = getDateFromString(
        equipmentSelected.warranty.startDate
      );
    } else {
      console.log("Equipment has no Warranty associated.");
    }

    const existingDocumentReference = doc(
      db,
      "customers",
      equipmentSelected.customerId,
      "Equipment",
      equipmentSelected.equipmentName
    );

    const newDocumentReference = doc(
      db,
      "customers",
      equipmentSelected.customerId,
      "Equipment",
      payload.equipmentName
    );

    if (equipmentSelected.equipmentName === payload.equipmentName) {
      updateDocument(existingDocumentReference, payload).then(() => {
        closeEditCustomerEquipmentModal();
      });
    } else {
      console.log(
        "The Equipment Name had changed. We will delete the old object and add a new one."
      );
      deleteDocument(existingDocumentReference).then(() => {
        createNamedDocument(newDocumentReference, payload).then(() => {
          closeEditCustomerEquipmentModal();
        });
      });
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="edit-customer-equipment"
        aria-describedby="modal to edit customer equipment"
        open={isEditCustomerEquipmentOpen}
        onClose={closeEditCustomerEquipmentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isEditCustomerEquipmentOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Customer Equipment
                </Typography>
              </Grid>
            </Grid>

            <form
              onSubmit={onSubmitEquipmentUpdates}
              autoComplete="new-password"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentName}
                    label="Name"
                    fullWidth
                    onChange={(e) => setEquipmentName(e.target.value)}
                    inputProps={{ tabIndex: "1" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentBrand}
                    label="Brand"
                    fullWidth
                    onChange={(e) => setEquipmentBrand(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentModel}
                    label="Equipment Model Number"
                    fullWidth
                    onChange={(e) => setEquipmentModel(e.target.value)}
                    inputProps={{ tabIndex: "3" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentSerial}
                    label="Equipment Serial Number"
                    fullWidth
                    onChange={(e) => setEquipmentSerial(e.target.value)}
                    inputProps={{ tabIndex: "4" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentEff}
                    label="Equipment Efficiency"
                    fullWidth
                    onChange={(e) => setEquipmentEff(e.target.value)}
                    inputProps={{ tabIndex: "5" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentVoltage}
                    label="Equipment Voltage"
                    fullWidth
                    onChange={(e) => setEquipmentVoltage(e.target.value)}
                    inputProps={{ tabIndex: "6" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentFuel}
                    label="Equipment Fuel/Freon"
                    fullWidth
                    onChange={(e) => setEquipmentFuel(e.target.value)}
                    inputProps={{ tabIndex: "7" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={equipmentBtu}
                    label="Equipment Size"
                    fullWidth
                    onChange={(e) => setEquipmentBtu(e.target.value)}
                    inputProps={{ tabIndex: "8" }}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "16px" }}>
                  <TextField
                    value={equipmentNotes}
                    label="Equipment Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    onChange={(e) => setEquipmentNotes(e.target.value)}
                    inputProps={{ tabIndex: "9" }}
                  />
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
                    color: "red",
                  }}
                  color="inherit"
                  onClick={() => openDeleteEquipmentModal()}
                  variant="outlined"
                  tabIndex={14}
                  startIcon={<Delete />}
                >
                  Delete Equipment
                </Button>
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  variant="outlined"
                  tabIndex={15}
                  type="submit"
                  startIcon={<ArrowUpward />}
                >
                  Save Changes
                </Button>

                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  onClick={() => closeEditCustomerEquipmentModal()}
                  color="primary"
                  variant="outlined"
                  tabIndex={16}
                  startIcon={<Close />}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default EditCustomerEquipment;
