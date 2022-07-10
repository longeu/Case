import baseApi from "api/baseApi";
import Limit from "components/Limit/Limit";
import ModalCreateStaff from "components/Modal/ModalCreateStaff";
import OffCanvas from "components/OffCanvans/OffCanvas";
import Pagination from "react-js-pagination";
import SearchBox from "components/SearchBox/SearchBox";
import moment from "moment";
import { FilterOrder } from "pages/Bill/SaleBill/SaleBillList";
import Loading from "pages/Product/components/Loading";
import StatusSelect from "pages/Product/components/StatusSelect";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { initialStaff } from "./Initial";

import "./Staff.css";
import DataTableSaleBill from "pages/Bill/SaleBill/components/DataTableSaleBill";
import { orderDetailStatusOptions } from "pages/Bill/SaleBill/interface/typesSaleBill";
import { convertStatusStaff } from "utils/convertStatus";
import MyBadge from "components/Bedge/MyBadge";
function StaffDetail() {
  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const { id } = useParams<{ id?: string }>();
  const [staff, setStaff] = useState(initialStaff);
  const [orders, setOrders] = useState([]);
  const [isShowOffCanvas, setIsShowOffCanvas] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // const [createdDate, setCreatedDate] = useState<string>();
  const [metadata, setMetadata] = useState({
    pgae: 1,
    size: 5,
    total: 1,
  });

  const [filter, setFilter] = useState<FilterOrder>({
    page: 1,
    size: 5,
    status: 2,
    accountId: Number(id),
    customerId: 0,
    search: "",
    sort: "",
    fromDate: "2000-01-01",
    toDate: moment(new Date()).format("yyyy-MM-DD"),
  });
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
  useEffect(() => {
    const getStaff = async () => {
      try {
        if (id) {
          let res = await baseApi.getById("accounts", Number.parseInt(id));

          setStaff({
            ...res.data,
            birth: new Date(res.data.birth),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, [modalShow, id]);
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
              <h1>Chi tiết nhân viên</h1>
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
        <ModalCreateStaff
          show={modalShow}
          onHide={() => onHide()}
          staff={staff}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <div className="card" style={{ height: 284 }}>
                <div className="card-header" style={{ paddingLeft: 13 }}>
                  <span className="header">
                    <i className="fas fa-info-circle"></i> Thông tin chung
                  </span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 text-left">
                      <div className="filed-info d-flex ">
                        <span className="properties">Tên nhân viên: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {staff.fullName}
                        </span>
                      </div>
                      <div className="filed-info mt-3 d-flex">
                        <span className="properties">Số điện thoại: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {staff.phone}
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-6 text-left">
                      <div className="filed-info d-flex">
                        <span className="properties">Ngày sinh: </span>
                        <span style={{ fontWeight: "bold" }}>
                          {moment(staff.birth).format("L")}
                        </span>
                      </div>
                      <div className="filed-info mt-3 d-flex">
                        <span className="properties">Trạng thái: </span>
                        <span style={{ fontWeight: "bold" }}>
                          <MyBadge
                            content={convertStatusStaff(staff.status)}
                            color={staff.status === 1 ? "primary" : "danger"}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 text-left">
                      <div className="filed-info d-flex">
                        <span className="properties">Địa chỉ:</span>
                        <span style={{ fontWeight: "bold" }}>
                          {staff.addressDetail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div
                  className="border"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: 284,
                    borderRadius: 4,
                  }}
                >
                  <img
                    src={
                      staff.image ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                    }
                    alt="product"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <span className="header">
                    <i className="nav-icon fa fa-cubes"></i> Đơn hàng đã bán
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
                        {metadata.total > 0 && (
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
                              <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                nextPageText=">"
                                prevPageText="<"
                                firstPageText="Trang đầu"
                                lastPageText="Trang cuối"
                                innerClass="pagination justify-content-end mb-0"
                                activePage={Number(filter.page)}
                                itemsCountPerPage={Number(filter.size)}
                                totalItemsCount={metadata.total}
                                pageRangeDisplayed={5}
                                onChange={(page: number) => {
                                  setFilter({ ...filter, page });
                                }}
                              />
                            </div>
                          </div>
                        )}
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

export default StaffDetail;
