import { RootState } from "app/store";
import * as React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import orderDetail from "interfaces/orderDetail.interface";
import { formatter } from "types";

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  const order = useSelector((state: RootState) => state.orderReducer);
  const { user } = useSelector((state: RootState) => state.currentUser);

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
            <h6>Số:{props.code}</h6>
          </div>
          <div className="col-6 text-right">
            <h6>Ngày:{moment(new Date()).format("L")}</h6>
          </div>
        </div>
        <div className="row mt-3" style={{ borderBottom: "2px dotted" }}>
          <div className="col-6 text-left">
            {order[props.activeOrder]?.customer ? (
              <>
                <p>
                  Khách hàng: <b>{order[props.activeOrder]?.customer?.name}</b>
                </p>
                <p>
                  Điện thoại: <b>{order[props.activeOrder]?.customer?.phone}</b>
                </p>
                <p>
                  Địa chỉ:{" "}
                  <b>{order[props.activeOrder]?.customer?.addressDetail}</b>
                </p>
              </>
            ) : (
              <p>
                Khách hàng: <b>Khách lẻ</b>
              </p>
            )}
          </div>
          <div className="col-6 text-right">
            <p>
              Nhân viên bán hàng: <b>{user.fullName}</b>
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
          {order[props.activeOrder]?.orderDetails.map(
            (item: orderDetail, index: number) => {
              return (
                <>
                  <div className="col-6 text-left" key={index}>
                    {item.quantity} x {item.productDetailModel.productName} -{" "}
                    {item.productDetailModel.size} -{" "}
                    {item.productDetailModel.color}
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
            <p>{formatter.format(order[props.activeOrder]?.totalPrice)}</p>
            <p>{formatter.format(order[props.activeOrder]?.totalDiscount)}</p>
            <p>{formatter.format(order[props.activeOrder]?.discount)}</p>
            <p>{formatter.format(0)}</p>
            <p>
              <b>{formatter.format(order[props.activeOrder]?.customerPay)}</b>
            </p>
            <p>{formatter.format(order[props.activeOrder]?.money)}</p>
            <p>
              {formatter.format(
                order[props.activeOrder]?.money -
                  order[props.activeOrder]?.customerPay >
                  0
                  ? order[props.activeOrder]?.money -
                      order[props.activeOrder]?.customerPay
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
