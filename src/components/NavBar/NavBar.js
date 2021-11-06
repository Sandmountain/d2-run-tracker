import React from "react";
import img from "./logo.png";
import { Avatar, Typography, Toolbar, Box, AppBar, Tabs, Tab, IconButton } from "@mui/material";
import { withStyles } from "@mui/styles";

import { Route, Link } from "react-router-dom";

import AccountMenu from "../AccountMenu/AccountMenu";

const CustomTab = withStyles({
  selected: {
    background: "linear-gradient(0deg, rgba(143,108,50,0.2) 0%, rgba(0,212,255,0) 20%)",
  },
  disabled: {
    opacity: 0.3,
  },
})(Tab);
const allTabs = ["/", "/holy-grail", "/mule"];

export default function NavBar(props) {
  const { loggedIn, setLoggedIn } = props;

  return (
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
                    <CustomTab
                      className="diablo-text shadow"
                      label="🛠️ lgogin "
                      style={{ textDecoration: "line-through" }}
                      value="/login"
                      component={Link}
                      to={"/login"}
                      disabled
                    />
                  </Tabs>
                </>
              )}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {loggedIn && <AccountMenu setLoggedIn={setLoggedIn} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
