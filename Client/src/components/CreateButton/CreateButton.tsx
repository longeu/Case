import React from "react";
interface CreateButtonProps {
  onClick: () => void;
}

function CreateButton(props: CreateButtonProps) {
  return (
    <button className="btn btn-info" onClick={() => props.onClick()}>
      <i className="fa fa-plus mr-2"></i>
      Thêm mới
    </button>
  );
}

export default CreateButton;
