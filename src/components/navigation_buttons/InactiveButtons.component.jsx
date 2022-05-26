import React from "react";

import { Grid, Typography } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

const reportButton = {
  border: "1px solid black",
  textAlign: "center",
  background: "#FFF",
  padding: "8px",
};

const InactiveButtons = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        border: "2px solid black",
        backgroundColor: "#e6ebf2",
        marginRight: "4px",
        padding: "4px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Create New</Typography>
            <Typography variant="subtitle1">Dispatch</Typography>
          </div>
        </Grid>
        {/* <Grid item xs={3}>
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">All Customer</Typography>
            <Typography variant="subtitle1">Dispatches</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">All Customer</Typography>
            <Typography variant="subtitle1">Parts Quotes</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">All Customer</Typography>
            <Typography variant="subtitle1">Equipment Quotes</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={reportButton}>
            <Build style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Maintenance</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={reportButton}>
            <Build style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Warranty</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Create Blank</Typography>
            <Typography variant="subtitle1">Parts Quote</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Create Blank</Typography>
            <Typography variant="subtitle1">Equipment Quote</Typography>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default InactiveButtons;
