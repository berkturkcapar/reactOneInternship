import logo from "./logo.svg";
import "./App.css";
import Form from "./Pages/Form";
import React from "react";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import { CssBaseline } from "@material-ui/core";

function App() {
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: purple[500],
      },
      secondary: {
        main: purple[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Form />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
