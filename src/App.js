import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainLayout from "./pages/RunAnalyze/RunLayout/RunLayout.js";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import NavBar from "./components/NavBar/NavBar";

import "./styles/App.css";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage.js";

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
        <Switch>
          <Route exact path={allTabs[0]}>
            {loggedIn ? <MainLayout /> : <Redirect from="/" to={{ pathname: "/login" }} />}
          </Route>
          <Route path={allTabs[1]} render={() => <div>hallo</div>} />
          <Route path={allTabs[2]} render={() => <div></div>} />
          <Route exact path={"/login"}>
            {!loggedIn ? (
              <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn}></SignIn>
            ) : (
              <Redirect from="/login" to={{ pathname: "/" }} />
            )}
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// TODO: Logging in fine, but route back doesn't work. Line 103 is maybe the cause

export default App;
