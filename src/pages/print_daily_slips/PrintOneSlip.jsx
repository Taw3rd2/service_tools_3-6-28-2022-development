import React from "react";
import { useLocation } from "react-router-dom";

import ViewDailySlip from "./ViewDailySlip";

import { Grid, useMediaQuery } from "@mui/material";
import PrintDailySlip from "./PrintDailySlip";

const PrintOneSlip = () => {
  const matchesPrint = useMediaQuery("print");
  const location = useLocation();
  const dispatches = [];
  const { state } = location;
  dispatches.push(state);

  return (
    <>
      {matchesPrint ? (
        <div style={{ marginTop: "16px" }}>
          <Grid container spacing={3}>
            {dispatches.map((dispatch) => (
              <PrintDailySlip key={dispatch.id}> {dispatch} </PrintDailySlip>
            ))}
          </Grid>
        </div>
      ) : (
        <div style={{ marginTop: "16px" }}>
          <Grid container>
            {dispatches.map((dispatch) => (
              <ViewDailySlip key={dispatch.id}> {dispatch} </ViewDailySlip>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default PrintOneSlip;
