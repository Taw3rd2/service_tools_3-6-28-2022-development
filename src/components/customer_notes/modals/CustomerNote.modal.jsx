import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, doc } from "firebase/firestore";

import {
  createUnNamedDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

import {
  getFormattedDate,
  getFormattedTime,
} from "../../../utilities/dateUtils";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

import {
  Backdrop,
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
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const CustomerNote = ({
  isCustomerNoteModalOpen,
  closeCustomerNoteModal,
  customer,
  note,
}) => {
  const db = getFirestore();

  const [currentTime, setCurrentTime] = useState(
    note.currentTime ? note.currentTime : new Date()
  );
  const [details, setDetails] = useState(note.details ? note.details : "");
  const [operator, setOperator] = useState(
    note.operator ? note.operator : "Thomas"
  );
  const [type, setType] = useState("Note");

  const [dispatchers, setDispatchers] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "dispatchers"), (snapshot) =>
        setDispatchers(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const newNoteDetails = {
      currentTime,
      details,
      operator,
      type,
    };

    if (note.id) {
      console.log("newNoteDetails", newNoteDetails);
      updateDocument(
        doc(db, "customers", customer.id, "Activity", note.id),
        newNoteDetails
      ).then(() => {
        closeCustomerNoteModal();
      });
    } else {
      createUnNamedDocument(
        collection(db, "customers", customer.id, "Activity"),
        newNoteDetails
      ).then(() => {
        closeCustomerNoteModal();
      });
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
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
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Customer Notes
                </Typography>
              </Grid>
            </Grid>

            <form onSubmit={onSubmit} autoComplete="new-password">
              <Grid container spacing={2} sx={{ marginTop: "8px" }}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="select-note-type"
                      sx={{ color: lightTheme.palette.primary.light }}
                    >
                      Note Type
                    </InputLabel>
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
                      <InputLabel
                        id="select-operator"
                        sx={{ color: lightTheme.palette.primary.light }}
                      >
                        Operator
                      </InputLabel>
                      <Select
                        labelId="select-operator"
                        id="operator"
                        value={operator}
                        label="Operator"
                        color="primary"
                        onChange={(event) => setOperator(event.target.value)}
                      >
                        {dispatchers
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((dispatcher, index) => (
                            <MenuItem key={index} value={dispatcher.name}>
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
                    color="primary"
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
                    sx={{ input: { color: "teal" } }}
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
                  onClick={() => closeCustomerNoteModal()}
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

export default CustomerNote;
