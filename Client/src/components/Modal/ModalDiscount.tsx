import Button from "@restart/ui/esm/Button";
import { RootState } from "app/store";
import React, { useState } from "react";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { setDiscountFu } from "reducers/orderSlice";
import { setShow } from "reducers/toastSlice";
import { checkDiscount, discountPrice } from "utils/countPrice";

export default function ModalDiscount(props: any) {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.orderReducer);

  const [discountBtn, setDiscountBtn] = useState(true);
  const [valueInput, setValueInput] = useState<number | string>("");
  const [discount, setDiscount] = useState(0);
  const valueInputChange = (values: any) => {
    if (Number(values.value) > 0 || values.value === "") {
      setValueInput(values.value);
    }
    return;
  };
  const inputBlur = () => {
    if (Number(valueInput) > 0) {
      setDiscount(Number(valueInput));
    } else {
      setValueInput(0);
      setDiscount(0);
    }
  };
  const applyDiscount = () => {
    const orderPay =
      order[props.activeOrder].totalPrice -
      order[props.activeOrder].totalDiscount;
    const discountOrder = discountBtn
      ? discountPrice(orderPay, discount)
      : discount;

    if (discountOrder > orderPay) {
      const action = setShow({
        show: true,
        content: "Chiết khấu không được lớn hơn giá trị đơn hàng",
        type: "error",
      });
      dispatch(action);
      setValueInput(0);
      setDiscount(0);
    } else {
      const action = setDiscountFu({
        discountOrder: discountOrder,
        index: props.activeOrder,
      });
      dispatch(action);
      props.onHide();
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Chiết khấu đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "0 15px" }}>
          <div className="row">
            <div className="col-9 text-left d-flex align-items-center">
              <div className="mr-4">
                <h6>Chọn chiết khấu </h6>
              </div>
              <div style={{ display: "grid" }}>
                <button
                  onClick={() => setDiscountBtn(true)}
                  className={
                    discountBtn ? "btn btn-primary" : "btn btn-default"
                  }
                  style={{
                    borderRadius: "unset",
                    padding: "5px 0",
                    width: "60px",
                  }}
                >
                  %
                </button>
                <button
                  onClick={() => setDiscountBtn(false)}
                  className={
                    !discountBtn ? "btn btn-primary" : "btn btn-default"
                  }
                  style={{
                    borderRadius: "unset",
                    padding: "5px 0",
                    width: "60px",
                  }}
                >
                  Giá trị
                </button>
              </div>
            </div>
            <div className="col-3 d-flex align-items-center text-right">
              <CurrencyFormat
                value={valueInput}
                onValueChange={(values) => valueInputChange(values)}
                onBlur={inputBlur}
                decimalSeparator={","}
                thousandSeparator={"."}
                suffix={discountBtn ? "%" : " ₫"}
                style={{
                  border: "none",
                  borderBottom: "1px solid",
                  textAlign: "right",
                  width: "110px",
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="btn btn-default">
            Thoát
          </Button>
          <Button
            form="customer-form"
            className="btn btn-primary"
            onClick={applyDiscount}
          >
            Áp dụng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
