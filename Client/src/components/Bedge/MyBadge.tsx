import React from "react";
import { Badge } from "react-bootstrap";
interface MyBadgeProps {
  content: string;
  color:
    | "primary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light "
    | "secondary"
    | "dark";
  className?: string;
}
function MyBadge(props: MyBadgeProps) {
  return (
    <Badge className={`bg-${props.color} ${props.className}`}>
      {props.content}
    </Badge>
  );
}

export default MyBadge;
