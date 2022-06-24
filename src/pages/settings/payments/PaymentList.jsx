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

const PaymentList = () => {
  const db = getFirestore();

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "payments"),
      (snapshot) => {
        setPayments(
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
          Payments
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ overflow: "auto", maxHeight: 275 }}
        >
          <Table stickyHeader size="small" aria-label="payment-settings table">
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
                  Payment
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
              {payments
                .sort((a, b) => a.item.localeCompare(b.item))
                .map((payment, index) => (
                  <TableRow key={payment.id} sx={{ cursor: "pointer" }}>
                    <TableCell align="left" sx={{ fontSize: 20 }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 20 }}>
                      {payment.item}
                    </TableCell>
                    <TableCell align="center">
                      <Button color="primary" variant="outlined">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center" sx={{ width: 100 }}>
                      <Button color="primary" variant="outlined">
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
          >
            Add New Payment
          </Button>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default PaymentList;
