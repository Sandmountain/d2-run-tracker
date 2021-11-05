import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { app } from "../../Firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function SignIn(props) {
  const { loggedIn, setLoggedIn } = props;

  console.log("props", props);
  useEffect(() => {
    if (!loggedIn) {
      console.log("calling this");
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log(user);
          setLoggedIn(true);
          return;
        } else {
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              // const token = credential.accessToken;
              // // The signed-in user info.
              // const user = result.user;
              console.log("setting it to true!");
              setLoggedIn(true);

              // ...
            })
            .catch((error) => {
              console.log(error);
              // Handle Errors here.
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // // The email of the user's account used.
              // const email = error.email;
              // // The AuthCredential type that was used.
              // const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }
      });
    }
  }, [loggedIn, setLoggedIn]);

  return <div>Logging in</div>;
}
