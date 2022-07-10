import React from "react";
interface DeleteButtonProps {
  disable?: boolean;
  onClick: () => void;
}

function DeleteButton(props: DeleteButtonProps) {
  return (
    <button
      disabled={props.disable}
      className="btn btn-outline-danger"
      onClick={() => props.onClick()}
    >
      <i className="fa fa-trash mr-2"></i>
      Xóa
    </button>
  );
}

export default DeleteButton;
