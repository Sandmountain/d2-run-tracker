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
  const [loadingAuth, setLoadingAuth] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  const signIn = (provider) => {
    const auth = getAuth();
    setLoadingAuth(true);

    signInWithPopup(auth, provider)
      .then(async (result) => {
        setLoggedIn(true);
        setUser(result);
        history.push("/run-analyze");

        setLoadingAuth(false);
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
    if (!user && !loggedIn && !loadingAuth) {
      setLoadingAuth(true);
      const auth = getAuth();
      auth.onAuthStateChanged(async (res) => {
        if (res) {
          await initDatabase(res);
          setUser(res);
          setLoggedIn(true);
          history.push("/run-analyze");
          setLoadingAuth(false);
        } else {
          setLoadingAuth(false);
        }
      });
    }
  }, [user, setUser, history, from, loggedIn, loadingAuth]);

  return <AuthContext.Provider value={{ user, loggedIn, loadingAuth, signIn, signOut }}>{children}</AuthContext.Provider>;
}
