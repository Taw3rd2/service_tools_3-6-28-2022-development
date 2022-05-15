import { MailOutline } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";
import React from "react";

const EmailField = ({ title, email }) => {
  return (
    <Card sx={{ padding: "8px" }}>
      <Typography variant="caption">{title}</Typography>
      <div style={{ display: "flex" }}>
        <MailOutline color="primary" />
        <Typography variant="body1" sx={{ marginLeft: "4px" }}>
          {email}
        </Typography>
      </div>
    </Card>
  );
};

export default EmailField;
