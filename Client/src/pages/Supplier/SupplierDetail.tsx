import baseApi from "api/baseApi";
import MyAlert from "components/Alert/MyAlert";
import Limit from "components/Limit/Limit";
import { AddressInterface } from "interfaces/address.interface";
import { FilterInterface } from "interfaces/filter.interface";
import ImportGoods from "interfaces/import-goods.interface";
import { metadata } from "interfaces/metadata.interface";
import { SupplierInterface } from "interfaces/supplier.interface";
import PurchaseOrder from "pages/ImportGoods/components/PurchaseOrder";
import OffCanvas from "pages/Product/components/OffCanvas";
import React, { ReactElement } from "react";
import { DebounceInput } from "react-debounce-input";
import Pagination from "react-js-pagination";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { formatter } from "types";

interface Props {}

export default function SupplierDetail({}: Props): ReactElement {
  const path: any = useParams();
  const history = useHistory();
  const [supplier, setSupplier] = React.useState<SupplierInterface>(
    {} as SupplierInterface
  );
  const [imports, setImports] = React.useState<Array<ImportGoods>>([]);
  const [filter, setFilter] = React.useState<any>({
    page: 1,
    size: 10,
    search: "",
    sort: "",
    order: "",
    status: "",
    code: "",
    endDate: "",
    startDate: "",
  } as FilterInterface);
  const [isShowOffCanvas, setIsShowOffCanvas] = React.useState(false);
  const [metadata, setMetadata] = React.useState<any>({} as metadata);
  const [columns, setColumns] = React.useState([
    { label: "#", key: "id" },
    { label: "Mã nhập hàng", isSort: true, key: "code", sort: "asc" },
    { label: "Số lượng", isSort: true, key: "total_product", sort: "" },
    { label: "Tổng tiền", isSort: true, key: "total_price", sort: "" },
    { label: "Ngày tạo đơn", isSort: true, key: "created_at", sort: "" },
    { label: "Cập nhật cuối", isSort: true, key: "created_at", sort: "" },
    { label: "Trạng thái", isSort: true, key: "status", sort: "" },
  ]);
  const statusOptions = [
    { value: 2, label: "Tất cả" },
    { value: 1, label: "Đã nhập" },
    { value: 0, label: "Chưa nhập" },
  ];
  const [isShowAlert, setIsShowAlert] = React.useState(false);
  const [totalPurchaseOrder, setTotalPurchaseOrder] = React.useState({} as any);
  const [address, setAddress] = React.useState({
    province: {
      value: 1,
      label: "",
    },
    district: {
      value: 1,
      label: "",
    },
    ward: {
      value: 1,
      label: "",
    },
  } as AddressInterface);
  const getSupplier = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/suppliers/${path.id}`
      );
      const data = await response.json();
      const total = await baseApi.getById(
        "import-goods/total-purchase",
        path.id
      );
      setTotalPurchaseOrder(total.data);

      setSupplier(data);
      let address = JSON.parse(data.address);
      setAddress(address);
      console.log(address);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getImports = async () => {
    try {
      const response = baseApi.get(`import-goods/suppliers/${path.id}`, filter);
      const data = await response;
      console.log(data);
      setImports(data.data.data);
      setMetadata(data.data.metadata);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getSupplier();
    getImports();
    return () => {
      console.log("unmount");
      localStorage.removeItem("supplierId");
    };
  }, [path, filter]);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Thông tin nhà cung cấp</h1>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                className="btn btn-default"
                onClick={() => {
                  window.history.back();
                }}
              >
                Quay lại
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={() => {
                  history.push(`/suppliers/${supplier.id}/update`);
                }}
                style={{ cursor: "pointer" }}
              >
                Sửa
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid">
        <div className="col" style={{ height: "100%" }}>
          <div className="row">
            <div className="col-md-8 card">
              <div className="" style={{ paddingBottom: 15 }}>
                <div className="row">
                  <div className="col-md-12 card-header">
                    <div className="header">
                      <i className="fas fa-warehouse"></i> Nhà cung cấp:
                      <span className="text-success"> {supplier.name}</span>
                    </div>
                  </div>
                  <div className="card-body row">
                    <div className="col-md-7">
                      <div className="row">
                        <label
                          className="mb-2 text-left "
                          style={{ paddingLeft: 6 }}
                        >
                          Thông tin chính
                        </label>
                        <div className="col-sm-3 ">
                          <span>Mã</span>
                        </div>
                        <div className="col-sm-9">
                          <span>: {supplier.code}</span>
                        </div>
                        <div className="col-sm-3">
                          <span>Số điện thoại </span>
                        </div>
                        <div className="col-sm-9">
                          <span>: {supplier.phone || "--"}</span>
                        </div>
                        <div className="col-sm-3">
                          <span>Email: </span>
                        </div>
                        <div className="col-sm-9">
                          <span>: {supplier.email || "--"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        <label className="mb-2" style={{ paddingLeft: 6 }}>
                          Người liên hệ
                        </label>
                        <div className="col-sm-4">
                          <span>Họ tên</span>
                        </div>
                        <div className="col-sm-8">
                          <span>: {supplier.personInCharge || "--"}</span>
                        </div>
                        <div className="col-sm-4">
                          <span>Số điện thoại</span>
                        </div>
                        <div className="col-sm-8">
                          <span>: {supplier.personInChargePhone || "--"}</span>
                        </div>
                        <div className="col-sm-4">
                          <span>Email:</span>
                        </div>
                        <div className="col-sm-8">
                          <span>: {supplier.personInChargeEmail || "--"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        {" "}
                        <div className="col-sm-1">
                          <span>Địa chỉ</span>
                        </div>
                        <div className="col-sm-11">
                          <span style={{ paddingLeft: "50px" }}>
                            :{" "}
                            {address.ward !== undefined && (
                              <> {address.ward["label"]}</>
                            )}{" "}
                            -{" "}
                            {address.ward !== undefined && (
                              <> {address.district["label"]}</>
                            )}{" "}
                            -{" "}
                            {address.ward !== undefined && (
                              <> {address.province["label"]}</>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4" style={{ marginBottom: "15px" }}>
              <div
                className="card"
                style={{ height: "100%", paddingBottom: 15 }}
              >
                <div className="card-header">
                  <span className="header">
                    <i className="fas fa-info-circle"></i> Thông tin đơn hàng
                  </span>
                </div>

                <div className="card-body">
                  <div className="col-12 text-left">
                    <div className="filed-info d-flex">
                      <span className="properties ">Tổng chi tiêu: </span>
                      <span
                        className="text-success ml-1"
                        style={{ fontWeight: "bold" }}
                      >
                        {formatter.format(totalPurchaseOrder[1] || 0)}
                      </span>
                    </div>
                    <div className="filed-info d-flex mt-3">
                      <span className="properties ">Tổng đơn hàng: </span>
                      <span className="ml-1" style={{ fontWeight: "bold" }}>
                        {totalPurchaseOrder[0] || 0} đơn hàng
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-header col-12">
            <div className="row">
              <div
                className="header ml-2 col-auto"
                style={{
                  fontSize: "1.4rem",
                  paddingLeft: "",
                }}
              >
                <i className="nav-icon fa fa-cubes"></i> Đơn hàng đã mua:{" "}
              </div>
            </div>
            <div className="card">
              <div className="card-header row" style={{ paddingLeft: 5 }}>
                <div className="col-md-6">
                  <DebounceInput
                    className="form-control"
                    style={{ width: "100%" }}
                    searchBox={searchBoxRef}
                    type="search"
                    placeholder="Tìm kiếm theo mã đơn hàng "
                    debounceTimeout={300}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        code: e.target.value.trim(),
                      });
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    options={statusOptions}
                    placeholder="Chọn trạng thái"
                    onChange={(e: any) => {
                      console.log(e);
                      setFilter({
                        ...filter,
                        status: e?.value || 2,
                      });
                    }}
                    name="status"
                    isClearable={true}
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
                <div className="col-lg-4">
                  <MyAlert
                    isShow={isShowAlert}
                    content={
                      filter.startDate || filter.endDate
                        ? `Ngày: từ ${filter.startDate} đến ${
                            !filter.endDate ? "hôm nay" : filter.endDate
                          }`
                        : filter.from
                        ? `Ngày: từ ${filter.startDate}`
                        : `Ngày: đến ${
                            !filter.endDate ? "hôm nay" : filter.endDate
                          }`
                    }
                    onClose={() => {
                      setIsShowAlert(false);
                      setFilter({
                        ...filter,
                        endDate: "",
                        startDate: "",
                      });
                    }}
                  />
                </div>
              </div>
              <div className="card-body" style={{ paddingLeft: 5 }}>
                <div className="text-center">
                  {!imports && (
                    <div className="spinner-border mb-2">
                      <span className="visually-hidden sr-only">Loading..</span>
                    </div>
                  )}
                  {imports && (
                    <div className="row">
                      <div>
                        <table
                          className="table  table-hover"
                          style={{ backgroundColor: "#fff" }}
                        >
                          <thead className="table-light">
                            <tr
                              style={{ cursor: "pointer", textAlign: "left" }}
                            >
                              {columns.map((column, index) => (
                                <th
                                  key={index}
                                  onClick={() => {
                                    // onHandleChangeSort(column);
                                  }}
                                  style={{ display: "" }}
                                >
                                  <div
                                    className=""
                                    style={{ display: "inline-block" }}
                                  >
                                    {column.label}{" "}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {imports && (
                              <>
                                {imports.map((item: any, i: number) => (
                                  <PurchaseOrder
                                    purchaseOrder={item}
                                    key={i}
                                    index={i}
                                  />
                                ))}
                              </>
                            )}
                            {imports.length == 0 && (
                              <tr className="font-weight-normal">
                                <th
                                  colSpan={8}
                                  className="text-center font-weight-normal"
                                >
                                  Không tìm thấy dữ liệu
                                </th>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              {imports.length > 0 && (
                <>
                  <div className="row" style={{ padding: 8 }}>
                    <div className="col-sm-12 col-md-7">
                      <Limit
                        onChange={(e) => setFilter({ ...filter, size: e })}
                      />
                    </div>
                    <div className="col-sm-12 col-md-5">
                      <div style={{ float: "right" }}>
                        <Pagination
                          nextPageText=">"
                          prevPageText="<"
                          firstPageText="Trang đầu"
                          lastPageText="Trang cuối"
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={Number(filter.page)}
                          itemsCountPerPage={metadata.size}
                          totalItemsCount={metadata.total || 0}
                          pageRangeDisplayed={5}
                          onChange={(page) => {
                            setFilter({ ...filter, page });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <OffCanvas
        values={{ from: filter.startDate, to: filter.endDate }}
        isShow={isShowOffCanvas}
        onClose={() => setIsShowOffCanvas(false)}
        onSubmit={(values) => {
          console.log(values);
          setIsShowOffCanvas(false);
          setFilter({
            ...filter,
            startDate: values.from,
            endDate: values.to,
          });
          setIsShowAlert(true);
        }}
      />
    </div>
  );
}
