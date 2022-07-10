import React from "react";
import GenerateRoute from "../../../components/GenerateRoute/GenerateRoute";
import { ComponentProps } from "../../../types";

function RefundBill(props: ComponentProps) {
  return <GenerateRoute route={props.route} />;
}

export default RefundBill;
