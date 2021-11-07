import { Button, Typography, Paper, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { app, initDatabase } from "../../firebase/firebase"; // This import makes sure that firebase is initialized.
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import GithubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";

import "./sign-in.css";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function SignIn(props) {
  const { loggedIn, setLoggedIn } = props;
  const [showButtons, setShowButtons] = useState(false);

  const signInWith3dParty = (provider) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        //console.log("setting it to true!");
        setLoggedIn(true);
        setShowButtons(false);

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!loggedIn) {
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log(user);
          await initDatabase(user);
          setShowButtons(false);
          setLoggedIn(true);
          return;
        } else {
          setShowButtons(true);
        }
      });
    }
  }, [loggedIn, setLoggedIn]);

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", position: "relative", top: "30%", justifyContent: "center" }}>
      {!showButtons ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress />
          <Typography color="gray" className="diablo-text caps">
            Logging in...
          </Typography>
        </Box>
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
