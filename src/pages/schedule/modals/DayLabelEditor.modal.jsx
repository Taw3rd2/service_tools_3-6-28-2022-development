import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import { isEqual } from "date-fns";
import { getFormattedDate } from "../../../utilities/dateUtils";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Clear, Close, Edit } from "@mui/icons-material";
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

const DayLabelEditor = ({
  isDayLabelEditorModalOpen,
  closeDayLabelEditor,
  openAddDayLabelModal,
  openEditDayLabelModal,
  openDeleteDayLabelModal,
  calendarDateSelected,
}) => {
  const db = getFirestore();

  const [labels, setLabels] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "calLabel"), (snapshot) =>
        setLabels(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    [db]
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="day-label-editor-modal"
        aria-describedby="day-label-editor"
        open={isDayLabelEditorModalOpen}
        onClose={closeDayLabelEditor}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDayLabelEditorModalOpen}>
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Day Label Editor for {getFormattedDate(calendarDateSelected)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer
                  component={Paper}
                  sx={{ overflow: "auto", maxHeight: 400 }}
                >
                  <Table
                    stickyHeader
                    size="medium"
                    aria-label="set day labels table"
                    sx={{ border: "1px solid black" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: 20,
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                          }}
                        >
                          #
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: 20,
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                          }}
                        >
                          Technician
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: 20,
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                          }}
                        >
                          Label
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontSize: 20,
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                          }}
                        >
                          Edit
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontSize: 20,
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                          }}
                        >
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {labels.length > 0 &&
                        labels
                          .filter((item) =>
                            isEqual(
                              item.labelDate.toDate(),
                              calendarDateSelected
                            )
                          )
                          .sort((a, b) => a.tech.localeCompare(b.tech))
                          .map((label, index) => (
                            <TableRow key={index}>
                              <TableCell align="left" sx={{ fontSize: 20 }}>
                                {index + 1}
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: 20 }}>
                                {label.tech}
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: 20 }}>
                                {label.locationName}
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: 20 }}>
                                <Button
                                  variant="outlined"
                                  startIcon={<Edit />}
                                  onClick={() => openEditDayLabelModal(label)}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                              <TableCell align="left" sx={{ fontSize: 20 }}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  startIcon={<Clear />}
                                  onClick={() => openDeleteDayLabelModal(label)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                startIcon={<Add />}
                sx={{ marginLeft: "8px" }}
                onClick={() => openAddDayLabelModal()}
              >
                Add
              </Button>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                startIcon={<Close />}
                sx={{ marginLeft: "8px" }}
                onClick={() => closeDayLabelEditor()}
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

export default DayLabelEditor;
