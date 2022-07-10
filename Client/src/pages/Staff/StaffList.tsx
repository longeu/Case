import baseApi from "api/baseApi";
import { staffType } from "interfaces/statffType.interface";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router";
import Select from "react-select";
import CreateButton from "../../components/CreateButton/CreateButton";
import Limit from "../../components/Limit/Limit";
import SearchBox from "../../components/SearchBox/SearchBox";
import { ComponentProps } from "../../types";
import { initialfilter, optionRole, optionSelectStatus } from "./Initial";
import moment from "moment";
import Loading from "pages/Product/components/Loading";
import OffCanvas from "components/OffCanvans/OffCanvas";
import Staff from "./Staff";
import StaffTable from "./Components/Table/StaffTable";

function StaffList(props: ComponentProps) {
  const history = useHistory();
  const [staffs, setStaffs] = useState([] as staffType[]);
  const [isShowOffCanvas, setIsShowOffCanvas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        const url = "accounts";
        const response = await baseApi.get(url, filter);
        console.log(response);
        const { data, metadata } = response.data;
        setMetadata(metadata);
        setStaffs(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();
  }, [filter]);

  const handleChangeStatus = async (id: number | undefined, status: number) => {
    const answer = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái?");
    if (answer) {
      try {
        setIsLoading(true);
        const response = await baseApi.put("accounts/status", {
          id: id,
          status: status,
        });
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      setFilter({ ...filter });
    }
  };
  window.onkeydown = (e: any) => {
    if (searchBoxRef.current && e.key === "F3") {
      searchBoxRef.current.focus();
    }
  };
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  console.log(metadata);
  return (
    <div>
      <section className="content-header" style={{ padding: "15px 19px" }}>
        <div className="container-fluid">
          <div className="d-flex  algin-items-center justify-content-space-between">
            <div>
              <h4>
                <i className="nav-icon fa fa-users"></i> Danh Sách Nhân Viên
              </h4>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <CreateButton
                onClick={() => {
                  history.push("/staff/create");
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
                  <div className="col-lg-4">
                    <SearchBox
                      searchBox={searchBoxRef}
                      placeholder="Tìm kiếm nhân viên theo tên, số điện thoại, địa chỉ"
                      onChange={(value) => {
                        setFilter({
                          ...filter,
                          search: value.trim(),
                          page: 1,
                        });
                      }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Select
                      placeholder="Chọn trạng thái"
                      options={optionSelectStatus}
                      onChange={(e: any) => {
                        setFilter({
                          ...filter,
                          status: e?.value,
                          page: 1,
                        });
                      }}
                      isClearable={true}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Select
                      options={optionRole}
                      placeholder="Chọn chức vụ"
                      onChange={(e: any) => {
                        setFilter({
                          ...filter,
                          role: e?.value || 0,
                          page: 1,
                        });
                      }}
                      isClearable={true}
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
                      <div className="col-12 text-center">
                        <Loading />
                      </div>
                    ) : (
                      <div className="col-sm-12 text-left">
                        <StaffTable
                          staffs={staffs}
                          handleChangeStatus={handleChangeStatus}
                        />
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

export default StaffList;
