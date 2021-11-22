import { getAuth, signInWithPopup } from "@firebase/auth";
import React, { useContext, createContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { initDatabase } from "../Firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  let history = useHistory();
  let location = useLocation();

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLogginIn] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  const signIn = (provider) => {
    setLogginIn(true);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setLoggedIn(true);
        setUser(result);
        history.push("/run-analyze");
        setLogginIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = (cb) => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
      setLoggedIn(false);
      cb();
    });
  };

  React.useEffect(() => {
    if (!user) {
      setLogginIn(true);
      const auth = getAuth();
      auth.onAuthStateChanged(async (res) => {
        if (res) {
          await initDatabase(res);
          setUser(res);
          setLoggedIn(true);
          history.push("/run-analyze");
          setLogginIn(false);
        } else {
          setLogginIn(false);
        }
      });
    }
  }, [user, setUser, history, from]);

  return <AuthContext.Provider value={{ user, loggedIn, loggingIn, signIn, signOut }}>{children}</AuthContext.Provider>;
}
