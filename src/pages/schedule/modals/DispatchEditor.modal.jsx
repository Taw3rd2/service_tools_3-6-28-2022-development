import React, { useEffect, useState } from "react";

import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import {
  createUnNamedDocument,
  deleteDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

import { useNavigate } from "react-router-dom";

import { setDateToZeroHours } from "../../../utilities/dateUtils";
import {
  compareEvents,
  compareHelper,
  compareLead,
  finalUpdate,
} from "../../../utilities/scheduleUtils";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close, Print } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DispatchEditor = ({
  isDispatchEditorModalOpen,
  closeDispatchEditorModal,
  selectedDispatch,
  openJobCompletedModal,
}) => {
  const db = getFirestore();
  const navigate = useNavigate();

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
  const [workList, setWorkList] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "workList"), (snapshot) =>
        setWorkList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    [db]
  );
  const [technicians, setTechnicians] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "technicians"), (snapshot) =>
        setTechnicians(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );
  const [payments, setPayments] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "payments"), (snapshot) =>
        setPayments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    [db]
  );

  const customerId = selectedDispatch.extendedProps.customerId;
  const dateCreated = selectedDispatch.extendedProps.dateCreated;
  const dateScheduled = selectedDispatch.extendedProps.dateScheduled;
  const dateModified = selectedDispatch.extendedProps.dateModified;
  const id = selectedDispatch.id;
  const techHelperId = selectedDispatch.extendedProps.techHelperId
    ? selectedDispatch.extendedProps.techHelperId
    : "";
  const status = selectedDispatch.extendedProps.status;
  const scheduledDate = selectedDispatch.extendedProps.scheduledDate;
  const end = selectedDispatch.end;
  const title = selectedDispatch.title;
  const localInvoiceId =
    selectedDispatch.extendedProps.invoiceId !== undefined
      ? selectedDispatch.extendedProps.invoiceId
      : "";

  const [altPhoneName, setAltPhoneName] = useState(
    selectedDispatch.extendedProps.altPhoneName
      ? selectedDispatch.extendedProps.altPhoneName
      : ""
  );
  const [altphone, setAltPhone] = useState(
    selectedDispatch.extendedProps.altphone
      ? selectedDispatch.extendedProps.altphone
      : ""
  );
  const [city, setCity] = useState(
    selectedDispatch.extendedProps.city
      ? selectedDispatch.extendedProps.city
      : ""
  );
  const [firstname, setFirstName] = useState(
    selectedDispatch.extendedProps.firstname
      ? selectedDispatch.extendedProps.firstname
      : ""
  );
  //const localInvoiceId = invoiceId !== undefined ? invoiceId : "";
  const [issue, setIssue] = useState(
    selectedDispatch.extendedProps.issue
      ? selectedDispatch.extendedProps.issue
      : ""
  );
  const [jobNumber, setJobNumber] = useState(
    selectedDispatch.extendedProps.jobNumber
      ? selectedDispatch.extendedProps.jobNumber
      : ""
    // invoiceData
    //   ? `${invoiceData.invoiceNumberPrefix}${invoiceData.userCreatedjobNumber}`
    //   : ""
  );
  const [lastname, setLastName] = useState(
    selectedDispatch.extendedProps.lastname
      ? selectedDispatch.extendedProps.lastname
      : ""
  );
  const [leadSource, setLeadSource] = useState(
    selectedDispatch.extendedProps.leadSource
      ? selectedDispatch.extendedProps.leadSource
      : "PC"
  );
  const [notes, setNotes] = useState(
    selectedDispatch.extendedProps.notes
      ? selectedDispatch.extendedProps.notes
      : ""
    //   invoiceData
    //     ? `Collect balance due: ${toCurrency(invoiceData.balanceDue.amount)}`
    //     : ""
  );
  const [payment, setPayment] = useState(
    selectedDispatch.extendedProps.payment
      ? selectedDispatch.extendedProps.payment
      : "C.O.D."
  );
  const [phone, setPhone] = useState(
    selectedDispatch.extendedProps.phone
      ? selectedDispatch.extendedProps.phone
      : ""
  );
  const [phoneName, setPhoneName] = useState(
    selectedDispatch.extendedProps.phoneName
      ? selectedDispatch.extendedProps.phoneName
      : ""
  );
  const [shorthand, setShorthand] = useState(
    selectedDispatch.extendedProps.shorthand
      ? selectedDispatch.extendedProps.shorthand
      : ""
  );
  const [start, setStart] = useState(
    selectedDispatch.start
      ? selectedDispatch.start
      : setDateToZeroHours(new Date())
  );
  const [street, setStreet] = useState(
    selectedDispatch.extendedProps.street
      ? selectedDispatch.extendedProps.street
      : ""
  );
  const [takenBy, setTakenBy] = useState(
    selectedDispatch.extendedProps.takenBy
      ? selectedDispatch.extendedProps.takenBy
      : ""
  );
  const [techHelper, setTechHelper] = useState(
    selectedDispatch.extendedProps.techHelper
      ? selectedDispatch.extendedProps.techHelper
      : "NONE"
  );
  const [techLead, setTechLead] = useState(
    selectedDispatch.extendedProps.techLead
      ? selectedDispatch.extendedProps.techLead
      : ""
  );
  const [timeAlotted, setTimeAlotted] = useState(
    selectedDispatch.extendedProps.timeAlotted
      ? selectedDispatch.extendedProps.timeAlotted
      : "1.5"
  );
  const [timeOfDay, setTimeOfDay] = useState(
    selectedDispatch.extendedProps.timeOfDay
      ? selectedDispatch.extendedProps.timeOfDay
      : "Anytime"
  );

  const onSubmit = (event) => {
    event.preventDefault();
    if (status === "done" || status === "parts") {
      console.log("status: ", status);
      openJobCompletedModal();
    } else {
      const updatedDispatch = {
        altphone,
        altPhoneName,
        city,
        customerId,
        dateCreated,
        dateModified,
        dateScheduled,
        end,
        firstname,
        id,
        invoiceId: localInvoiceId,
        issue,
        jobNumber,
        lastname,
        leadSource,
        notes,
        payment,
        phone,
        phoneName,
        scheduledDate,
        shorthand,
        start,
        status,
        street,
        takenBy,
        techHelper,
        techHelperId,
        techLead,
        timeAlotted,
        timeOfDay,
        title,
      };
      console.log("updated dispatch object 1", updatedDispatch);
      //compare old dispatch with changes to see if techs changed
      const noTechChange = compareEvents(
        selectedDispatch.extendedProps,
        updatedDispatch
      );
      if (noTechChange === true) {
        console.log("no tech change");
        if (
          selectedDispatch.extendedProps.techHelperId === "" ||
          selectedDispatch.extendedProps.techHelperId === undefined
        ) {
          console.log("there is no extra dispatch to change");
          // update the original dispatch only
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateDocument(
            doc(db, "events", eventToUpdate.id),
            eventToUpdate
          ).then(() => closeDispatchEditorModal());
        } else {
          console.log("there is a extra dispatch to update");
          //update the first dispatch
          const firstEventToUpdate = finalUpdate(updatedDispatch);
          updateDocument(
            doc(db, "events", firstEventToUpdate.id),
            firstEventToUpdate
          ).then(() => console.log("first event updated"));
          //update the second dispatch
          let newEvent = { ...updatedDispatch };
          newEvent.id = updatedDispatch.techHelperId;
          newEvent.techLead = updatedDispatch.techHelper;
          newEvent.techHelper = updatedDispatch.techLead;
          newEvent.techHelperId = updatedDispatch.id;
          const secondEventToUpdate = finalUpdate(newEvent);
          updateDocument(
            doc(db, "events", secondEventToUpdate.id),
            secondEventToUpdate
          ).then(() => closeDispatchEditorModal());
          //updateDispatchSuccessIndicator();
          closeDispatchEditorModal();
        }
      } else {
        console.log("techs have changed");
        //decide if techLead or techHelper has changed (boolean)
        const helperHasChanged = compareHelper(
          selectedDispatch.extendedProps,
          updatedDispatch
        );
        const leadHasChanged = compareLead(
          selectedDispatch.extendedProps,
          updatedDispatch
        );

        if (helperHasChanged === false) {
          console.log("helper has not changed");
        } else {
          console.log("helper has changed");
          //what has the techHelper changed to?
          if (updatedDispatch.techHelper === "NONE") {
            console.log("techHelper === NONE");
            if (
              selectedDispatch.extendedProps.techHelperId === "" ||
              selectedDispatch.extendedProps.techHelperId === undefined
            ) {
              //TODO: is the original dispatch getting updated here? or maybe its not possible to have this situation?
              console.log(
                "techHelper changed to NONE but there is no second dispatch to delete"
              );
            } else {
              console.log(
                "techHelper changed to NONE and there is a second dispatch to delete"
              );
              const eventToDelete = {
                id: selectedDispatch.extendedProps.techHelperId,
              };
              deleteDocument(doc(db, "events", eventToDelete.id)).then(() =>
                console.log("event deleted")
              );
              const eventWithNoTechHelperId = { ...updatedDispatch };
              eventWithNoTechHelperId.techHelperId = "";
              const changedEvent = finalUpdate(eventWithNoTechHelperId);
              updateDocument(
                doc(db, "events", changedEvent.id),
                changedEvent
              ).then(() => closeDispatchEditorModal());
              //updateDispatchSuccessIndicator();
            }
          } else {
            if (
              selectedDispatch.extendedProps.techHelperId === "" ||
              selectedDispatch.extendedProps.techHelperId === undefined
            ) {
              console.log(
                "techHelper changed to another tech but there is no second dispatch to change"
              );
              let newEvent = { ...updatedDispatch };
              const docForId = doc(collection(db, "events"));
              const generatedId = docForId.id;
              newEvent.techHelper = updatedDispatch.techLead;
              newEvent.techLead = updatedDispatch.techHelper;
              newEvent.id = generatedId;
              newEvent.techHelperId = selectedDispatch.id;
              const eventToUpdate = finalUpdate(newEvent);
              createUnNamedDocument(
                collection(db, "events", eventToUpdate)
              ).then(() => console.log("added event"));
              const originalEvent = { ...updatedDispatch };
              originalEvent.techHelperId = generatedId;
              const originalEventToUpdate = finalUpdate(originalEvent);
              updateDocument(
                doc(db, "events", originalEventToUpdate.id),
                originalEventToUpdate
              ).then(() => closeDispatchEditorModal());
              //updateDispatchSuccessIndicator();
            } else {
              console.log(
                "techHelper changed to another tech and there is a second dispatch",
                selectedDispatch.extendedProps.techHelperId
              );
              const firstEventToUpdate = finalUpdate(updatedDispatch);
              updateDocument(
                doc(db, "events", firstEventToUpdate.id),
                firstEventToUpdate
              ).then(() => console.log("updated first event"));
              let newEvent = { ...updatedDispatch };
              newEvent.id = updatedDispatch.techHelperId;
              newEvent.techLead = updatedDispatch.techHelper;
              newEvent.techHelper = updatedDispatch.techLead;
              newEvent.techHelperId = updatedDispatch.id;
              const secondEventToUpdate = finalUpdate(newEvent);
              updateDocument(
                doc(db, "events", secondEventToUpdate.id),
                secondEventToUpdate
              ).then(() => closeDispatchEditorModal());
              //updateDispatchSuccessIndicator();
            }
          }
        }

        if (leadHasChanged === false) {
          console.log("lead has not changed");
        } else {
          console.log("lead has changed");
          const eventToUpdate = finalUpdate(updatedDispatch);
          updateDocument(
            doc(db, "events", eventToUpdate.id),
            eventToUpdate
          ).then(() => closeDispatchEditorModal());
          //updateDispatchSuccessIndicator();
          if (
            selectedDispatch.extendedProps.techHelperId === "" ||
            selectedDispatch.extendedProps.techHelperId === undefined
          ) {
            console.log(
              "techLead has changed but there is no techHelper event to update"
            );
          } else {
            console.log(
              "techLead has changed and there is a techHelper event to change"
            );

            let newEvent = { ...updatedDispatch };
            newEvent.id = updatedDispatch.techHelperId;
            newEvent.techLead = updatedDispatch.techHelper;
            newEvent.techHelper = updatedDispatch.techLead;
            newEvent.techHelperId = updatedDispatch.id;
            const eventToUpdate = finalUpdate(newEvent);
            console.log("eventToUpdate: ", eventToUpdate);
            updateDocument(
              doc(db, "events", eventToUpdate.id),
              eventToUpdate
            ).then(() => closeDispatchEditorModal());
            // updateDispatchSuccessIndicator();
          }
        }
      }
    }
  };

  const routeToPrintOneDispatch = () => {
    const dispatchToPush = {
      altphone,
      altPhoneName,
      city,
      customerId,
      dateCreated,
      dateModified,
      dateScheduled,
      end,
      firstname,
      id,
      issue,
      jobNumber,
      lastname,
      leadSource,
      notes,
      payment,
      phone,
      phoneName,
      scheduledDate,
      shorthand,
      start,
      status,
      street,
      takenBy,
      techHelper,
      techHelperId,
      techLead,
      timeAlotted,
      timeOfDay,
      title,
    };
    navigate(`/print_one_slip/${id}`, {
      state: dispatchToPush,
    });
  };

  const handleIssueChange = (event) => {
    const { value } = event.target;
    setIssue(value);
    const option = workList.filter((i) => value.includes(i.item));
    setShorthand(option[0].shorthand);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="edit-dispatch-modal"
        aria-describedby="modal to edit a dispatch"
        open={isDispatchEditorModalOpen}
        onClose={closeDispatchEditorModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDispatchEditorModalOpen}>
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  gutterBottom
                  color="primary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Dispatch Editor
                  <IconButton
                    sx={{ marginLeft: "auto" }}
                    color="primary"
                    onClick={() => routeToPrintOneDispatch()}
                  >
                    <Print fontSize="large" />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={onSubmit} autoComplete="new-password">
              <Grid container spacing={2} style={{ marginTop: "4px" }}>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Scheduled Date"
                      fullWidth
                      value={start}
                      onChange={(newValue) => {
                        setStart(newValue);
                      }}
                      inputProps={{ tabIndex: "1" }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Lead Source"
                    value={leadSource}
                    fullWidth
                    required
                    onChange={(event) => setLeadSource(event.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  {dispatchers.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-operator">Dispatcher</InputLabel>
                      <Select
                        labelId="select-operator"
                        id="operator"
                        value={takenBy}
                        label="Dispatcher"
                        onChange={(event) => setTakenBy(event.target.value)}
                        inputProps={{ tabIndex: "3" }}
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
                    label="First Name"
                    fullWidth
                    value={firstname}
                    onChange={(event) => setFirstName(event.target.value)}
                    inputProps={{ tabIndex: "4" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    required
                    value={lastname}
                    onChange={(event) => setLastName(event.target.value)}
                    inputProps={{ tabIndex: "5" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Job Address"
                    fullWidth
                    required
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    inputProps={{ tabIndex: "6" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City, State, Zip Code"
                    fullWidth
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    inputProps={{ tabIndex: "7" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Primary Contact"
                    fullWidth
                    value={phoneName}
                    onChange={(event) => setPhoneName(event.target.value)}
                    inputProps={{ tabIndex: "8" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Alternate Contact"
                    fullWidth
                    value={altPhoneName}
                    onChange={(event) => setAltPhoneName(event.target.value)}
                    inputProps={{ tabIndex: "10" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Primary Phone Number"
                    fullWidth
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    inputProps={{ tabIndex: "9" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Alternate Phone Number"
                    fullWidth
                    value={altphone}
                    onChange={(event) => setAltPhone(event.target.value)}
                    inputProps={{ tabIndex: "11" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  {workList.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-work-ordered">
                        Work Ordered
                      </InputLabel>
                      <Select
                        labelId="select-work-ordered"
                        id="work-ordered"
                        value={issue}
                        label="Work ordered"
                        onChange={handleIssueChange}
                        inputProps={{ tabIndex: "12" }}
                      >
                        {workList
                          .sort((a, b) => a.item.localeCompare(b.item))
                          .map((issue) => (
                            <MenuItem key={issue.id} value={issue.item}>
                              {issue.item}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Slotted Time"
                    fullWidth
                    value={timeAlotted}
                    onChange={(event) => setTimeAlotted(event.target.value)}
                    inputProps={{ tabIndex: "13" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  {technicians.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-tech-lead">Tech Lead</InputLabel>
                      <Select
                        labelId="select-tech-lead"
                        id="tech-lead"
                        value={techLead}
                        label="Tech Lead"
                        onChange={(event) => setTechLead(event.target.value)}
                        inputProps={{ tabIndex: "14" }}
                      >
                        {technicians
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((technician) => (
                            <MenuItem
                              key={technician.id}
                              value={technician.name}
                            >
                              {technician.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={4}>
                  {technicians.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-tech-helper">
                        Tech Helper
                      </InputLabel>
                      <Select
                        labelId="select-tech-helper"
                        id="tech-helper"
                        value={techHelper}
                        label="Tech helper"
                        onChange={(event) => setTechHelper(event.target.value)}
                        inputProps={{ tabIndex: "15" }}
                      >
                        <MenuItem value={"NONE"}>None</MenuItem>
                        {technicians
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((technician) => (
                            <MenuItem
                              key={technician.id}
                              value={technician.name}
                            >
                              {technician.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={4}>
                  {payments.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-payment">Payment</InputLabel>
                      <Select
                        labelId="select-payment"
                        id="payment"
                        value={payment}
                        label="Payment"
                        onChange={(event) => setPayment(event.target.value)}
                        inputProps={{ tabIndex: "16" }}
                      >
                        {payments
                          .sort((a, b) => a.item.localeCompare(b.item))
                          .map((payment) => (
                            <MenuItem key={payment.id} value={payment.item}>
                              {payment.item}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Notes"
                    multiline
                    fullWidth
                    rows={5}
                    variant="outlined"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    inputProps={{ tabIndex: "17" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="time-of-day-select">Time Of Day</InputLabel>
                    <Select
                      labelId="time-of-day-select"
                      id="time-of-day"
                      value={timeOfDay}
                      label="Time Of Day"
                      onChange={(event) => setTimeOfDay(event.target.value)}
                      inputProps={{ tabIndex: "18" }}
                    >
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="Anytime">Anytime</MenuItem>
                      <MenuItem value="First Call">First Call</MenuItem>
                      <MenuItem value="Last Call">Last Call</MenuItem>
                      <MenuItem value="overtime">Overtime</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Job Number"
                    fullWidth
                    required
                    value={jobNumber}
                    onChange={(event) => setJobNumber(event.target.value)}
                    inputProps={{ tabIndex: "19" }}
                  />
                </Grid>
                {localInvoiceId && (
                  <Grid container item xs={4} justifyContent="center">
                    <Button color="secondary" variant="contained" type="button">
                      Invoice Attached
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid
                container
                alignItems="flex-start"
                justifyContent="flex-end"
                direction="row"
                style={{ marginTop: "16px" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  tabIndex={20}
                  type="submit"
                  sx={{ marginLeft: "8px" }}
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  tabIndex={21}
                  onClick={() => closeDispatchEditorModal()}
                  sx={{ marginLeft: "8px" }}
                  startIcon={<Close />}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default DispatchEditor;
