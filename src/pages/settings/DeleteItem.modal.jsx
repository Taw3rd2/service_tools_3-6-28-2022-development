import React from "react";
import { doc, getFirestore } from "firebase/firestore";

import { Backdrop, Button, Fade, Grid, Modal, Typography } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { deleteDocument } from "../../firebase/firestore.utils";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const DeleteItem = ({
  isDeleteItemModalOpen,
  closeDeleteItemModal,
  parentCollection,
  item,
}) => {
  const db = getFirestore();

  const onItemDelete = () => {
    deleteDocument(doc(db, parentCollection, item.id)).then(() =>
      closeDeleteItemModal()
    );
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="settings-delete-modal"
        aria-describedby="modal to delete items"
        open={isDeleteItemModalOpen}
        onClose={closeDeleteItemModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteItemModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Delete ?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Unrecoverable delete!
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
                sx={{
                  marginLeft: "8px",
                  color: "red",
                }}
                size="large"
                color="inherit"
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => onItemDelete()}
              >
                Delete
              </Button>
              <Button
                sx={{
                  marginLeft: "8px",
                }}
                size="large"
                color="primary"
                variant="outlined"
                startIcon={<Close />}
                onClick={() => closeDeleteItemModal()}
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

export default DeleteItem;
