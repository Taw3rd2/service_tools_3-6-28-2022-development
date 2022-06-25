import React, { useState } from "react";
import { getFirestore, collection, doc } from "firebase/firestore";

import {
  createUnNamedDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const style = {
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

const Work = ({ isWorkModalOpen, closeWorkModal, work }) => {
  const db = getFirestore();

  const [item, setItem] = useState(work ? work.item : "");
  const [shorthand, setShorthand] = useState(work ? work.shorthand : "");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { item, shorthand };
    if (work) {
      console.log("workList item: ", data);
      updateDocument(doc(db, "workList", work.id), data).then(() => {
        closeWorkModal();
      });
    } else {
      createUnNamedDocument(collection(db, "workList"), data).then(() => {
        closeWorkModal();
      });
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="work-list-modal"
        aria-describedby="modal for work list edits"
        open={isWorkModalOpen}
        onClose={closeWorkModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isWorkModalOpen}>
          <div style={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  {work ? `Edit Work Item ${work.item}` : "New Work Item"}
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={onSubmit} autoComplete="new password">
              <Grid container spacing={2} sc={{ marginTop: "8px" }}>
                <Grid item xs={12}>
                  <TextField
                    label="Work Item"
                    value={item}
                    fullWidth
                    color="primary"
                    sx={{ marginTop: "16px" }}
                    onChange={(event) => setItem(event.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Calendar Shorthand"
                    value={shorthand}
                    fullWidth
                    color="primary"
                    sx={{ marginTop: "16px" }}
                    onChange={(event) => setShorthand(event.target.value)}
                    required
                  />
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
                  }}
                  color="primary"
                  type="submit"
                  variant="outlined"
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="button"
                  variant="outlined"
                  onClick={() => closeWorkModal()}
                  startIcon={<Close />}
                >
                  Close
                </Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default Work;
