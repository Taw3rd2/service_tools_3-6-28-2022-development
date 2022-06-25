import React, { useState } from "react";
import { getFirestore, collection, doc } from "firebase/firestore";

import {
  createUnNamedDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

import { ChromePicker } from "react-color";

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
import { lightTheme } from "../../../theme/Theme";

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

const Technician = ({
  isTechnicianModalOpen,
  closeTechnicianModal,
  technician,
}) => {
  const db = getFirestore();

  const [color, setColor] = useState(technician ? technician.color : "");
  const [email, setEmail] = useState(technician ? technician.email : "");
  const [name, setName] = useState(technician ? technician.name : "");

  const [showPicker, setShowPicker] = useState(false);
  const toggleColorPicker = () => setShowPicker(!showPicker);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { color, email, name };
    if (technician) {
      console.log("technician: ", data);
      updateDocument(doc(db, "technicians", technician.id), data).then(() => {
        closeTechnicianModal();
      });
    } else {
      createUnNamedDocument(collection(db, "technicians"), data).then(() => {
        closeTechnicianModal();
      });
    }
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="technician-modal"
        aria-describedby="modal for technician edits"
        open={isTechnicianModalOpen}
        onClose={closeTechnicianModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isTechnicianModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  {technician
                    ? `Edit Technician ${technician.name}`
                    : "New Technician"}
                </Typography>
              </Grid>
            </Grid>

            <form onSubmit={onSubmit} autoComplete="new password">
              <Grid container spacing={2} sc={{ marginTop: "8px" }}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    value={name}
                    fullWidth
                    color="primary"
                    sx={{ marginTop: "16px" }}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    value={email}
                    fullWidth
                    color="primary"
                    sx={{ marginTop: "16px" }}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={toggleColorPicker}
                    fullWidth
                    sx={{
                      padding: "12px",
                      marginTop: "16px",
                      marginBottom: "16px",
                      backgroundColor: `${color}`,
                      color: "white",
                    }}
                  >
                    Set Technician Color
                  </Button>
                  {showPicker && (
                    <ChromePicker
                      style={{ marginTop: "8px" }}
                      onChangeComplete={(color) => {
                        setColor(color.hex);
                      }}
                      color={color}
                    />
                  )}
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
                  }}
                  color="primary"
                  type="submit"
                  variant="outlined"
                  startIcon={<ArrowUpward />}
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
                  onClick={() => closeTechnicianModal()}
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

export default Technician;
