import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import CustomerAutocomplete from "./CustomerAutocomplete.component";

const CustomerSearch = ({ openAddCustomerModal, handleCustomerSelected }) => {
  const db = getFirestore();
  const [customers, setCustomers] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "customers"), (snapshot) =>
        setCustomers(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  const [selectedSearchParameter, setSelectedSearchParameter] =
    useState("lastname");
  const handleSearchParameterChange = (event) => {
    setSelectedSearchParameter(event.target.value);
  };

  return (
    <div style={{ flexGrow: 1, margin: "16px" }}>
      <Grid container justifyContent="center" spacing={1}>
        <Typography variant="h4" sx={{ color: "teal" }}>
          Search {customers.length} Customers
        </Typography>{" "}
        {/*here*/}
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={6}>
          <FormControl sx={{ marginLeft: "8px" }}>
            <FormLabel id="customer_search_parameters_radio_group">
              Refine customer search
            </FormLabel>
            <RadioGroup
              row
              defaultValue="lastname"
              aria-labelledby="customer_search_parameters_radio_group"
              name="customer_search_radio_buttons_group"
              onChange={handleSearchParameterChange}
            >
              <FormControlLabel
                value="lastname"
                control={<Radio />}
                label="Last Name"
              />
              <FormControlLabel
                value="street"
                control={<Radio />}
                label="Street"
              />
              <FormControlLabel value="city" control={<Radio />} label="City" />
            </RadioGroup>
          </FormControl>
          <CustomerAutocomplete
            customers={customers}
            selectedSearchParameter={selectedSearchParameter}
            handleCustomerSelected={handleCustomerSelected}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} direction="column">
            <Button
              sx={{ marginTop: "73px" }}
              color="primary"
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => openAddCustomerModal()}
            >
              Add New Customer
            </Button>
            <Button
              color="primary"
              variant="outlined"
              size="large"
              disabled
              fullWidth
            >
              Export to Excell
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerSearch;
