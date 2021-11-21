import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutDialog from "../Dialogs/LogoutDialog";

import { Typography } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";

export default function AccountMenu() {
  const { user, signOut } = useAuth();

  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    signOut(() => {
      setOpenLogoutDialog(false);
    });
  };

  React.useEffect(() => {
    //const auth = getAuth();
    setCurrentUser(user && user);
  }, [user]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: "#2c2c2c",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#2c2c2c",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem>
          <Avatar src={currentUser.photoURL} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {currentUser.displayName}
            <Typography sx={{ margin: 0, color: "gray", lineHeight: "1em" }} variant="caption">
              {" "}
              Signed in with {currentUser.providerId}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => setOpenLogoutDialog(true)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <LogoutDialog setOpenLogoutDialog={setOpenLogoutDialog} openLogoutDialog={openLogoutDialog} logoutUser={logoutUser} />
    </>
  );
}
