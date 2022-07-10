import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { MyRoute } from "../../types";

interface PrivateRouteProps {
  route: MyRoute;
  key: number;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const selectState = (state: RootState) => state.currentUser;
  const currentUser = useSelector(selectState);

  const { token } = currentUser;
  const { route } = props;

  if (token) {

    return (
      <Route
        path={route.path}
        exact={route.isExact}
        render={(props) => <route.component {...props} route={route} />}
      />
    );
  } else {
    return <Redirect exact from="*" to="/login" />;
  }
};

export default PrivateRoute;
