import React, { useState, useEffect } from "react";
import baseApi from "api/baseApi";
import Pagination from "react-js-pagination";
import { useParams } from "react-router";
import moment from "moment";
import "./Customer.css";
import { formatter } from "../../types";
import "moment/locale/vi";
import { Link, useHistory } from "react-router-dom";
import { customerType } from "interfaces/customerType.interface";
import OffCanvas from "components/OffCanvans/OffCanvas";
import StatusSelect from "pages/Product/components/StatusSelect";
import SearchBox from "components/SearchBox/SearchBox";
import ModalCreateCustomer from "components/Modal/ModalCreateCustomer";
import { FilterOrder } from "pages/Bill/SaleBill/SaleBillList";
import "../Staff/Staff.css";
import Loading from "pages/Product/components/Loading";
import DataTableSaleBill from "pages/Bill/SaleBill/components/DataTableSaleBill";
import Limit from "components/Limit/Limit";
import { orderDetailStatusOptions } from "pages/Bill/SaleBill/interface/typesSaleBill";

function CustomerDetail() {
  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const path: any = useParams();
  const [customers, setCustomer] = useState<customerType>();
  const [orders, setOrders] = useState([]);
  const [isShowOffCanvas, setIsShowOffCanvas] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState({
    pgae: 1,
    size: 5,
    total: 1,
  });
  const [filter, setFilter] = useState<FilterOrder>({
    page: 1,
    size: 5,
    status: 2,
    accountId: 0,
    customerId: Number(path.id),
    search: "",
    sort: "",
    fromDate: "2000-01-01",
    toDate: moment(new Date()).format("yyyy-MM-DD"),
  });
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const url = `customers/detail`;
        const response = await baseApi.getById(url, path.id);
        const { data } = response;
        setCustomer(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, [modalShow]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        setIsLoading(true);
        const url = "orders";
        const response = await baseApi.get(url, filter);
        console.log(response);
        const { data, metadata } = response.data;
        setMetadata(metadata);
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [filter]);
  const onHide = () => {
    setModalShow(false);
  };
  window.onkeydown = (e: any) => {
    console.log(e.key);
    if (searchBoxRef.current && e.key === "F3") {
      searchBoxRef.current.focus();
    }
  };
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Chi tiết Khách hàng</h1>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                className="btn btn-default mr-3"
                onClick={() => history.goBack()}
              >
                Quay lại
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setModalShow(true)}
              >
                Sửa
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <ModalCreateCustomer
          show={modalShow}
          onHide={() => onHide()}
          customer={customers}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div className="card" style={{ height: 200 }}>
                <div className="card-header" style={{ paddingLeft: 13 }}>
                  <span className="header">
                    <i className="fas fa-info-circle"></i> Thông tin chung
                  </span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 text-left">
                      <div className="filed-info d-flex ">
                        <span className="properties">Tên khách hàng: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {customers?.gender ? "Anh " : "Chị "}
                          {customers?.name}
                        </span>
                      </div>
                      <div className="filed-info mt-3 d-flex">
                        <span className="properties">Email: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {customers?.email}
                        </span>
                      </div>
                      {/* <div className="filed-info mt-3 d-flex">
                        <span className="far fa-dot-circle icon"></span>
                        <span className="properties">Trạng thái: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {staff.status == 1 ? "Đang làm" : "Đã nghỉ"}
                        </span>
                      </div> */}
                    </div>
                    <div className="col-lg-6 text-left">
                      <div className="filed-info d-flex">
                        <span className="properties">Ngày sinh: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {moment(customers?.birth).format("L")}
                        </span>
                      </div>
                      <div className="filed-info  mt-3 d-flex">
                        <span className="properties">Số điện thoại: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {customers?.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="filed-info d-flex">
                        <span className="properties">Địa chỉ:</span>
                        <span style={{ fontWeight: "bold" }}>
                          {customers?.addressDetail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card" style={{ height: 200 }}>
                <div className="card-header">
                  <span className="header">
                    <i className="fas fa-shopping-cart "></i> Thông tin mua hàng
                  </span>
                </div>

                <div className="card-body">
                  <div className="col-12 text-left">
                    <div className="filed-info d-flex">
                      <span className="properties ">Tổng chi tiêu: </span>
                      <span
                        className="text-success"
                        style={{ fontWeight: "bold" }}
                      >
                        {formatter.format(Number(customers?.totalPrice))}
                      </span>
                    </div>
                    <div className="filed-info d-flex mt-3">
                      <span className="properties">Tổng đơn hàng: </span>
                      <span style={{ fontWeight: "bold" }}>
                        {customers?.totalOrders}
                      </span>
                    </div>
                    <div className="filed-info d-flex mt-3">
                      <span className="properties">Tổng sản phẩm đã mua:</span>
                      <span style={{ fontWeight: "bold" }}>
                        {customers?.totalQuantity
                          ? customers?.totalQuantity
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <span className="header">
                    {" "}
                    <i className="nav-icon fa fa-cubes"></i> Đơn hàng đã mua
                  </span>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header row">
                        <div className="col-lg-6">
                          <SearchBox
                            searchBox={searchBoxRef}
                            placeholder="Tìm kiếm hóa đơn theo khách hàng , nhân viên "
                            onChange={(value) => {
                              setFilter({
                                ...filter,
                                search: value.trim(),
                                page: 1,
                              });
                              console.log(value);
                            }}
                          />
                        </div>

                        <div className="col-lg-3">
                          <StatusSelect
                            options={orderDetailStatusOptions}
                            value={filter.status}
                            onChange={(value) =>
                              setFilter({
                                ...filter,
                                status: value,
                                page: 1,
                              })
                            }
                          />
                        </div>
                        <div className="col-lg-3">
                          <button
                            className="btn btn-default w-100"
                            onClick={() => setIsShowOffCanvas(true)}
                          >
                            <i className="fa fa-filter mr-2"></i>
                            Bộ lọc khác
                          </button>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="row">
                          {isLoading ? (
                            <div className="col-sm-12 text-center">
                              <Loading />
                            </div>
                          ) : (
                            <div className="col-sm-12 text-left">
                              <DataTableSaleBill data={orders} />
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                            {metadata.total ? (
                              <Limit
                                onChange={(value) => {
                                  setFilter({
                                    ...filter,
                                    size: value,
                                    page: 1,
                                  });
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-sm-12 col-md-6 text-right">
                            {metadata.total > 0 && (
                              <Pagination
                                nextPageText=">"
                                prevPageText="<"
                                firstPageText="Trang đầu"
                                lastPageText="Trang cuối"
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination justify-content-end mb-0"
                                activePage={Number(filter.page)}
                                itemsCountPerPage={Number(filter.size)}
                                totalItemsCount={metadata.total}
                                pageRangeDisplayed={5}
                                onChange={(page: number) => {
                                  setFilter({ ...filter, page });
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <OffCanvas
        dates={{
          fromDate: filter.fromDate,
          toDate: filter.toDate,
        }}
        isShow={isShowOffCanvas}
        onClose={() => setIsShowOffCanvas(false)}
        onSubmit={(values: any) => {
          setFilter({
            ...filter,
            fromDate: values.fromDate,
            toDate: values.toDate,
          });
        }}
      />
    </div>
  );
}

export default CustomerDetail;
