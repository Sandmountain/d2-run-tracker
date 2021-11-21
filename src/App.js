import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RunLayout from "./pages/RunAnalyze/RunLayout/RunLayout.js";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import NavBar from "./components/NavBar/NavBar";

import { HolyGrailProvider } from "./Context/HolyGrailContext.js";
import { AuthProvider } from "./Context/AuthContext.js";

import "./styles/App.css";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage.js";
import DatabaseLayout from "./pages/Database/DatabaseLayout/DatabaseLayout.js";
import HolyGrailLayout from "./pages/HolyGrail/HolyGrailLayout.js";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import SummaryViewById from "./pages/RunAnalyze/SummaryViewById/SummaryViewById.js";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8f6c32",
    },
    secondary: {
      main: "#8f6c32",
    },
    // #fbce50
    info: {
      main: "#ffffff",
    },
  },
});

function App() {
  const allTabs = ["/run-analyze", "/holy-grail", "/database"];

  return (
    <BrowserRouter basename="/d2-run-tracker">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BackgroundImage></BackgroundImage>
          <NavBar />
          <HolyGrailProvider>
            <Switch>
              <PrivateRoute path={`${allTabs[0]}`}>
                <RunLayout />
              </PrivateRoute>
              <PrivateRoute path={allTabs[1]}>
                <HolyGrailLayout />
              </PrivateRoute>
              <PrivateRoute path={allTabs[2]}>
                <DatabaseLayout />
              </PrivateRoute>
              <Route exact path={"/summary"}>
                <SummaryViewById />
              </Route>
              <Route path={"/"}>
                <SignIn></SignIn>
              </Route>
            </Switch>
          </HolyGrailProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
