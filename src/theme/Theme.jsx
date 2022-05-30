import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#007f7f",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    //mode: "dark",
    primary: {
      main: "#007f7f",
    },
    secondary: {
      main: "#f50057",
    },
  },
  // components: {
  //   MuiSelect: {
  //     styleOverrides: {
  //       root: {
  //         "&.MuiSelect-root": {
  //           backgroundColor: "#000",
  //           color: "#fff",
  //         },
  //       },
  //     },
  //   },
  // },
});
