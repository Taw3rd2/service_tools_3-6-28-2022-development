import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import {
  getFormattedDate,
  getFormattedTime,
} from "../../../utilities/dateUtils";

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

const style = {
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

const CustomerNote = ({
  isCustomerNoteModalOpen,
  closeCustomerNoteModal,
  customer,
  note,
}) => {
  console.log(note);
  const [currentTime, setCurrentTime] = useState(
    note.currentTime ? note.currentTime : new Date()
  );
  const [details, setDetails] = useState(note.details ? note.details : "");
  const [operator, setOperator] = useState(
    note.operator ? note.operator : "Thomas"
  );
  const [type, setType] = useState("Note");

  const [dispatchers, setDispatchers] = useState([]);

  useEffect(() => {
    let unSub = firebase
      .firestore()
      .collection("dispatchers")
      .onSnapshot(
        (snapshot) => {
          let newDispatchers = [];
          snapshot.forEach((doc) => {
            let dispatcher = doc.data();
            newDispatchers.push(dispatcher);
          });
          setDispatchers(newDispatchers);
        },
        (error) => {
          console.log(error);
        }
      );
    return () => unSub();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const newNoteDetails = {
      currentTime,
      details,
      operator,
      type,
    };

    if (note.id) {
      firebase
        .firestore()
        .collection("customers")
        .doc(customer.id)
        .collection("Activity")
        .doc(note.id)
        .update(newNoteDetails)
        .then(() => {
          closeCustomerNoteModal();
        });
    } else {
      firebase
        .firestore()
        .collection("customers")
        .doc(customer.id)
        .collection("Activity")
        .add(newNoteDetails)
        .then(() => {
          closeCustomerNoteModal();
        });
    }
  };

  return (
    <Modal
      aria-labelledby="customer-note"
      aria-describedby="modal for customer notes"
      open={isCustomerNoteModalOpen}
      onClose={closeCustomerNoteModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isCustomerNoteModalOpen}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom sx={{ color: "teal" }}>
                Customer Notes
              </Typography>
            </Grid>
          </Grid>

          <form onSubmit={onSubmit} autoComplete="new-password">
            <Grid container spacing={2} sx={{ marginTop: "8px" }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-note-type">Note Type</InputLabel>
                  <Select
                    labelId="select-note-type"
                    id="note_type"
                    value={type}
                    label="Note Type"
                    onChange={(event) => setType(event.target.value)}
                  >
                    <MenuItem key={0} value={"Phone"}>
                      Phone
                    </MenuItem>
                    <MenuItem key={1} value={"Note"}>
                      Note
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {dispatchers.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="select-operator">Operator</InputLabel>
                    <Select
                      labelId="select-operator"
                      id="operator"
                      value={operator}
                      label="Operator"
                      onChange={(event) => setOperator(event.target.value)}
                    >
                      {dispatchers
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((dispatcher) => (
                          <MenuItem key={dispatcher.id} value={dispatcher.name}>
                            {dispatcher.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time"
                  value={getFormattedTime(currentTime)}
                  fullWidth
                  onChange={(event) => setCurrentTime(event.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  value={getFormattedDate(currentTime)}
                  fullWidth
                  onChange={(event) => setCurrentTime(event.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Details"
                  variant="outlined"
                  value={details}
                  fullWidth
                  onChange={(event) => setDetails(event.target.value)}
                  multiline={true}
                  rows="5"
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
                onClick={() => closeCustomerNoteModal()}
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

export default CustomerNote;
