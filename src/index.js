import React from "react";
import ReactDOM from "react-dom";
import Flights from "./Flights/flights";
import reportWebVitals from "./reportWebVitals";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#44a2d2",
      light: "#44a2d2",
      dark: "some dark value goes here",
    },
    secondary: {
      main: "#d24474",
      light: "#d24474",
      dark: "some dark value goes here",
    },
    primaryText: {
      main: "#46a2cf",
      light: "#46a2cf",
    },
    white: {
      main: "#fff",
      light: "#fff",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    {/* Provide Material-UI with date picker styling and functionality */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* Provide app with material-ui theme */}
      <ThemeProvider theme={theme}>
        {/* Including css baseline so styling is consistent among different browsers */}
        <CssBaseline />
        <Flights id="app" />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
