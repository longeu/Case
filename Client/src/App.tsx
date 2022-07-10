import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import routes from "./routes/routes";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => {
          if (route.scope) {
            return <PrivateRoute key={index} route={route} />;
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                render={(props) => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            );
          }
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
