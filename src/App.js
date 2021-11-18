import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RunLayout from "./pages/RunAnalyze/RunLayout/RunLayout.js";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import NavBar from "./components/NavBar/NavBar";

import "./styles/App.css";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage.js";
import DatabaseLayout from "./pages/Database/DatabaseLayout/DatabaseLayout.js";
import HolyGrailLayout from "./pages/HolyGrail/HolyGrailLayout.js";
import { HolyGrailProvider } from "./Context/HolyGrailContext.js";
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
        <BackgroundImage></BackgroundImage>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <HolyGrailProvider loggedIn={loggedIn}>
          <Switch>
            <Route exact path={allTabs[0]}>
              {loggedIn ? <RunLayout /> : <Redirect push from="/" to={{ pathname: "/login" }} />}
            </Route>
            <Route path={allTabs[1]} loading>
              {loggedIn ? <HolyGrailLayout /> : <Redirect push from="/holy-grail" to={{ pathname: "/login" }} />}
            </Route>
            <Route path={allTabs[2]} render={() => <DatabaseLayout />} />
            <Route exact path={"/login"}>
              {!loggedIn ? (
                <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn}></SignIn>
              ) : (
                <Redirect from="/login" to={{ pathname: "/holy-grail" }} />
              )}
            </Route>
          </Switch>
        </HolyGrailProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
