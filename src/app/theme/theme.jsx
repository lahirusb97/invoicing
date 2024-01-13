// theme.js
"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#a039a9",
      contrastText: "#ffffff",
      dark: "#852685",
      green: "#12F944",
      red: "#FF4343",
    },
    secondary: {
      main: "#244AAB",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#222222",
      secondary: "#373737",
      disabled: "#b3b3b3",
      hint: "#5e5d5d",
    },
  },
});

export default theme;
