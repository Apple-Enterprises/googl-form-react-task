import React from "react";
import { Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => <Component {...props} />
      // !isAuthenticated() ? (
      //   <Component {...props} />
      // ) : (
      //   <Redirect
      //     Redirect to login
      //   />
      // )
    }
  />
);

export default PrivateRoute;
