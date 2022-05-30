import React from "react";
import { getFirestore, doc } from "firebase/firestore";

import { deleteDocument } from "../../../firebase/firestore.utils";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteDayLabel = ({
  isDeleteDayLabelModalOpen,
  closeDeleteDayLabelModal,
  selectedDayLabel,
}) => {
  console.log(selectedDayLabel);
  const db = getFirestore();

  const removeDayLabel = () => {
    deleteDocument(doc(db, "calLabel", selectedDayLabel.id)).then(() =>
      closeDeleteDayLabelModal()
    );
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="delete-day-label-modal"
        aria-describedby="modal for deleting a day label"
        open={isDeleteDayLabelModalOpen}
        onClose={closeDeleteDayLabelModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteDayLabelModalOpen}>
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`Delete ${selectedDayLabel.locationName}?`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
              sx={{ marginTop: "24px" }}
            >
              <Button
                sx={{ marginLeft: "8px", color: "red" }}
                variant="outlined"
                color="inherit"
                startIcon={<Delete />}
                onClick={() => removeDayLabel()}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => closeDeleteDayLabelModal()}
                startIcon={<Close />}
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

export default DeleteDayLabel;
