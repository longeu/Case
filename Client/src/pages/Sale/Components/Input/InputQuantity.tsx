import orderDetail from "interfaces/orderDetail.interface";
import { ProductDetailRequest } from "pages/Product/types";
import * as React from "react";
import { useDispatch } from "react-redux";
import { setShow } from "reducers/toastSlice";
import styles from "../../index.module.css";
export interface IInputQuantityProps {
  handleClickUpdate: Function;
  orderDetail: orderDetail;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function InputQuantity(props: IInputQuantityProps) {
  const dispatch = useDispatch();
  const { inputRef, orderDetail, handleClickUpdate } = props;
  const [valueInput, setValueInput] = React.useState<number | string>(
    orderDetail.quantity
  );
  React.useEffect(() => {
    setValueInput(orderDetail.quantity);
  }, [orderDetail.quantity]);
  const [quantity, SetQuantity] = React.useState<number | string>(
    orderDetail.quantity
  );
  React.useEffect(() => {
    handleClickUpdate(orderDetail.productDetailModel, quantity);
  }, [quantity]);
  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      minus();
    }
    if (e.key === "ArrowUp") {
      plus();
    }
  };

  const handleOnchange = (e: any) => {
    const value = e.target.value;
    if (Number(value) > 0 || value === "") {
      setValueInput(value);
    }
    return;
  };
  const handleBlur = (productDetail: ProductDetailRequest) => {
    if (Number(valueInput) > 0) {
      if (Number(valueInput) > productDetail.quantity) {
        setValueInput(productDetail.quantity);
        SetQuantity(productDetail.quantity);
        const action = setShow({
          show: true,
          content: "Sản phẩm đã đạt số lượng tối đa !",
          type: "error",
        });
        dispatch(action);
      } else {
        SetQuantity(Number(valueInput));
      }
    } else {
      const action = setShow({
        show: true,
        content: "Số lượng sản phẩm phải lớn hơn 0 !",
        type: "error",
      });
      dispatch(action);
      setValueInput(1);
      SetQuantity(1);
    }
  };
  const minus = () => {
    if (quantity > 1) {
      SetQuantity(Number(quantity) - 1);
      setValueInput(Number(quantity) - 1);
    } else {
      const action = setShow({
        show: true,
        content: "Số lượng sản phẩm tối thiểu là 1 !",
        type: "error",
      });
      dispatch(action);
    }
  };
  const plus = () => {
    SetQuantity(Number(quantity) + 1);
    setValueInput(Number(quantity) + 1);
    if (Number(quantity) >= orderDetail.productDetailModel.quantity) {
      SetQuantity(orderDetail.productDetailModel.quantity);
      setValueInput(orderDetail.productDetailModel.quantity);
      const action = setShow({
        show: true,
        content: "Sản phẩm đã đạt số lượng tối đa !",
        type: "error",
      });
      dispatch(action);
    }
  };
  return (
    <>
      <i
        className="fas fa-minus mr-1"
        onClick={() => minus()}
        style={{
          lineHeight: "40px",
          cursor: "pointer",
        }}
      ></i>
      <input
        className="form-control input_quantity"
        ref={inputRef}
        onKeyDown={(e) => handleKeyDown(e)}
        type="text"
        onChange={(e: any) => {
          handleOnchange(e);
        }}
        onBlur={() => handleBlur(orderDetail.productDetailModel)}
        value={valueInput}
      />
      <i
        className={["fas fa-plus ml-1", styles.icon_plus].join(" ")}
        onClick={() => plus()}
        style={{
          lineHeight: "40px",
          cursor: "pointer",
        }}
      ></i>
    </>
  );
}
