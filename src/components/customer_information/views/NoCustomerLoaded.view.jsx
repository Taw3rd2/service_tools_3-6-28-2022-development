import { Grid, Typography } from "@mui/material";
import React from "react";

const NoCustomerLoaded = () => {
  return (
    <div style={{ padding: "8px" }}>
      <Grid container justifyContent="center" alignContent="center">
        <Typography variant="h5" sx={{ color: "teal" }}>
          No Customer Loaded
        </Typography>
      </Grid>
    </div>
  );
};

export default NoCustomerLoaded;
