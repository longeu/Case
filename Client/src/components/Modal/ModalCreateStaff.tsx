import Button from "@restart/ui/esm/Button";
import { AddUpdateForm } from "pages/Staff/Components/Form/Form";
import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalCreateStaff(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.staff.id
            ? "Cập nhật thông tin nhân viên"
            : " Thêm mới nhân viên"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUpdateForm staff={props.staff} onHide={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onHide()} className="btn btn-default">
          Thoát
        </Button>
        <Button form="staff-form" className="btn btn-primary" type="submit">
          Lưu thông tin
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
