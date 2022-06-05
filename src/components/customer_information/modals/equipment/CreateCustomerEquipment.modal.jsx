import React, { useState } from "react";
import { doc, getFirestore } from "firebase/firestore";
import { createNamedDocument } from "../../../../firebase/firestore.utils";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";
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

const CreateCustomerEquipment = ({
  customer,
  isCreateCustomerEquipmentModalOpen,
  closeCreateCustomerEquipmentModal,
}) => {
  const db = getFirestore();

  const equipmentWarranty = "";
  const equipmentLabor = "";
  const equipmentContract = "";
  const equipmentNotes = "";

  const [equipmentBrand, setEquipmentBrand] = useState("");
  const [equipmentBtu, setEquipmentBtu] = useState("");
  const [equipmentEff, setEquipmentEff] = useState("");
  const [equipmentFuel, setEquipmentFuel] = useState("");
  const [equipmentModel, setEquipmentModel] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentSerial, setEquipmentSerial] = useState("");
  const [equipmentVoltage, setEquipmentVoltage] = useState("");

  const submitNewEquipment = async (e) => {
    e.preventDefault();
    const payload = {
      customerId: customer.id,
      equipmentWarranty,
      equipmentLabor,
      equipmentContract,
      equipmentNotes,
      equipmentBrand,
      equipmentBtu,
      equipmentEff,
      equipmentFuel,
      equipmentModel,
      equipmentName,
      equipmentSerial,
      equipmentVoltage,
    };
    const docReference = doc(
      db,
      "customers",
      customer.id,
      "Equipment",
      equipmentName
    );
    createNamedDocument(docReference, payload).then(() => {
      closeCreateCustomerEquipmentModal();
    });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="create-customer-equipment"
        aria-describedby="modal to create customer equipment"
        open={isCreateCustomerEquipmentModalOpen}
        onClose={closeCreateCustomerEquipmentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isCreateCustomerEquipmentModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Create Customer Equipment
                </Typography>
              </Grid>
            </Grid>

            <form onSubmit={submitNewEquipment} autoComplete="new-password">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Name"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                    inputProps={{ tabIndex: "1" }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Brand"
                    value={equipmentBrand}
                    onChange={(e) => setEquipmentBrand(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Model"
                    value={equipmentModel}
                    onChange={(e) => setEquipmentModel(e.target.value)}
                    inputProps={{ tabIndex: "3" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Serial"
                    value={equipmentSerial}
                    onChange={(e) => setEquipmentSerial(e.target.value)}
                    inputProps={{ tabIndex: "4" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Size"
                    value={equipmentBtu}
                    onChange={(e) => setEquipmentBtu(e.target.value)}
                    inputProps={{ tabIndex: "5" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Efficiency"
                    value={equipmentEff}
                    onChange={(e) => setEquipmentEff(e.target.value)}
                    inputProps={{ tabIndex: "6" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Fuel or Freon Type"
                    value={equipmentFuel}
                    onChange={(e) => setEquipmentFuel(e.target.value)}
                    inputProps={{ tabIndex: "7" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Equipment Voltage"
                    value={equipmentVoltage}
                    onChange={(e) => setEquipmentVoltage(e.target.value)}
                    inputProps={{ tabIndex: "8" }}
                    fullWidth
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
                  sx={{ marginLeft: "8px" }}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  tabIndex={9}
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  sx={{ marginLeft: "8px" }}
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => closeCreateCustomerEquipmentModal()}
                  tabIndex={10}
                  startIcon={<Close />}
                >
                  Close
                </Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default CreateCustomerEquipment;
