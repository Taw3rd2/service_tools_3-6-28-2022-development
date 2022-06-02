import React, { useEffect, useState } from "react";
import PrintDailySlip from "./PrintDailySlip";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

import ViewDailySlip from "./ViewDailySlip";

import { Box, Grid, useMediaQuery } from "@mui/material";

const PrintDailySlips = () => {
  const db = getFirestore();
  const location = useLocation();
  const matchesPrint = useMediaQuery("print");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventReference = collection(db, "events");
    const eventQuery = query(
      eventReference,
      where("dateScheduled", "==", location.state.date),
      where("techLead", "==", location.state.techLead)
    );

    const unsubscribe = onSnapshot(eventQuery, (snapshot) => {
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, [db, location.state.date, location.state.techLead]);

  return (
    <>
      {matchesPrint ? (
        <Box sx={{ marginTop: "16px", pageBreakAfter: "always" }}>
          <Grid container spacing={3}>
            {events.map((event, index) => (
              <PrintDailySlip key={index}> {event} </PrintDailySlip>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ marginTop: "16px", flexGrow: 1 }}>
          <Grid container>
            {events.map((event, index) => (
              <ViewDailySlip key={index}> {event} </ViewDailySlip>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PrintDailySlips;
