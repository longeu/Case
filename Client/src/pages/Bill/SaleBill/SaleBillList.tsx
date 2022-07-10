import baseApi from "api/baseApi";
import CreateButton from "components/CreateButton/CreateButton";
import Limit from "components/Limit/Limit";
import OffCanvas from "components/OffCanvans/OffCanvas";
import SearchBox from "components/SearchBox/SearchBox";
import moment from "moment";
import Loading from "pages/Product/components/Loading";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { ComponentProps } from "types";
import AccountSelect from "./components/AccountSelect";
import DataTableSaleBill from "./components/DataTableSaleBill";
import StatusSelect from "./components/StatusSelect";
import { orderDetailStatusOptions } from "./interface/typesSaleBill";
import { useHistory } from "react-router";
export interface FilterOrder {
  page: number | string;
  size: number | string;
  search: string;
  accountId?: number;
  customerId?: number;
  sort: string;
  status: number;
  fromDate: string;
  toDate: string;
}
const initialfilter: FilterOrder = {
  page: 1,
  size: 5,
  status: 2,
  accountId: 0,
  customerId: 0,
  search: "",
  sort: "",
  fromDate: "2000-01-01",
  toDate: moment(new Date()).format("yyyy-MM-DD"),
};

function SaleBillList(props: ComponentProps) {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [isShowOffCanvas, setIsShowOffCanvas] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // const [createdDate, setCreatedDate] = useState<string>();
  const [metadata, setMetadata] = useState({
    pgae: 1,
    size: 5,
    total: 1,
  });
  const [filter, setFilter] = useState(initialfilter);
  useEffect(() => {
    const getAccounts = async () => {
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
    getAccounts();
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
      <section className="content-header" style={{ padding: "15px 19px" }}>
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h4>
                <i className="nav-icon fa fa-file-text-o"></i> Danh Sách Hoá Đơn
                Bán
              </h4>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                onClick={() => history.push("/sale/create")}
                className="btn btn-primary"
              >
                <i className="nav-icon fa fa-calculator mr-1"></i> Bán hàng
              </button>
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
                  <div className="col-lg-4">
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
                    <AccountSelect
                      value={filter.accountId}
                      onChange={(value) =>
                        setFilter({
                          ...filter,
                          accountId: value,
                          page: 1,
                        })
                      }
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
                  <div className="col-lg-2">
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
                        <Limit
                          onChange={(value) => {
                            setFilter({
                              ...filter,
                              size: value,
                              page: 1,
                            });
                          }}
                        />
                      </div>
                      <div className="col-sm-12 col-md-6 text-right">
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
                      </div>
                    </div>
                  )}
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

export default SaleBillList;
