import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

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
  ThemeProvider,
  Typography,
} from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { Add } from "@mui/icons-material";

const WorkList = ({ openDeleteItemModal, openWorkModal }) => {
  const db = getFirestore();

  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "workList"),
      (snapshot) => {
        setWorkList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      },
      (error) => {
        console.log(error.message);
      }
    );
    return () => unsubscribe();
  }, [db]);

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
        <Typography variant="h5" gutterBottom color="primary">
          Work List
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ overflow: "auto", maxHeight: 275 }}
        >
          <Table
            stickyHeader
            size="small"
            aria-label="dispatcher-settings-table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ width: 25, fontSize: 20, fontWeight: "bold" }}
                >
                  #
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                >
                  Work Item
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: 100, fontSize: 20, fontWeight: "bold" }}
                >
                  Shorthand
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: 100, fontSize: 20, fontWeight: "bold" }}
                >
                  Edit
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: 100, fontSize: 20, fontWeight: "Bold" }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workList
                .sort((a, b) => a.item.localeCompare(b.item))
                .map((option, index) => (
                  <TableRow key={option.id} sx={{ cursor: "pointer" }}>
                    <TableCell align="left" sx={{ fontSize: 20 }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 20 }}>
                      {option.item}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 20 }}>
                      {option.shorthand}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => openWorkModal(option)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center" sx={{ width: 100 }}>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => openDeleteItemModal(option, "workList")}
                      >
                        Delete
                      </Button>
                    </TableCell>
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
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            sx={{
              marginTop: "16px",
              background: lightTheme.palette.primary.contrastText,
            }}
            onClick={() => openWorkModal()}
          >
            Add New Work Item
          </Button>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default WorkList;
