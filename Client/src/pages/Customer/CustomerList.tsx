import baseApi from "api/baseApi";
import OffCanvas from "components/OffCanvans/OffCanvas";
import { customerType } from "interfaces/customerType.interface";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link, useHistory } from "react-router-dom";
import { formatter } from "types";
import CreateButton from "../../components/CreateButton/CreateButton";
import Limit from "../../components/Limit/Limit";
import SearchBox from "../../components/SearchBox/SearchBox";
import { initialfilter } from "./Initial";

CustomerList.propTypes = {
  customers: PropTypes.array,
  onClickInfoUpdate: PropTypes.func,
};
CustomerList.defaultProps = {
  customers: [],
  onClickInfoUpdate: null,
};
function CustomerList() {
  const history = useHistory();
  const [customers, setCustomers] = useState<customerType[]>([]);
  const [isShowOffCanvas, setIsShowOffCanvas] = useState(false);
  const [metadata, setMetadata] = useState({
    pgae: 1,
    size: 5,
    total: 1,
  });
  const [filter, setFilter] = useState(initialfilter);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const url = "customers";
        const response = await baseApi.get(url, filter);
        const { data, metadata } = response.data;
        setMetadata(metadata);
        setCustomers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, [filter]);
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
          <div
            className="d-flex algin-items-center justify-content-space-between"
            style={{ padding: "0px 10px 0px 10px" }}
          >
            <div>
              <h4>
                <i className="nav-icon fa fa-user"></i> Danh Sách Khách Hàng
              </h4>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <CreateButton
                onClick={() => {
                  history.push("/customer/create");
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header row">
                  <div className="col-lg-9">
                    <SearchBox
                      searchBox={searchBoxRef}
                      placeholder="Tìm kiếm khách hàng theo tên, số điện thoại"
                      onChange={(value) => {
                        setFilter({
                          ...filter,
                          page: 1,
                          search: value.trim(),
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-3 ">
                    <button
                      className="btn btn-default w-100"
                      onClick={() => {
                        setIsShowOffCanvas(true);
                      }}
                    >
                      <i className="fa fa-filter mr-2"></i>
                      Bộ lọc khác
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    {customers.length ? (
                      <div className="col-sm-12">
                        <table id="example2" className="table  table-hover">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">STT</th>
                              <th scope="col">Mã khách hàng</th>
                              <th scope="col">Tên khách hàng</th>
                              <th scope="col">Số Điện Thoại</th>
                              <th scope="col">Tổng chi tiêu</th>
                              <th scope="col" style={{ width: 130 }}>
                                SL đơn hàng
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {customers.map(
                              (customer: customerType, index: number) => {
                                return (
                                  <tr
                                    key={customer.id}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      history.push(
                                        `/customer/${customer.id}/detail`
                                      );
                                    }}
                                  >
                                    <td>{index + 1}</td>
                                    <td>{customer.code}</td>
                                    <td>
                                      <Link
                                        to={`/customer/${customer.id}/detail`}
                                      >
                                        {customer.name.toUpperCase()}
                                      </Link>
                                    </td>
                                    <td>{customer.phone}</td>
                                    <td>
                                      {formatter.format(
                                        Number(customer.totalPrice)
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {customer.totalOrders}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="container text-center">
                        <div className="row">
                          <div>Không tìm thấy dữ liệu</div>
                        </div>
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
                    <div className="col-md-6 text-right">
                      {metadata.total > 0 && (
                        <Pagination
                          itemClass="page-item"
                          nextPageText=">"
                          prevPageText="<"
                          firstPageText="Trang đầu"
                          lastPageText="Trang cuối"
                          linkClass="page-link"
                          activePage={Number(filter.page)}
                          innerClass="pagination justify-content-end mb-0"
                          itemsCountPerPage={Number(filter.size)}
                          totalItemsCount={metadata.total}
                          pageRangeDisplayed={5}
                          onChange={(page: number) => {
                            if (filter.page !== page) {
                              setFilter({ ...filter, page });
                            }
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

export default CustomerList;
