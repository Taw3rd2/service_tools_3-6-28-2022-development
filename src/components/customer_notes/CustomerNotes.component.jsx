import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import NoCustomerLoaded from "../customer_information/views/NoCustomerLoaded.view";

import {
  getFormattedTime,
  getFormattedDateAndTime,
  getFormattedDate,
} from "../../utilities/dateUtils";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const CustomerNotes = ({ customer, openCustomerNoteModal }) => {
  const db = getFirestore();

  const setDefaultCustomerInfo = () => {
    console.log("no customer activity loaded");
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (customer === null || customer.id === "") {
      setDefaultCustomerInfo();
    } else {
      setNotes([]);
      const unsubscribe = onSnapshot(
        collection(db, "customers", customer.id, "Activity"),
        (snapshot) => {
          setNotes(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              sortingDate: getFormattedDateAndTime(doc.data().currentTime),
            }))
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
      return () => unsubscribe();
    }
  }, [db, customer]);

  if (customer === null || customer.id === "") {
    return <NoCustomerLoaded />;
  } else {
    return (
      <ThemeProvider theme={lightTheme}>
        <div
          style={{
            flexGrow: 1,
            border: "1px solid black",
            backgroundColor: "lightgray",
            margin: "4px",
            padding: "8px",
          }}
        >
          {customer.firstname ? (
            <Typography variant="h5" gutterBottom color="primary">
              {customer.firstname} {customer.lastname} Notes
            </Typography>
          ) : (
            <Typography variant="h5" gutterBottom color="primary">
              {customer.lastname} Notes
            </Typography>
          )}
          <TableContainer
            component={Paper}
            sx={{ overflow: "auto", maxHeight: 275 }}
          >
            <Table stickyHeader size="small" aria-label="customer-notes-table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "40px",
                      background: lightTheme.palette.primary.light,
                      color: lightTheme.palette.primary.contrastText,
                    }}
                  >
                    Operator
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "40px",
                      background: lightTheme.palette.primary.light,
                      color: lightTheme.palette.primary.contrastText,
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "40px",
                      background: lightTheme.palette.primary.light,
                      color: lightTheme.palette.primary.contrastText,
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "40px",
                      background: lightTheme.palette.primary.light,
                      color: lightTheme.palette.primary.contrastText,
                    }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      background: lightTheme.palette.primary.light,
                      color: lightTheme.palette.primary.contrastText,
                    }}
                  >
                    Note
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes
                  .sort((a, b) => (a.sortingDate < b.sortingDate ? 1 : -1))
                  .map((note) => (
                    <TableRow
                      key={note.id}
                      onClick={() => openCustomerNoteModal(note)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="left">{note.operator}</TableCell>
                      <TableCell align="left">{note.type}</TableCell>
                      <TableCell align="left">
                        {getFormattedDate(note.currentTime)}
                      </TableCell>
                      <TableCell align="left">
                        {getFormattedTime(note.currentTime)}
                      </TableCell>
                      <TableCell align="left">{note.details}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
          >
            {customer.id ? (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<NoteAdd />}
                sx={{
                  marginTop: "16px",
                  background: lightTheme.palette.primary.contrastText,
                }}
                onClick={() => openCustomerNoteModal({})}
              >
                Add New Note
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<NoteAdd />}
                sx={{
                  marginTop: "16px",
                  background: lightTheme.palette.primary.contrastText,
                }}
                disabled
              >
                Add New Note
              </Button>
            )}
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
};

export default CustomerNotes;
