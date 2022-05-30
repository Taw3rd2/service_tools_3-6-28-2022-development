import React from "react";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
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

const JobComplete = ({ isJobCompletedModalOpen, closeJobCompletedModal }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="job-completed-modal"
        aria-describedby="modal to indicate the job is completed"
        open={isJobCompletedModalOpen}
        onClose={closeJobCompletedModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isJobCompletedModalOpen}>
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  This job has been marked Done, or Parts Needed.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: "black" }}
                >
                  This job is <strong>complete</strong> and can not be changed.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: "black" }}
                >
                  Maybe you should start a new job?
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
              sx={{ marginTop: "16px" }}
            >
              <Button
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                onClick={() => closeJobCompletedModal()}
              >
                Close
              </Button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default JobComplete;
