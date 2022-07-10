import React from "react";
import { Alert } from "react-bootstrap";
import "./style.css";
interface MyAlertProps {
  content?: string;
  isShow?: boolean;
  onClose: () => void;
}
function MyAlert(props: MyAlertProps) {
  return (
    <Alert
      className="m-0 p-2"
      variant="info"
      show={props.isShow}
      dismissible
      onClose={() => props.onClose()}
    >
      <span>{props.content}</span>
    </Alert>
  );
}

export default MyAlert;
