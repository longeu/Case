import GenerateRoute from "components/GenerateRoute/GenerateRoute";
import React from "react";
import { ComponentProps } from "../../types";

function Staff(props: ComponentProps) {
  return (
    <section className="content-wrapper">
      <GenerateRoute route={props.route} />
    </section>
  );
}

export default Staff;
