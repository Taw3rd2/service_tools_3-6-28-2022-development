import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import CustomerExport from "../export_to_excel/CustomerExport";

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
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

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
    <ThemeProvider theme={lightTheme}>
      <div style={{ flexGrow: 1, margin: "16px" }}>
        <Grid container justifyContent="center" spacing={1}>
          <Typography variant="h4" color="primary">
            Search {customers.length} Customers
          </Typography>{" "}
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
                color="primary"
              >
                <FormControlLabel
                  value="lastname"
                  control={<Radio color="primary" />}
                  label="Last Name"
                />
                <FormControlLabel
                  value="street"
                  control={<Radio color="primary" />}
                  label="Street"
                />
                <FormControlLabel
                  value="city"
                  control={<Radio color="primary" />}
                  label="City"
                />
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
                sx={{
                  marginTop: "73px",
                }}
                color="primary"
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => openAddCustomerModal()}
              >
                Add New Customer
              </Button>
              <CustomerExport customers={customers} />
            </Stack>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default CustomerSearch;
