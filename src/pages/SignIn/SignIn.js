import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { initDatabase } from "../../Firebase/firebase"; // This import makes sure that firebase is initialized.
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import GithubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";

import "./sign-in.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../Context/AuthContext";
import { useHistory, useLocation } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function SignIn() {
  const { loggedIn, signIn } = useAuth();

  const [showButtons, setShowButtons] = useState(false);

  // Used to redirect back to the page that was routed from.

  const signInWith3dParty = (provider) => {
    signIn(provider);
    setShowButtons(false);
  };

  React.useEffect(() => {
    if (!loggedIn) {
      setShowButtons(true);
    }
  }, [loggedIn]);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", position: "relative", top: "30%", justifyContent: "center" }}>
      {!loggedIn ? (
        <LoadingSpinner text="Logging in..." />
      ) : (
        <Box sx={{ height: "fit-content", padding: "30px" }} className="paper-design">
          <Box sx={{ padding: "20px" }}>
            <Typography color="white" variant="h4" className="diablo-text shadow" sx={{ marginLeft: "-4px" }}>
              Login To D2tracker
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "15px" }}>
              <Typography color="gray" variant="caption">
                In order to save your progress and data, this service requires you to authenticate using either Google or Github.
              </Typography>

              <Button color="secondary" onClick={() => signInWith3dParty(googleProvider)} endIcon={<GoogleIcon />}>
                Login with Google
              </Button>
              <Button color="secondary" onClick={() => signInWith3dParty(githubProvider)} endIcon={<GithubIcon />}>
                Login with GitHub
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
