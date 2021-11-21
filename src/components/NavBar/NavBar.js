import React from "react";
import img from "../../assets/logo.png";
import { Avatar, Typography, Toolbar, Box, AppBar, Tabs, Tab } from "@mui/material";
import { withStyles } from "@mui/styles";

import { Route, Link } from "react-router-dom";

import AccountMenu from "../AccountMenu/AccountMenu";
import { useAuth } from "../../Context/AuthContext";

const CustomTab = withStyles({
  selected: {
    background: "linear-gradient(0deg, rgba(143,108,50,0.2) 0%, rgba(0,212,255,0) 20%)",
  },
  disabled: {
    opacity: 0.3,
  },
})(Tab);

export default function NavBar() {
  const allTabs = ["/run-analyze", "/holy-grail", "/database", "/active"];
  const { loggedIn } = useAuth();

  const handleNestedPaths = (pathName) => {
    if (pathName === "/run-analyze/active" || pathName === "/run-analyze/summary") {
      return "/run-analyze";
    } else {
      return pathName;
    }
  };

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
                  <Tabs value={handleNestedPaths(location.pathname)} centered>
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
                      label="Holy Grail"
                      value={allTabs[1]}
                      component={Link}
                      to={allTabs[1]}
                      disabled={!loggedIn}
                    />
                    <CustomTab
                      className="diablo-text shadow"
                      label="Database"
                      value={allTabs[2]}
                      component={Link}
                      to={allTabs[2]}
                      disabled={!loggedIn}
                    />

                    {location.pathname === "/" && (
                      <CustomTab className="diablo-text shadow" label="Login" value="/" component={Link} to={"/"} disabled />
                    )}
                  </Tabs>
                </>
              )}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {loggedIn && <AccountMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
