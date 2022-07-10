import GenerateRoute from "components/GenerateRoute/GenerateRoute";
import React, { ReactElement } from "react";

import { ComponentProps } from "../../types";
interface Props {}

export default function ImportGoods_index(props: ComponentProps): ReactElement {
  return (
      <GenerateRoute route={props.route} />
  );
}
