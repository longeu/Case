import orderDetail from "interfaces/orderDetail.interface";
import orderType from "interfaces/orderType.interface";
import * as React from "react";
import { Link } from "react-router-dom";
import { formatter } from "types";
import InputQuantity from "../Input/InputQuantity";
export interface IListProductResultProps {
  order: orderType;
  handleClickUpdate: Function;
  handleClickRemove: Function;
  refs: React.RefObject<HTMLInputElement>[];
}

export default function ListProductResult(props: IListProductResultProps) {
  const { order, handleClickUpdate, handleClickRemove, refs } = props;

  return (
    <table className="table  mt-2" style={{ boxSizing: "border-box" }}>
      <thead className="table-light">
        <tr>
          <th>Mã</th>
          <th style={{ width: 250 }}>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th style={{ width: 134 }}>Giảm giá</th>
          <th style={{ width: 134 }}>Thành tiền</th>
          <th style={{ width: 30 }}></th>
        </tr>
      </thead>
      <tbody
        style={{
          maxHeight: "500px",
          overflowY: "scroll",
        }}
      >
        {order.orderDetails.map((orderDetail: orderDetail, index: number) => {
          return (
            <tr key={index} className="text-left">
              <td>{orderDetail.productDetailModel.code} </td>
              <td>
                <span>
                  <Link
                    to={`/product/${orderDetail.productDetailModel.productId}/detail`}
                  >
                    {orderDetail.productDetailModel.productName.length > 25
                      ? orderDetail.productDetailModel.productName.substring(
                          0,
                          25
                        ) + "..."
                      : orderDetail.productDetailModel.productName}
                  </Link>
                </span>
                <span className="d-block">
                  {" "}
                  {orderDetail.productDetailModel.color} -
                  {orderDetail.productDetailModel.size}
                </span>
              </td>

              <td
                style={{
                  display: "flex",
                  border: "none",
                }}
              >
                <InputQuantity
                  orderDetail={orderDetail}
                  handleClickUpdate={handleClickUpdate}
                  inputRef={refs[index]}
                />
              </td>
              <td>
                {formatter.format(orderDetail.productDetailModel.priceSell)}
              </td>
              <td>{formatter.format(orderDetail.discount)}</td>
              <td>
                {formatter.format(
                  orderDetail.quantity * orderDetail.price -
                    orderDetail.discount
                )}
              </td>
              <td>
                <i
                  className="fas fa-trash-alt icon_delete"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleClickRemove(orderDetail.productDetailModel.id)
                  }
                ></i>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot style={{ borderTop: "1px solid rgb(0 0 0 / 13%)" }}>
        <tr>
          <td colSpan={5}>
            <h5>Tổng tiền:</h5>
          </td>
          <td style={{ fontWeight: "bold" }} colSpan={2} className="text-left">
            {formatter.format(order.totalPrice - order.totalDiscount)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
