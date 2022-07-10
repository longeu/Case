import ModalDiscount from "components/Modal/ModalDiscount";
import orderType from "interfaces/orderType.interface";
import * as React from "react";
import CurrencyFormat from "react-currency-format";
import { formatter } from "types";
export interface ICheckOutProps {
  order: orderType;
  handleChangePayment: Function;
  handleChangeMoney: Function;
  handleChangeNote: Function;
  activeOrder: any;
}
export default function CheckOut(props: ICheckOutProps) {
  const {
    order,
    handleChangePayment,
    handleChangeMoney,
    handleChangeNote,
    activeOrder,
  } = props;
  const [modalShow, setModalShow] = React.useState(false);

  window.onkeydown = (e) => {
    if (e.key === "F6") {
      setModalShow(true);
    }
  };

  return (
    <div>
      <ModalDiscount
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeOrder={activeOrder}
      />
      <div className="row mt-2">
        <div className="col-8 text-left">
          <span style={{ lineHeight: "2.4" }}>
            Tổng tiền: (
            <span style={{ fontWeight: "bold" }}>{order?.totalQuantity}</span>{" "}
            sản phẩm)
          </span>
        </div>
        <div className="col-4 text-right">
          {formatter.format(order?.totalPrice as number)}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8 text-left">
          <h6 style={{ lineHeight: "2.4" }}>Giảm giá</h6>
        </div>
        <div className="col-4 text-right">
          {formatter.format(order?.totalDiscount as number)}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8 text-left">
          <h6>Chiết khấu (F6)</h6>
        </div>
        <div
          onClick={() => setModalShow(true)}
          className="col-4 text-right"
          style={{ cursor: "pointer" }}
        >
          <CurrencyFormat
            type="text"
            disabled={true}
            style={{
              textAlign: "right",
              cursor: "pointer",
              border: "none",
              borderBottom: "1.5px solid darkgray",
              borderRadius: 0,
              padding: 0,
              background: "#fff",
              fontSize: "17px",
              color: "black",
            }}
            className="form-control"
            value={order?.discount}
            decimalSeparator={","}
            thousandSeparator={"."}
            suffix={" ₫"}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8 text-left">
          <h5 style={{ fontWeight: "bold" }}>Khách cần trả</h5>
        </div>
        <div
          className="col-4 text-right mb-2 text-danger"
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          {formatter.format(order?.customerPay as number)}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8 text-left">
          <h6 style={{ lineHeight: "2.4" }}>Hinh thức </h6>
        </div>
        <div className="col-4 text-right">
          <select
            style={{
              padding: 5,
              textAlign: "right",
              borderRadius: 5,
            }}
            value={order?.payment}
            onChange={(val) => handleChangePayment(val)}
          >
            <option value="Tiền mặt" selected>
              Tiền mặt
            </option>
            <option value="VN PAY">VN PAY</option>
            <option value="Quẹt thẻ">Quẹt thẻ</option>
            <option value="Chuyển khoản">Chuyển khoản</option>
          </select>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8 text-left ">
          <h5 style={{ fontWeight: "bold", lineHeight: "2.4" }}>
            Tiền đã nhận
          </h5>
        </div>
        <div className="col-4 text-right ">
          <CurrencyFormat
            style={{
              textAlign: "right",
              border: "none",
              borderBottom: "1.5px solid darkgray",
              borderRadius: 0,
              padding: 0,
              fontWeight: "bold",
              fontSize: "22px",
              color: "#28a745",
            }}
            className="form-control"
            value={order?.money}
            onValueChange={(values) => {
              handleChangeMoney(values.value);
            }}
            decimalSeparator={","}
            thousandSeparator={"."}
            suffix={" ₫"}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8 text-left">
          <h6 style={{ lineHeight: "2.3" }}>Tiền thừa</h6>
        </div>
        <div className="col-4 text-right">
          {formatter.format(
            order?.money - order?.customerPay > 0
              ? order?.money - order?.customerPay
              : 0
          )}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">
          <textarea
            onChange={(e) => handleChangeNote(e)}
            value={order?.note}
            placeholder="Ghi chú đơn hàng"
            className="form-control"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
