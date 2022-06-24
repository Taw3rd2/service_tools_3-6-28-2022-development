import React from "react";

import { Grid } from "@mui/material";
import DispatcherList from "./dispatchers/DispatcherList";
import PaymentList from "./payments/PaymentList";
import WorkList from "./work_list/WorkList";
import TechnicianList from "./technicians/TechnicianList";

const Settings = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <DispatcherList />
      </Grid>
      <Grid item xs={4}>
        <PaymentList />
      </Grid>
      <Grid item xs={4}>
        <WorkList />
      </Grid>
      <Grid item xs={8}>
        <TechnicianList />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );
};

export default Settings;
