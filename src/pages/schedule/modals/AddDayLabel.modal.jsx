import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

import { createUnNamedDocument } from "../../../firebase/firestore.utils";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddDayLabel = ({
  isAddDayLabelModalOpen,
  closeAddDayLabelModal,
  calendarDateSelected,
}) => {
  const db = getFirestore();

  const [technicians, setTechnicians] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [tech, setTech] = useState("");
  const labelDate = calendarDateSelected;

  useEffect(
    () =>
      onSnapshot(collection(db, "technicians"), (snapshot) =>
        setTechnicians(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const newLabel = {
      labelDate,
      locationName,
      tech,
    };
    createUnNamedDocument(collection(db, "calLabel"), newLabel).then(() =>
      closeAddDayLabelModal()
    );
  };

  return (
    <Modal
      aria-labelledby="add-day-label-modal"
      aria-describedby="modal for adding a day label"
      open={isAddDayLabelModalOpen}
      onClose={closeAddDayLabelModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isAddDayLabelModalOpen}>
        <Box sx={modalStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ color: "teal" }}>
                Add New Day Label
              </Typography>
            </Grid>
          </Grid>

          <form onSubmit={onSubmit} autoComplete="new-password">
            <Grid container spacing={2} sx={{ marginTop: "8px" }}>
              <Grid item xs={6}>
                {technicians.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="select-tech-lead">Tech Lead</InputLabel>
                    <Select
                      labelId="select-tech-lead"
                      id="tech-lead"
                      value={tech}
                      label="Tech Lead"
                      onChange={(event) => setTech(event.target.value)}
                      inputProps={{ tabIndex: "1" }}
                    >
                      {technicians
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((technician) => (
                          <MenuItem key={technician.id} value={technician.name}>
                            {technician.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Location Name"
                  fullWidth
                  value={locationName}
                  onChange={(event) => setLocationName(event.target.value)}
                  inputProps={{ tabIndex: "2" }}
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
                startIcon={<ArrowUpward />}
              >
                Submit
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                type="button"
                variant="outlined"
                onClick={() => closeAddDayLabelModal()}
                startIcon={<Close />}
              >
                Close
              </Button>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddDayLabel;
