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
  const allTabs = ["/", "/holy-grail", "/database"];

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter basename="/d2-run-tracker">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BackgroundImage></BackgroundImage>
          <NavBar />
          <HolyGrailProvider loggedIn={loggedIn}>
            <Switch>
              <PrivateRoute exact path={allTabs[0]}>
                <RunLayout />
              </PrivateRoute>
              <PrivateRoute path={allTabs[1]}>
                <HolyGrailLayout />
              </PrivateRoute>
              <Route path={allTabs[2]} render={() => <DatabaseLayout />} />
              <Route exact path={"/login"}>
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
