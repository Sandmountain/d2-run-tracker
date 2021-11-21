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
  let { from } = location.state || { from: { pathname: "/" } };

  const signIn = (provider, cb) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setLoggedIn(true);
        setUser(result);
        console.log(result);
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
      const auth = getAuth();
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await initDatabase(user);
          setUser(user);
          setLoggedIn(true);
          history.replace(from);
        }
      });
    }
  }, [user, setUser, history, from]);

  return <AuthContext.Provider value={{ user, loggedIn, signIn, signOut }}>{children}</AuthContext.Provider>;
}
