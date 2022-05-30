import React, { useEffect, useState } from "react";

import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createUnNamedDocument } from "../../../firebase/firestore.utils";

import { addHours, getUnixTime } from "date-fns";
import { setDateToZeroHours } from "../../../utilities/dateUtils";
import { toCurrency } from "../../../utilities/currencyUtils";

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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const style = {
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

const CreateDispatch = ({
  closeCreateDispatchModal,
  customer,
  invoiceData,
  invoiceId,
  isCreateDispatchModalOpen,
}) => {
  const db = getFirestore();

  const [altPhoneName, setAltPhoneName] = useState(
    customer.altPhoneName ? customer.altPhoneName : ""
  );
  const [altphone, setAltPhone] = useState(
    customer.altphone ? customer.altphone : ""
  );
  //well, this is not correct... it should be a address2 creator
  const [city, setCity] = useState(
    customer.city ? `${customer.city}, ${customer.state} ${customer.zip}` : ""
  );
  const [firstname, setFirstName] = useState(
    customer.firstname ? customer.firstname : ""
  );
  const localInvoiceId = invoiceId !== undefined ? invoiceId : "";
  const [issue, setIssue] = useState("");
  const [jobNumber, setJobNumber] = useState(
    invoiceData
      ? `${invoiceData.invoiceNumberPrefix}${invoiceData.userCreatedjobNumber}`
      : ""
  );
  const [lastname, setLastName] = useState(
    customer.lastname ? customer.lastname : ""
  );
  const [leadSource, setLeadSource] = useState("PC");
  const [notes, setNotes] = useState(
    invoiceData
      ? `Collect balance due: ${toCurrency(invoiceData.balanceDue.amount)}`
      : ""
  );
  const [payment, setPayment] = useState("C.O.D.");
  const [phone, setPhone] = useState(customer.phone ? customer.phone : "");
  const [phoneName, setPhoneName] = useState(
    customer.phoneName ? customer.phoneName : ""
  );
  const [shorthand, setShorthand] = useState("");
  const [start, setStart] = useState(setDateToZeroHours(new Date()));
  const [street, setStreet] = useState(customer.street ? customer.street : "");
  const [takenBy, setTakenBy] = useState("");
  const [techHelper, setTechHelper] = useState("NONE");
  const [techLead, setTechLead] = useState("");
  const [timeAlotted, setTimeAlotted] = useState("1.5");
  const [timeOfDay, setTimeOfDay] = useState("Anytime");

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

  const onSubmit = (event) => {
    event.preventDefault();
    const docForId = doc(collection(db, "events"));
    const techLeadGeneratedId = docForId.id;
    if (techHelper === "NONE") {
      const newDispatch = {
        id: techLeadGeneratedId,
        techHelperId: "",
        firstname,
        lastname,
        street,
        city,
        leadSource,
        phoneName,
        phone,
        altPhoneName,
        altphone,
        timeAlotted,
        issue,
        payment,
        techLead,
        techHelper,
        start,
        end: addHours(setDateToZeroHours(start), 1),
        timeOfDay,
        shorthand,
        notes,
        title: `${timeAlotted} /${lastname} /${shorthand} /${timeOfDay}`,
        takenBy,
        dateCreated: new Date(),
        dateScheduled: start,
        dateModified: new Date(),
        scheduledDate: getUnixTime(setDateToZeroHours(start)),
        status: "scheduled",
        jobNumber,
        customerId: customer.id,
        invoiceId: localInvoiceId,
      };
      createUnNamedDocument(collection(db, "events"), newDispatch).then(() =>
        closeCreateDispatchModal()
      );
    } else {
      const docForhelperId = doc(collection(db, "events"));
      const techHelperGeneratedId = docForhelperId.id;

      const newLeadDispatch = {
        id: techLeadGeneratedId,
        techHelperId: techHelperGeneratedId,
        firstname,
        lastname,
        street,
        city,
        leadSource,
        phoneName,
        phone,
        altPhoneName,
        altphone,
        timeAlotted,
        issue,
        payment,
        techLead,
        techHelper,
        start,
        end: addHours(setDateToZeroHours(start), 1),
        timeOfDay,
        shorthand,
        notes,
        title: `${timeAlotted} /${lastname} /${shorthand} /${timeOfDay}`,
        takenBy,
        dateCreated: new Date(),
        dateScheduled: start,
        dateModified: new Date(),
        scheduledDate: getUnixTime(setDateToZeroHours(start)),
        status: "scheduled",
        jobNumber,
        customerId: customer.id,
        invoiceId: localInvoiceId,
      };

      const newHelperDispatch = {
        id: techHelperGeneratedId,
        techHelperId: techLeadGeneratedId,
        firstname,
        lastname,
        street,
        city,
        leadSource,
        phoneName,
        phone,
        altPhoneName,
        altphone,
        timeAlotted,
        issue,
        payment,
        techLead: techHelper,
        techHelper: techLead,
        start,
        end: addHours(setDateToZeroHours(start), 1),
        timeOfDay,
        shorthand,
        notes,
        title: `${timeAlotted} /${lastname} /${shorthand} /${timeOfDay}`,
        takenBy,
        dateCreated: new Date(),
        dateScheduled: start,
        dateModified: new Date(),
        scheduledDate: getUnixTime(setDateToZeroHours(start)),
        status: "scheduled",
        jobNumber,
        customerId: customer.id,
        invoiceId: localInvoiceId,
      };

      createUnNamedDocument(collection(db, "events"), newLeadDispatch)
        .then(() =>
          createUnNamedDocument(collection(db, "events"), newHelperDispatch)
        )
        .then(() => closeCreateDispatchModal());
    }
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
        aria-labelledby="create-dispatch-modal"
        aria-describedby="modal to create a new dispatch"
        open={isCreateDispatchModalOpen}
        onClose={closeCreateDispatchModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isCreateDispatchModalOpen}>
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Create Dispatch
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
                      color="primary"
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
                {invoiceId && (
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
                  tabIndex={20}
                  color="primary"
                  type="submit"
                  sx={{
                    marginLeft: "8px",
                  }}
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  tabIndex={21}
                  color="primary"
                  onClick={() => closeCreateDispatchModal()}
                  sx={{
                    marginLeft: "8px",
                  }}
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

export default CreateDispatch;
