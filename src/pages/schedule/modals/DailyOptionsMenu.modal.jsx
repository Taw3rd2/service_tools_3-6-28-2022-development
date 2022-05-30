import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
//import { getFormattedDate } from "../../../utilities/dateUtils";

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

const DailyOptionsMenu = ({
  isDailyOptionsMenuOpen,
  closeDailyOptionsMenu,
  calendarDateSelected,
  openDayLabelEditor,
}) => {
  const db = getFirestore();

  const [technicians, setTechnicians] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "technicians"), (snapshot) =>
        setTechnicians(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="daily-options-menu-modal"
        aria-describedby="daily-options"
        open={isDailyOptionsMenuOpen}
        onClose={closeDailyOptionsMenu}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDailyOptionsMenuOpen}>
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Daily Options Menu
                </Typography>
              </Grid>
              <Grid container spacing={1}>
                {technicians &&
                  technicians
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((tech) => (
                      <Grid key={tech.id} item xs={12}>
                        <Link
                          to={{
                            pathname: "/print_daily_slips",
                            state: {
                              techLead: `${tech.name}`,
                              date: calendarDateSelected,
                            },
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="outlined"
                            fullWidth
                            style={{
                              backgroundColor: tech.color,
                              color: "white",
                            }}
                          >
                            {`Print ${tech.name}'s Daily Slips`}
                          </Button>
                        </Link>
                      </Grid>
                    ))}
              </Grid>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ marginTop: "12px" }}
                onClick={() => openDayLabelEditor()}
              >
                Day Label Editor
              </Button>
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
                onClick={() => closeDailyOptionsMenu()}
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

export default DailyOptionsMenu;
