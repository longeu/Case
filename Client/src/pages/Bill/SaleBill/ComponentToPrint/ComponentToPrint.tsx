import { RootState } from "app/store";
import * as React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import orderDetail from "interfaces/orderDetail.interface";
import { formatter } from "types";
import { OrderDetailRequest, OrderRequest } from "../interface/typesSaleBill";

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  const order: OrderRequest = props.order;
  const getTotalDiscount = (orderDetails: OrderDetailRequest[]): number => {
    const price = orderDetails?.reduce(
      (price: number, orderDetail: OrderDetailRequest) => {
        return price + orderDetail.discount;
      },
      0
    );
    return price;
  };

  return (
    <div ref={ref} key={Math.floor(Math.random() * 1000)}>
      <div className="container mt-3">
        <div className="text-center">
          <h4 style={{ fontWeight: "bold" }}>SAPO SHOP</h4>
        </div>
        <div className="text-center">
          <p style={{ fontWeight: "bold" }}>
            Địa chỉ: Tầng 6 - Tòa nhà Ladeco - 266 Đội Cấn - Phường Liễu Giai -
            Quận Ba Đình - TP Hà Nội{" "}
          </p>
        </div>
        <div className="text-center">
          <p style={{ fontWeight: "bold" }}>Liên hệ: 19006750</p>
        </div>
        <div className="text-center">
          <h4 style={{ fontWeight: "bold" }}>HOÁ ĐƠN BÁN HÀNG</h4>
        </div>
        <div
          className="row"
          style={{ borderBottom: "1px solid", paddingBottom: 10 }}
        >
          <div className="col-6 text-left">
            <h6>Số:{order.code}</h6>
          </div>
          <div className="col-6 text-right">
            <h6>Ngày:{moment(order.createdAt).format("L")}</h6>
          </div>
        </div>
        <div className="row mt-3" style={{ borderBottom: "2px dotted" }}>
          <div className="col-6 text-left">
            {order.customer?.id !== 38 ? (
              <>
                <p>
                  Khách hàng: <b>{order?.customer?.name}</b>
                </p>
                <p>
                  Điện thoại: <b>{order?.customer?.phone}</b>
                </p>
                <p>
                  Địa chỉ: <b>{order?.customer?.addressDetail}</b>
                </p>
              </>
            ) : (
              <>
                <p>
                  Khách hàng: <b>Khách lẻ</b>
                </p>
              </>
            )}
          </div>
          <div className="col-6 text-right">
            <p>
              Nhân viên bán hàng: <b>{order.accountName}</b>
            </p>
          </div>
        </div>
        <div
          className="row mt-3 mb-3"
          style={{ borderBottom: "1px solid", paddingBottom: 10 }}
        >
          <div className="col-6 text-left">SL</div>
          <div className="col-2 text-left">Đơn giá</div>
          <div className="col-2 text-left">Giảm giá</div>
          <div className="col-2 text-right">Thành tiền</div>
        </div>
        <div
          className="row"
          style={{ borderBottom: "1px solid", paddingBottom: 10 }}
        >
          {order?.orderDetails?.map(
            (item: OrderDetailRequest, index: number) => {
              return (
                <>
                  <div className="col-6 text-left" key={index}>
                    {item.quantity} x {item.productDetail.productName} -{" "}
                    {item.productDetail.size} - {item.productDetail.color}
                  </div>
                  <div className="col-2 text-left">
                    {formatter.format(item.price)}
                  </div>
                  <div className="col-2 text-left">
                    {formatter.format(item.discount)}
                  </div>
                  <div className="col-2 text-right">
                    {formatter.format(
                      item.quantity * item.price - item.discount
                    )}
                  </div>
                </>
              );
            }
          )}
        </div>
        <div className="row mt-3">
          <div className="col-6 text-left">
            <p>Tổng tiền</p>
            <p>Giảm giá</p>
            <p>Chiết khấu</p>
            <p>VAT</p>
            <p>
              <b>Khách phải trả</b>
            </p>
            <p>Tiền khách đưa</p>
            <p>Tiền trả lại khách</p>
          </div>
          <div className="col-6 text-right">
            <p>{formatter.format(order?.totalPrice)}</p>
            <p>{formatter.format(getTotalDiscount(order.orderDetails))}</p>
            <p>{formatter.format(order?.discount)}</p>
            <p>{formatter.format(0)}</p>
            <p>
              <b>
                {formatter.format(
                  order.totalPrice -
                    getTotalDiscount(order.orderDetails) -
                    order.discount
                )}
              </b>
            </p>
            <p>{formatter.format(order?.money)}</p>
            <p>
              {formatter.format(
                order?.money - order?.customerPay > 0
                  ? order?.money - order?.customerPay
                  : 0
              )}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h5 style={{ fontStyle: "italic" }}>
            Cảm ơn quý khách , hẹn gặp lại
          </h5>
        </div>
      </div>
    </div>
  );
});
export default ComponentToPrint;

export class EmptyComponent extends React.Component {
  render() {
    return null;
  }
}
