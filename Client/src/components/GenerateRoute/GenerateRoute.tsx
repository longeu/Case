import { RootState } from "app/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { setShow } from "reducers/toastSlice";
import { MyRoute } from "../../types";
interface GenerateRouteProps {
  route: MyRoute;
}
function GenerateRoute(props: GenerateRouteProps) {
  const { user } = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const route = props.route;
  console.log(route);
  if (
    route.scope &&
    !user.scopes.includes("full") &&
    !user.scopes.includes(route.scope)
  ) {
    const action = setShow({
      show: true,
      content: "Bạn không có quyền truy cập vào trang này !",
      type: "error",
    });
    dispatch(action);
    history.push("/dashboard");
  }
  return (
    <Switch>
      {props.route.redirect ? (
        <Redirect exact from={props.route.path} to={props.route.redirect} />
      ) : (
        ""
      )}
      {props.route.routes?.map((route, index) => {
        return (
          <Route
            path={route.path}
            key={index}
            render={(props) => <route.component {...props} route={route} />}
          />
        );
      })}
    </Switch>
  );
}

export default GenerateRoute;
