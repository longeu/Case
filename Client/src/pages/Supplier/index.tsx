import GenerateRoute from "components/GenerateRoute/GenerateRoute";
import React, { ReactElement } from "react";
import { ComponentProps } from "../../types";

export default function Supplier_index(props: ComponentProps): ReactElement {
  return (
    <section className="content-wrapper">
      <GenerateRoute route={props.route} />
    </section>
  );
}
