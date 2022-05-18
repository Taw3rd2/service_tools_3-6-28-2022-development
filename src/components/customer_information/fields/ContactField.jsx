import { Person, PhoneOutlined } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import React from "react";

const ContactField = ({ title, name, phone }) => {
  return (
    <Card sx={{ padding: "8px" }}>
      <Typography variant="caption">{title}</Typography>
      <div style={{ display: "flex" }}>
        <Person color="primary" />
        {name ? (
          <Typography variant="body1" sx={{ marginLeft: "4px" }}>
            {name}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ marginLeft: "4px" }}>
            No Contact Name Entered
          </Typography>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <PhoneOutlined style={{ color: "black" }} />
        {phone ? (
          <Typography variant="body1" sx={{ marginLeft: "4px" }}>
            {phone}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ marginLeft: "4px" }}>
            No Phone Number Entered
          </Typography>
        )}
      </div>

      <div style={{ marginTop: "24px" }} />
    </Card>
  );
};

export default ContactField;
