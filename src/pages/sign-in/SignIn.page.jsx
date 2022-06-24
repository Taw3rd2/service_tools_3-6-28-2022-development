import React, { useState } from "react";

import { googleAuth } from "../../firebase/firestore.utils";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { logIn } from "../../firebase/firestore.utils";
import { HourglassEmpty } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const SignIn = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await logIn(email, password).then(() => {
        console.log("signed in");
        navigate("/homepage");
      });
    } catch {
      alert("Your credentials are incorrect...");
    }

    setLoading(false);
  };

  const authWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(googleAuth, provider)
      .then((res) => {
        navigate("/homepage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={lightTheme}>
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
            <Typography sx={{ fontSize: 26 }} color="primary" gutterBottom>
              Service Tools Log In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                name="email"
                autoComplete="new-password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                style={{ marginTop: "8px", fontSize: 18 }}
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                style={{ marginTop: "8px", fontSize: 18 }}
                required
              />
              <Button
                variant="outlined"
                color="primary"
                size="large"
                type="submit"
                value="Submit Form"
                fullWidth
                startIcon={loading && <HourglassEmpty />}
                style={{ marginTop: "32px" }}
              >
                Log In With Email
              </Button>
              <Button
                variant="outlined"
                size="large"
                type="button"
                fullWidth
                style={{ marginTop: "8px" }}
                onClick={authWithGoogle}
              >
                Google Sign In
              </Button>
            </form>
            <Typography variant="caption">
              You must have a valid Service Tools Account to proceed.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;
