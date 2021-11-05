import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

import MainLayout from "./components/RunLayout/RunLayout.js";

import img from "./components/NavBar/logo.png";
import { Avatar, Typography, Toolbar, Box, AppBar, Tabs, Tab, IconButton, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";

import AccountCircle from "@mui/icons-material/AccountCircle";

import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7D0B0D",
    },
    secondary: {
      main: "#fbce50",
    },
    info: {
      main: "#ffffff",
    },
  },
});

const CustomTab = withStyles({
  selected: {
    background: "linear-gradient(0deg, rgba(125,11,13,0.2) 0%, rgba(0,212,255,0) 30%)",
  },
  disabled: {
    opacity: 0.3,
  },
})(Tab);

function App() {
  const allTabs = ["/", "/holy-grail", "/mule"];

  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div" display="flex" alignItems="center">
                <Link to={allTabs[0]} className="header-link">
                  <Avatar alt="Remy Sharp" src={img} style={{ marginRight: "10px" }} />
                  <span className="diablo-text shadow unique">D2tracker</span>
                </Link>
              </Typography>
              <Box sx={{ marginLeft: "50px" }}>
                <Route
                  path="/"
                  render={({ location }) => (
                    <>
                      <Tabs value={location.pathname} centered>
                        <CustomTab
                          className="diablo-text shadow"
                          label="Run Analyze"
                          value={loggedIn ? allTabs[0] : "/login"} // Hack to not need to add the tab for login
                          component={Link}
                          to={allTabs[0]}
                          disabled={!loggedIn}
                        />
                        <CustomTab
                          className="diablo-text shadow"
                          label="🛠️ Holy Grail"
                          value="/holy-grail"
                          style={{ textDecoration: "line-through" }}
                          component={Link}
                          to={allTabs[1]}
                          disabled
                        />
                        <CustomTab
                          className="diablo-text shadow"
                          label="🛠️ Mules "
                          style={{ textDecoration: "line-through" }}
                          value="/mule"
                          component={Link}
                          to={allTabs[2]}
                          disabled
                        />
                      </Tabs>
                    </>
                  )}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <Switch>
          <Route exact path={allTabs[0]}>
            {loggedIn ? <MainLayout /> : <Redirect from="/" to={{ pathname: "/login" }} />}
          </Route>
          <Route path={allTabs[1]} render={() => <div>hallo</div>} />
          <Route path={allTabs[2]} render={() => <div></div>} />
          <Route exact path={"/login"}>
            <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn}></SignIn>
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// TODO: Logging in fine, but route back doesn't work. Line 103 is maybe the cause

export default App;
