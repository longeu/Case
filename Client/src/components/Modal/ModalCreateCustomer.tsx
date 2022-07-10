import Button from "@restart/ui/esm/Button";
import { AddUpdateForm } from "pages/Customer/Component/Form/Form";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
export default function ModalCreateCustomer(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.customer?.id
            ? "Cập nhật thông tin khách hàng"
            : " Thêm mới khách hàng"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUpdateForm
          activeOrder={props.activeOrder}
          customer={props.customer}
          onHide={props.onHide}
          updateCustomerOrder={props.updateCustomerOrder}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btn btn-default">
          Thoát
        </Button>
        <Button form="customer-form" className="btn btn-primary" type="submit">
          Lưu thông tin
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
