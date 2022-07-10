import React, { ReactElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { setShow } from "reducers/toastSlice";

import ImportGoods from "interfaces/import-goods.interface";
import { PurchaseOrderDetailInterface } from "interfaces/import-goods-detail.interface";

interface Props {
  show: boolean;
  onHide: () => void;
  product: PurchaseOrderDetailInterface;
  discount: number;
  setDiscount: (discount: number) => void;
  totalDiscountModal: any;
  setTotalDiscountModal: (totalDiscountModal: any) => void;
  importGoods: ImportGoods;
  setImportGoods: (importGoods: ImportGoods) => void;
  productDetailModal: any;
  setProductDetailModal: (productDetailModal: any) => void;
  handleDiscountOnChange:(e: any, product:any)=>void;
}

export default function ModalDiscount({
  show,
  onHide,
  product,
  discount,
  setDiscount,
  totalDiscountModal,
  setTotalDiscountModal,
  importGoods,
  setImportGoods,
  productDetailModal,
  setProductDetailModal,
  handleDiscountOnChange
}: Props): ReactElement {
  const dispatch = useDispatch();

  const [discountBtn, setDiscountBtn] = useState(true);
  const [valueInput, setValueInput] = useState<number>(0);

  const valueInputChange = (values: any) => {
    console.log(values.value);
    if (Number(values.value) > 0 || values.value === "") {
      setValueInput(values.value);
    }
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
    let discountValue = 0;
    console.log(totalDiscountModal)
    if (totalDiscountModal.isTotalDiscount) {
      if (!discountBtn) {
        discountValue = Number(valueInput);
      } else {
        discountValue = importGoods.totalPrice * (Number(valueInput) / 100);
        console.log(discountValue);
      }

      if (discountValue > totalDiscountModal.totalPrice) {
        discountValue = 0;
        const action = setShow({
          show: true,
          content: "Chiết khấu không được lớn hơn giá trị đơn hàng",
          type: "error",
        });
        dispatch(action);
        setValueInput(0);
        setDiscount(0);
      }
      setImportGoods({
        ...importGoods,
        discount: discountValue,
        price: importGoods.totalPrice - discountValue,
      });
    } else {
      console.log(productDetailModal);
      if (!discountBtn) {
        discountValue = Number(valueInput);
      } else if(discountBtn) {
        discountValue =productDetailModal.price * (Number(valueInput) / 100);
        console.log(discountValue);
      }
      console.log(valueInput);
      if (discountValue > totalDiscountModal.totalPrice) {
        discountValue = 0;
        const action = setShow({
          show: true,
          content: "Chiết khấu không được lớn hơn giá trị đơn hàng",
          type: "error",
        });
        dispatch(action);
        setValueInput(0);
        setDiscount(0);
      }
      handleDiscountOnChange(discountValue, productDetailModal);
    }
    onHide();
  };
  return (
    <div>
      <Modal
        {...{ show, onHide }}
        style={{
            maxWidth: "500px",
            margin: "auto",
            left: "50%",
            transform: "translateX(-50%)",
        }}
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
          <Button onClick={onHide} className="btn btn-default">
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
    </div>
  );
}
