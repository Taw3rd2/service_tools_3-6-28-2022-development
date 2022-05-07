import React, { useState } from "react";
import { connect } from "react-redux";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "400px",
          textAlign: "center",
          marginTop: "64px",
          marginLeft: "8px",
          marginRight: "8px",
          border: "2px solid black",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>
            Service Tools Log In
          </Typography>
          <form onSubmit={handleSubmit} noValidate autoComplete="new password">
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              style={{ margin: "8px", fontSize: 18 }}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              style={{ margin: "8px", fontSize: 18 }}
              required
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              value="Submit Form"
              fullWidth
              style={{ margin: "8px" }}
            >
              Log In With Email
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="button"
              onClick={googleSignInStart}
              fullWidth
              style={{ margin: "8px" }}
            >
              Google Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
