import React from "react";
interface UpdateButtonProps {
  disable?: boolean;
  onClick: () => void;
}
function UpdateButton(props: UpdateButtonProps) {
  return (
    <button
      disabled={props.disable}
      className="btn btn-outline-success mr-2"
      onClick={() => props.onClick()}
    >
      <i className="fa fa-wrench mr-2"></i>
      Sửa
    </button>
  );
}

export default UpdateButton;
