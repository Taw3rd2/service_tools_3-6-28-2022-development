import React from "react";

import { Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const NoCustomerLoaded = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <div style={{ padding: "8px" }}>
        <Grid container justifyContent="center" alignContent="center">
          <Typography variant="h5" color="primary">
            No Customer Loaded
          </Typography>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default NoCustomerLoaded;
