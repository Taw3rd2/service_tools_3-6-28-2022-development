import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  Backdrop,
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
import { Close } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { getFormattedDate } from "../../../utilities/dateUtils";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const DispatchHistory = ({
  isDispatchHistoryModalOpen,
  closeDispatchHistoryModal,
  openSelectedDispatchModal,
  customer,
}) => {
  const db = getFirestore();

  const [dispatches, setDispatches] = useState([]);

  useEffect(() => {
    const dispatchReference = collection(db, "events");
    const dispatchQuery = query(
      dispatchReference,
      where("customerId", "==", customer.id)
    );

    const unsubscribe = onSnapshot(dispatchQuery, (snapshot) => {
      setDispatches(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return () => unsubscribe();
  }, [db, customer.id]);

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="dispatch-history-modal"
        aria-describedby="modal to view dispatch history"
        open={isDispatchHistoryModalOpen}
        onClose={closeDispatchHistoryModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDispatchHistoryModalOpen}>
          <div style={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Dispatch History
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer
                  component={Paper}
                  sx={{ overflow: "auto", maxHeight: 275 }}
                >
                  <Table
                    stickyHeader
                    size="small"
                    aria-label="customer-dispatches-table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: "100px",
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                            fontSize: 18,
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: "100px",
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                            fontSize: 18,
                          }}
                        >
                          Issue
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: "40px",
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                            fontSize: 18,
                          }}
                        >
                          Job Number
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: "110px",
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                            fontSize: 18,
                          }}
                        >
                          Tech lead
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: "110px",
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                            fontSize: 18,
                          }}
                        >
                          Tech Assisting
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: "50px",
                            background: lightTheme.palette.primary.light,
                            color: lightTheme.palette.primary.contrastText,
                            fontSize: 18,
                          }}
                        >
                          Notes
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dispatches.length > 0 &&
                        dispatches
                          .sort((a, b) => b.scheduledDate - a.scheduledDate)
                          .map((item) => (
                            <TableRow
                              key={item.id}
                              onClick={() => openSelectedDispatchModal()}
                            >
                              <TableCell align="left">
                                {getFormattedDate(item.dateScheduled)}
                              </TableCell>
                              <TableCell align="left">{item.issue}</TableCell>
                              <TableCell align="left">
                                {item.jobNumber}
                              </TableCell>
                              <TableCell align="left">
                                {item.techLead}
                              </TableCell>
                              <TableCell align="left">
                                {item.techHelper}
                              </TableCell>
                              <TableCell align="left">{item.notes}</TableCell>
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
              sx={{ marginTop: "24px" }}
            >
              <Button
                sx={{ marginLeft: "8px" }}
                size="large"
                color="primary"
                variant="outlined"
                startIcon={<Close />}
                onClick={() => closeDispatchHistoryModal()}
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

export default DispatchHistory;
