import React from "react";

import { Button, Grid, Typography } from "@mui/material";
import { AddTask } from "@mui/icons-material";

const DailyTasks = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        border: "1px solid black",
        backgroundColor: "#e6ebf2",
        margin: "4px",
        padding: "8px",
      }}
    >
      <Typography variant="h5" gutterBottom style={{ color: "teal" }}>
        Daily Task List
      </Typography>

      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
      >
        <Button variant="outlined" startIcon={<AddTask />}>
          Task Manager
        </Button>
      </Grid>
    </div>
  );
};

export default DailyTasks;
