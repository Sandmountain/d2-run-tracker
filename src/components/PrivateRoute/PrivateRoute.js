// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from "react-router";
import { useAuth } from "../../Context/AuthContext";

// screen if you're not yet authenticated.
export const PrivateRoute = ({ children, ...rest }) => {
  const { loggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
