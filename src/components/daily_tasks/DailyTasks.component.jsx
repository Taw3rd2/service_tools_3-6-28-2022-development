import React from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const DailyTasks = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          flexGrow: 1,
          border: "1px solid black",
          backgroundColor: "lightgray",
          margin: "4px",
          padding: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          Daily Task List
        </Typography>

        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddTask />}
            sx={{ background: lightTheme.palette.primary.contrastText }}
          >
            Task Manager
          </Button>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DailyTasks;
