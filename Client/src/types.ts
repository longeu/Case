import { RouteComponentProps } from "react-router";

export interface MyRoute {
  title: string;
  path: string;
  component?: any;
  isExact?: boolean;
  scope?: string;
  icon?: string;
  parentPath?: string;
  redirect?: string;
  notShowChildren?: boolean;
  routes?: MyRoute[];
}

export interface ComponentProps {
  routeValues: RouteComponentProps;
  route: MyRoute;
}

export interface optionType {
  value: number;
  label: string;
}

export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
