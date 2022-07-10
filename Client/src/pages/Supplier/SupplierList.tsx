import baseApi from "api/baseApi";
import CreateButton from "components/CreateButton/CreateButton";
import Limit from "components/Limit/Limit";
import SearchBox from "components/SearchBox/SearchBox";
import { FilterInterface } from "interfaces/filter.interface";
import { metadata } from "interfaces/metadata.interface";
import { SupplierInterface } from "interfaces/supplier.interface";
import React, { ReactElement } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Item from "./Item";
interface Props {
  supplierList: Array<SupplierInterface>;
}

export default function SupplierList({}: Props): ReactElement {
  const [columns, setColumns] = React.useState<Array<any>>([
    { label: "STT", isSort: false, order: "desc", sort: "id" },
    { label: "Mã nhà cung cấp", isSort: false, order: "", sort: "code" },
    { label: "Tên nhà cung cấp", isSort: false, order: "", sort: "name" },
    { label: "Trạng thái", isSort: false, order: "", sort: "status" },
    { label: "Email", isSort: false, order: "", sort: "email" },
    { label: "Website", isSort: false, order: "", sort: "website" },
    { label: "Số điện thoại", isSort: false, order: "", sort: "phone" },
    {
      label: "Người liên hệ",
      isSort: false,
      order: "",
      sort: "personInCharge",
    },
  ]);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const [metadata, setMetadata] = React.useState<any>({} as metadata);
  const [supplierList, setSupplierList] = React.useState<
    Array<SupplierInterface>
  >([]);

  const [filter, setFilter] = React.useState<any>({
    page: query.get("page") || 1,
    size: query.get("size") || 10,
    search: query.get("search") || "",
    sort: query.get("sort") || "",
    order: query.get("order") || "",
    status: query.get("status") || "",
  } as FilterInterface);

  const statusOptions = [
    {
      value: "-1",
      label: "Lọc theo trạng thái",
    },
    { value: "1", label: "Ngừng giao dịch" },
    { value: "0", label: "Đang giao dịch" },
  ];
  const getSupplierList = async (): Promise<void> => {
    try {
      const response = await baseApi.get("suppliers", filter);
      console.log(response);
      setMetadata(response.data.metadata);
      setSupplierList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getSupplierList();
    const p = new URLSearchParams();
    if (filter.page) p.append("page", filter.page.toString());
    if (filter.size) p.append("limit", filter.size.toString());
    if (filter.sort) p.append("sort", filter.sort);
    if (filter.order) p.append("order", filter.order);
    if (filter.search) p.append("search", filter.search);

    history.push({
      search: p.toString(),
    });
  }, [filter]);
  const handleDelete = async (id: number): Promise<void> => {
    console.log(id);
    try {
      const response = await baseApi.delete("suppliers", id);
      if (response.status === 200) {
        const newData = supplierList.filter(
          (item: SupplierInterface) => item.id !== id
        );
        setSupplierList(newData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateStatus = async (
    id: number,
    newStatus: number,
    status: number
  ): Promise<void> => {
    console.log(newStatus);
    const answer = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái?");
    if (answer) {
      try {
        const response = await baseApi.putStatus("suppliers", id, {
          status: newStatus,
        });

        const data = response;
        console.log(data);
        if (data.status === 200) {
          const newData = supplierList.map((item: SupplierInterface) => {
            if (item.id === id) {
              item.status = newStatus;
              console.log(newStatus);
              return item;
            }
            return item;
          });
          setSupplierList(newData);
        } else {
          alert("Có lỗi xảy ra");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(answer);
      const newData = supplierList.map((item: SupplierInterface) => {
        if (item.id === id) {
          item.status = status;
          return item;
        }
        return item;
      });
      setSupplierList(newData);
    }
  };
  const onHandleChangeSort = (e: any) => {
    const newSortFilter = columns.map((item: any) => {
      if (e.sort === item.sort) {
        setFilter({
          ...filter,
          sort: item.sort,
          order: item.order === "asc" || item.order === "" ? "desc" : "asc",
        });
        item.order = item.order === "asc" || item.order === "" ? "desc" : "asc";
        item.isSort = true;
        return item;
      } else {
        item.order = "";
        item.isSort = false;
        return item;
      }
    });
    setColumns(newSortFilter);
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
      <section className="content-header" style={{ padding: "15px 25px" }}>
        <div className="container-fluid">
          <div className="d-flex algin-items-center justify-content-space-between">
            <div>
              <h4>
                <i className="fas fa-handshake"></i> Danh sách nhà cung cấp
              </h4>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <CreateButton onClick={() => history.push("/suppliers/create")} />
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div
                  className="row card-header"
                  style={{ padding: "8px 25px " }}
                >
                  <div className="col-10">
                    <SearchBox
                      searchBox={searchBoxRef}
                      placeholder="Tìm kiếm nhà cung cấp theo mã, tên, số điện thoại, địa chỉ"
                      onChange={(e) => {
                        console.log(e);
                        setFilter({
                          ...filter,
                          search: e.trim(),
                        });
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <Select
                      defaultValue={statusOptions[0]}
                      options={statusOptions}
                      onChange={(e) => {
                        console.log(e);
                        setFilter({
                          ...filter,
                          status: e?.value,
                          page: 1,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div>
                      <table
                        className="table table-hover"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <thead className="table-light">
                          <tr style={{ cursor: "pointer" }}>
                            {columns.map((column, index) => (
                              <th
                                key={index}
                                onClick={() => {
                                  onHandleChangeSort(column);
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
                          {supplierList.length > 0 && (
                            <>
                              {supplierList.map((item, index) => (
                                <Item
                                  key={index}
                                  index={index}
                                  supplier={item}
                                  onDelete={handleDelete}
                                  onUpdateStatus={handleUpdateStatus}
                                />
                              ))}
                            </>
                          )}
                          {supplierList.length === 0 && (
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
                  {supplierList.length > 0 && (
                    <>
                      <div className="row" style={{ padding: 8 }}>
                        <div className="col-sm-12 col-md-6">
                          <Limit
                            onChange={(e) =>
                              setFilter({ ...filter, size: e, page: 1 })
                            }
                          />
                        </div>
                        <div className="col-sm-12 col-md-6 text-right">
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
        </div>
      </section>
    </div>
  );
}
