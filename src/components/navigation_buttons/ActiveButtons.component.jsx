import React from "react";

import { useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import { AddCircle, Assignment } from "@mui/icons-material"; //Assignment, AddCircle, Build } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const reportButton = {
  border: "1px solid black",
  textAlign: "center",
  cursor: "pointer",
  background: "#FFF",
  padding: "8px",
};

const ActiveButtons = ({
  customer,
  openCreateDispatchModal,
  openDispatchHistoryModal,
  openPartsQuotesModal,
  openEquipmentQuotesModal,
  //openWarrantyListModal,
  //openMaintenanceListModal,
}) => {
  const navigate = useNavigate();

  const routeToPartsQuoteCreator = () => {
    const selectedEquipment = {
      equipmentName: "",
      equipmentBrand: "",
      equipmentModel: "",
      equipmentSerial: "",
    };
    const quoteData = {
      id: "",
      jobNumber: "",
      quoteDate: new Date(),
      parts: [],
      laborHours: 1,
      laborRate: 79,
      maintenance: false,
      rediagnostic: false,
      regularShippingTime: "5-7 days",
      quickShippingTime: "1-3 days",
      regularShippingRate: 25,
      quickShippingRate: 75,
      shippingNotes: "",
      selectedShipping: "none",
      selectedDiscount: "none",
      disclaimerRed: false,
    };
    navigate("/parts_quote", {
      state: {
        customer: customer,
        selectedEquipment: selectedEquipment,
        quoteData: quoteData,
      },
    });

    // history.push({
    //   pathname: "PartsQuote",
    //   state: {
    //     client: client,
    //     selectedEquipment: selectedEquipment,
    //     quoteData: quoteData,
    //   },
    // });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <div
        style={{
          flexGrow: 1,
          border: "2px solid black",
          backgroundColor: "lightgray",
          marginRight: "4px",
          padding: "4px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3} onClick={() => openCreateDispatchModal()}>
            <div style={reportButton}>
              <AddCircle
                sx={{
                  background: lightTheme.palette.primary.contrastText,
                  color: "green",
                  fontSize: 60,
                }}
              />
              <Typography variant="subtitle1">Create New</Typography>
              <Typography variant="subtitle1">Dispatch</Typography>
            </div>
          </Grid>
          <Grid item xs={3} onClick={() => openDispatchHistoryModal()}>
            <div style={reportButton}>
              <Assignment
                sx={{
                  background: lightTheme.palette.primary.contrastText,
                  color: lightTheme.palette.primary.light,
                  fontSize: 60,
                }}
              />
              <Typography variant="subtitle1">All Customer</Typography>
              <Typography variant="subtitle1">Dispatches</Typography>
            </div>
          </Grid>
          <Grid item xs={3} onClick={() => openPartsQuotesModal()}>
            {/* <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "darkblue" }} />
            <Typography variant="subtitle1">All Customer</Typography>
            <Typography variant="subtitle1">Parts Quotes</Typography>
          </div> */}
          </Grid>
          <Grid item xs={3} onClick={() => openEquipmentQuotesModal()}>
            {/* <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "darkblue" }} />
            <Typography variant="subtitle1">All Customer</Typography>
            <Typography variant="subtitle1">Equipment Quotes</Typography>
          </div> */}
          </Grid>
          <Grid item xs={3}>
            {/* <div style={reportButton}>
            <Build style={{ fontSize: 60, color: "darkblue" }} />
            <Typography variant="subtitle1">Maintenance</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div> */}
          </Grid>
          <Grid item xs={3}>
            {/* <div style={reportButton}>
            <Build style={{ fontSize: 60, color: "darkblue" }} />
            <Typography variant="subtitle1">Warranty</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div> */}
          </Grid>
          <Grid item xs={3} onClick={() => routeToPartsQuoteCreator()}>
            {/* <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "darkblue" }} />
            <Typography variant="subtitle1">Create Blank</Typography>
            <Typography variant="subtitle1">Parts Quote</Typography>
          </div> */}
          </Grid>
          <Grid item xs={3}>
            {/* <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "darkblue" }} />
            <Typography variant="subtitle1">Create Blank</Typography>
            <Typography variant="subtitle1">Equipment Quote</Typography>
          </div> */}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default ActiveButtons;
