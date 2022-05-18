import React, { useEffect, useState } from "react";

//import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import firebase from "firebase/compat/app";
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
  const setDefaultCustomerInfo = () => {
    console.log("no customer activity loaded");
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (customer === null || customer.id === "") {
      setDefaultCustomerInfo();
    } else {
      setNotes([]);
      let unsubscribe = firebase
        .firestore()
        .collection("customers")
        .doc(customer.id)
        .collection("Activity")
        .onSnapshot(
          (snapshot) => {
            let newNotes = [];
            snapshot.forEach((doc) => {
              let note = doc.data();
              note.sortingDate = getFormattedDateAndTime(
                doc.data().currentTime
              );
              note.id = doc.id;
              newNotes.push(note);
              newNotes.sort((a, b) =>
                b.sortingDate.localeCompare(a.sortingDate)
              );
            });
            setNotes(newNotes);
          },
          (error) => {
            console.log(error);
          }
        );
      return () => unsubscribe();
    }
  }, [customer]);

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
          sx={{ overflow: "auto", maxHeight: 440 }}
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
              {notes.map((note, index) => (
                <TableRow
                  key={index}
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
