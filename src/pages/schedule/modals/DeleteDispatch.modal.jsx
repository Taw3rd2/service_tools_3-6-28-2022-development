import React from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

import { Backdrop, Button, Fade, Grid, Modal, Typography } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const DeleteDispatch = ({
  isDeleteDispatchModalOpen,
  closeDeleteDispatchModal,
  closeDispatchEditorModal,
  selectedDispatch,
}) => {
  const db = getFirestore();

  //const dispatchesToDelete = [selectedDispatch.id];

  const removeDispatchs = async () => {
    await removeSecondDispatch();
    await deleteDoc(doc(db, "events", selectedDispatch.id)).then(() => {
      closeDispatchEditorModal();
      closeDeleteDispatchModal();
    });
  };

  const removeSecondDispatch = async () => {
    if (selectedDispatch.extendedProps.techHelperId) {
      await deleteDoc(
        doc(db, "events", selectedDispatch.extendedProps.techHelperId)
      );
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="delete-dispatch-modal"
        aria-describedby="modal for deleting a dispatch"
        open={isDeleteDispatchModalOpen}
        onClose={closeDeleteDispatchModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteDispatchModalOpen}>
          <div style={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`Delete Dispatch?`}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              {selectedDispatch.extendedProps.techHelperId && (
                <Typography variant="caption" gutterBottom>
                  Includes {selectedDispatch.extendedProps.techHelper}'s
                  dispatch
                </Typography>
              )}
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
                onClick={() => removeDispatchs()}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => closeDeleteDispatchModal()}
                startIcon={<Close />}
              >
                Close
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default DeleteDispatch;
