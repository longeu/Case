import React from "react";
import { Modal } from "react-bootstrap";
interface ShowImageProps {
  isOpen?: boolean;
  onHide: () => void;
  value?: string;
}
function ShowImage(props: ShowImageProps) {
  return (
    <Modal show={props.isOpen} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Chi tiết ảnh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img
            src={props.value}
            alt="img-detail"
            style={{ width: "100%", height: 500 }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ShowImage;
