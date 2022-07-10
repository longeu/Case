import baseApi from "api/baseApi";
import MyBadge from "components/Bedge/MyBadge";
import moment from "moment";
import React, { ReactInstance, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { setShow } from "reducers/toastSlice";
import { formatter } from "types";
import { convertOrderDetailStatus } from "utils/convertStatus";
import DataTableSaleBillDetail from "./components/DataTableSaleBillDetail";
import ComponentToPrint from "./ComponentToPrint/ComponentToPrint";
import { OrderDetailRequest, OrderRequest } from "./interface/typesSaleBill";
import "./SaleBillDetail.css";

function SaleBillDetai() {
  const dispatch = useDispatch();
  const { id } = useParams() as any;
  const history = useHistory();
  const [orders, setOrders] = useState({} as OrderRequest);
  const [hidenButton, setHidenButon] = useState(true);
  const [orderNote, setOrderNote] = useState("");
  useEffect(() => {
    async function getOrder() {
      const response = await baseApi.getById("orders/custom", id);
      setOrderNote(response.data.note.trim());
      setOrders(response.data);
    }

    getOrder();
  }, [id]);
  const getTotalDiscount = (orderDetails: OrderDetailRequest[]): number => {
    const price = orderDetails?.reduce(
      (price: number, orderDetail: OrderDetailRequest) => {
        return price + orderDetail.discount;
      },
      0
    );
    return price;
  };
  const updateOrderNote = async () => {
    try {
      const response = await baseApi.putNote("orders", id, orderNote || " ");
      console.log(response);
      const action = setShow({
        show: true,
        content: "Cập nhật ghi chú thành công ",
        type: "success",
      });
      dispatch(action);
    } catch (error) {
      const action = setShow({
        show: true,
        content: "Có lỗi xảy ra !",
        type: "error",
      });
      dispatch(action);
      console.log(error);
    }
  };
  const componentRef = useRef<ReactInstance>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Chi tiết hoá đơn</h1>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                className="btn btn-default"
                onClick={() => history.goBack()}
              >
                Quay lại
              </button>
            </div>
            <div>
              <button className="btn btn-primary ml-3" onClick={handlePrint}>
                In hoá đơn
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <ComponentToPrint
            order={orders}
            ref={componentRef}
            key={Math.floor(Math.random() * 1000)}
          />
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="filed-info mt-1 d-flex">
                          <span>Trạng thái: </span>
                          <span
                            className="properties d-flex"
                            style={{ fontSize: "20px" }}
                          >
                            <MyBadge
                              content={convertOrderDetailStatus(orders.status)}
                              color={
                                orders.status === 1 ? "success" : "secondary"
                              }
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="filed-info mt-1 d-flex">
                          <span>Ngày tạo: </span>
                          <span className="properties">
                            {moment(orders.createdAt).format(
                              "DD/MM/yyyy HH:mm"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="filed-info mt-1 d-flex">
                          <span>Ngày cập nhật: </span>
                          <span className="properties">
                            {moment(orders.updatedAt).format(
                              "DD/MM/yyyy HH:mm"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-header headerCustom">
                    <i className="fas fa-portrait fa"></i>
                    <span> Thông tin khách hàng</span>
                  </div>
                  <div className="card-body">
                    {orders.orderDetails ? (
                      <div className="row">
                        <div className="col-lg-5">
                          <div className="filed-info mt-2 d-flex">
                            <span className="properties">Khách hàng:</span>
                            <span className="properties ">
                              <Link
                                to={`/customer/${orders.customer.id}/detail`}
                              >
                                {orders.customer.name}
                              </Link>
                            </span>
                          </div>
                          <div className="filed-info mt-3 d-flex">
                            <span className="properties">Điện thoại:</span>
                            <span className="properties font-weight-bold">
                              {orders.customer.phone}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-7 text-left">
                          <div className="filed-info mt-2 d-flex">
                            <span>Email: </span>
                            <span className="properties font-weight-bold">
                              {orders.customer.email}
                            </span>
                          </div>

                          <div className="filed-info mt-3 d-flex">
                            <span>Địa chỉ: </span>
                            <span className="properties font-weight-bold">
                              {orders.customer.addressDetail}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      "Chưa có thông tin chi tiết phiên bản"
                    )}
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card">
                  <div className="card-header ">
                    <span style={{ fontSize: "1.4rem" }}>
                      <i className="fa fa-cube"></i> Thông tin sản phẩm
                    </span>
                  </div>
                  <div className="card-body text-left">
                    {orders.orderDetails ? (
                      <DataTableSaleBillDetail data={orders.orderDetails} />
                    ) : (
                      <div>Chưa có sản phẩm</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="col">
                <div className="card">
                  <div className="card-header headerCustom">
                    <i className="fas fa-money-bill-alt fa "></i>
                    <span> Thanh toán</span>
                  </div>
                  <div className="card-body">
                    <div className="row mt-3">
                      <div className="col-6 text-left">
                        <span>
                          {" "}
                          Tổng tiền: (
                          <span style={{ fontWeight: "bold" }}>
                            {orders.totalQuantity}
                          </span>{" "}
                          sản phẩm)
                        </span>
                      </div>
                      <div className="col-6 text-right">
                        <span className="text-success">
                          {formatter.format(orders.totalPrice)}
                        </span>
                      </div>
                    </div>
                    <div className="row  mt-3">
                      <div className="col-6 text-left">
                        <span>Giảm giá: </span>
                      </div>
                      <div className="col-6 text-right">
                        <span style={{ fontWeight: "bold" }}>
                          {formatter.format(
                            getTotalDiscount(orders.orderDetails)
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row  mt-3">
                      <div className="col-6 text-left">
                        <span>Chiết khấu: </span>
                      </div>
                      <div className="col-6 text-right">
                        <span style={{ color: "red" }}>
                          {formatter.format(orders.discount)}
                        </span>
                      </div>
                    </div>
                    <div className="row  mt-3">
                      <div className="col-6 text-left">
                        <span>Khách phải trả: </span>
                      </div>
                      <div className="col-6 text-right">
                        <span style={{ fontWeight: "bold" }}>
                          {formatter.format(
                            orders.totalPrice -
                              getTotalDiscount(orders.orderDetails) -
                              orders.discount
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row  mt-3">
                      <div className="col-6 text-left">
                        <span>Tiền Khách đưa: </span>
                      </div>
                      <div className="col-6 text-right">
                        <span>{formatter.format(orders.money)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-header headerCustom">
                    <i className="fas fa-user-tag fa"></i>
                    <span> Nhân viên hỗ trợ</span>
                  </div>
                  <div className="card-body">
                    {orders.orderDetails ? (
                      <div className="row">
                        <div className="col-lg">
                          <div className="filed-info d-flex">
                            <span>Nhân viên bán hàng: </span>
                            <span className="properties employee">
                              {orders.accountName}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-10">
                            <div className="filed-info mt-3 d-flex">
                              <textarea
                                onFocus={() => setHidenButon(false)}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setHidenButon(true);
                                  }, 1000);
                                }}
                                style={{ borderRadius: 5 }}
                                onChange={(e) => setOrderNote(e.target.value)}
                                cols={30}
                                rows={3}
                                placeholder="Ghi chú đơn hàng"
                                value={orderNote}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-2 text-right d-flex align-items-center">
                            {!hidenButton && (
                              <button
                                className="btn btn-primary"
                                onClick={updateOrderNote}
                              >
                                Sửa
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      "Chưa có thông tin chi tiết phiên bản"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SaleBillDetai;
