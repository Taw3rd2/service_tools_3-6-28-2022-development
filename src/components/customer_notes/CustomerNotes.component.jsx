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
      <div
        style={{
          flexGrow: 1,
          border: "1px solid black",
          backgroundColor: "#e6ebf2",
          margin: "4px",
          padding: "8px",
        }}
      >
        {customer.firstname ? (
          <Typography variant="h5" gutterBottom style={{ color: "teal" }}>
            {customer.firstname} {customer.lastname} Notes
          </Typography>
        ) : (
          <Typography variant="h5" gutterBottom style={{ color: "teal" }}>
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
                  sx={{ minWidth: "40px", background: "blue", color: "white" }}
                >
                  Operator
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ minWidth: "40px", background: "blue", color: "white" }}
                >
                  Type
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ minWidth: "40px", background: "blue", color: "white" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ minWidth: "40px", background: "blue", color: "white" }}
                >
                  Time
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ background: "blue", color: "white" }}
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
              startIcon={<NoteAdd />}
              sx={{ marginTop: "16px" }}
              onClick={() => openCustomerNoteModal({})}
            >
              Add New Note
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<NoteAdd />}
              sx={{ marginTop: "16px" }}
              disabled
            >
              Add New Note
            </Button>
          )}
        </Grid>
      </div>
    );
  }
};

export default CustomerNotes;
