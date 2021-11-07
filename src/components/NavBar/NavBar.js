import React from "react";
import img from "../../assets/logo.png";
import { Avatar, Typography, Toolbar, Box, AppBar, Tabs, Tab } from "@mui/material";
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
const allTabs = ["/", "/holy-grail", "/database"];

export default function NavBar(props) {
  const { loggedIn, setLoggedIn } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#12121200" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" display="flex" alignItems="center">
            <Link to={allTabs[0]} className="header-link">
              <Avatar alt="Remy Sharp" src={img} style={{ marginRight: "5px" }} />
              <Typography color="primary" variant="h6" className="diablo-text shadow">
                D2tracker
              </Typography>
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
                      value={allTabs[0]}
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
                    <CustomTab className="diablo-text shadow" label="Database" value="/database" component={Link} to={allTabs[2]} />

                    {location.pathname === "/login" && (
                      <CustomTab className="diablo-text shadow" label="Login" value="/login" component={Link} to={"/login"} disabled />
                    )}
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
