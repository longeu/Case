import baseApi from "api/baseApi";
import MyAlert from "components/Alert/MyAlert";
import CreateButton from "components/CreateButton/CreateButton";
import Limit from "components/Limit/Limit";
import SearchBox from "components/SearchBox/SearchBox";
import { FilterInterface } from "interfaces/filter.interface";
import ImportGoods from "interfaces/import-goods.interface";
import { metadata } from "interfaces/metadata.interface";
import OffCanvas from "pages/Product/components/OffCanvas";
import React, { ReactElement } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import Item from "./Item";
interface Props {
  importGoods: Array<ImportGoods>;
}

export default function ImportGoodsList({}: Props): ReactElement {
  const columns = [
    "STT",
    "Mã nhập hàng",
    "Số lượng",
    "Tổng tiền",
    "Nhà cung cấp",
    "Ngày nhập",
    "Trạng thái",
  ];

  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const [metadata, setMetaData] = React.useState({} as metadata);
  const [importGoods, setImportGoods] = React.useState(
    [] as Array<ImportGoods>
  );
  const [filter, setFilter] = React.useState<any>({
    page: query.get("page") || 1,
    size: query.get("size") || 5,
    search: query.get("search") || "",
    sort: query.get("sort") || "",
    order: query.get("order") || "",
    startDate: query.get("startDate") || "",
    endDate: query.get("endDate") || "",
  } as FilterInterface);
  const [isShowOffCanvas, setIsShowOffCanvas] = React.useState(false);
  const [isShowAlert, setIsShowAlert] = React.useState(false);

  const getImportGoods = async () => {
    try {
      const response = await baseApi.get("import-goods", filter);
      setImportGoods(response.data.data);
      setMetaData(response.data.metadata);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    const p = new URLSearchParams();
    if (filter.page) p.append("page", filter.page.toString());
    if (filter.size) p.append("limit", filter.size.toString());
    if (filter.sort) p.append("sort", filter.sort);
    if (filter.order) p.append("order", filter.order);
    if (filter.search) p.append("search", filter.search);
    history.push({
      search: p.toString(),
    });
  };

  React.useEffect(() => {
    getImportGoods();
  }, [filter]);
  const handleDelete = async (id: number) => {
    console.log(id);
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
      <div className="content-header" style={{ padding: "15px 25px" }}>
        <div className="container-fluid">
          <div className="d-flex  mb-2 algin-items-center justify-content-space-between">
            <div>
              <h4>
                <i className="fas fa-receipt"></i> Danh Sách Hóa Đơn Nhập
              </h4>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                onClick={() => history.push("/bill/import/create")}
                className="btn btn-primary"
              >
                <i className="nav-icon fa fa-calculator mr-1"></i> Nhập hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
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
                      placeholder="Tìm kiếm theo mã nhập hàng, tên nhà cung cấp (F3) "
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          search: e,
                        });
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <button
                      className="btn btn-default w-100"
                      onClick={() => {
                        setIsShowOffCanvas(true);
                        console.log(isShowOffCanvas);
                      }}
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
                          ? `Ngày: từ ${filter.startDate} đến ${filter.endDate}`
                          : filter.from
                          ? `Ngày: từ ${filter.startDate}`
                          : `Ngày: đến ${filter.endDate}`
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
                <div className="card-body">
                  <div className="row">
                    <div>
                      <table
                        className="table table-hover"
                        style={{ backgroundColor: "#FFF" }}
                      >
                        <thead>
                          <tr>
                            {columns.map((column, index) => (
                              <th key={index} className="text-start">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {importGoods &&
                            importGoods.map((item, index) => (
                              <Item
                                key={index}
                                importGoods={item}
                                index={index}
                                onDelete={handleDelete}
                              />
                            ))}
                          {importGoods.length === 0 && (
                            <tr>
                              <td
                                colSpan={columns.length}
                                className="text-center"
                              >
                                Không có dữ liệu
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      {importGoods.length > 0 && (
                        <div className="row" style={{ padding: 8 }}>
                          <div className="col-sm-12 col-md-6">
                            <Limit
                              onChange={(e) =>
                                setFilter({ ...filter, size: e })
                              }
                            />
                          </div>
                          <div className="col-sm-12 col-md-6">
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
                                onChange={(page: number) => {
                                  if (filter.page !== page) {
                                    setFilter({ ...filter, page });
                                  }
                                }}
                              />
                            </div>
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
