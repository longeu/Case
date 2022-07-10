import React, { useState, useEffect } from "react";

import DataTable from "./components/DataTableProducts";
import Pagination from "react-js-pagination";
import Limit from "../../components/Limit/Limit";
import { ComponentProps } from "../../types";
import SearchBox from "../../components/SearchBox/SearchBox";
import CreateButton from "../../components/CreateButton/CreateButton";
import baseApi from "api/baseApi";
import { useHistory } from "react-router";
import Loading from "./components/Loading";
import CategoryFilter from "./components/CategoryFilter";
import StatusSelect from "./components/StatusSelect";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  Filter,
  Metadata,
  productDetailStatusOptions,
  ProductResponse,
} from "./types";
import OffCanvas from "./components/OffCanvas";
import MyAlert from "components/Alert/MyAlert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { handleChangeProduct } from "reducers/productSlice";
import { setShow } from "reducers/toastSlice";
function ProductList(props: ComponentProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const dispatch = useDispatch();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  const [isShowOffCanvas, setIsShowOffCanvas] = useState(false);

  const [isShowAlert, setIsShowAlert] = useState(false);

  const [metadata, setMetadata] = useState({} as Metadata);

  const { sort, order } = useSelector(
    (state: RootState) => state.sortProductReducer
  );

  const [filter, setFilter] = useState<Filter>({
    page: 0,
    size: 5,
    status: 1,
    search: "",
    order: order,
    sort: sort,
    from: "",
    to: "",
    categoryId: 0,
    image: "",
  });

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        const response = await baseApi.get("products", {
          page: filter.page,
          size: filter.size,
          status: filter.status,
          search: filter.search?.trim(),
          order: order,
          sort: sort,
          from: "" ? "2000-01-01" : filter.from,
          to: "" ? "2000-01-01" : filter.to,
          categoryId: filter.categoryId,
        });
        console.log(response.data);
        setProducts(response.data.data);
        setIsLoading(false);

        setMetadata(response.data.metadata);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [filter, isDelete, sort, order]);

  const handleOnDelete = async (products: ProductResponse[]) => {
    try {
      const ids = products.map((pd) => {
        return pd.id;
      });

      confirmAlert({
        title: "Xác nhận",
        message: "Bạn chắc chắn muốn xóa sản phẩm ?",
        buttons: [
          {
            label: "Đồng ý",
            className: "btn-confirm-success",
            onClick: async () => {
              await baseApi
                .multiDelete(`products?status=${1}`, ids)
                .then((res) => {
                  setIsDelete(!isDelete);
                  const action = setShow({
                    show: true,
                    content: "Xóa sản phẩm thành công",
                    type: "success",
                  });
                  dispatch(action);
                });
            },
          },
          {
            label: "Thoát",
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnTranferStatus = async (products: ProductResponse[]) => {
    try {
      const ids = products.map((pd) => {
        return pd.id;
      });

      confirmAlert({
        title: "Xác nhận",
        message: "Bạn chắc chắn muốn chuyển trạng thái ?",
        buttons: [
          {
            label: "Đồng ý",
            className: "btn-confirm-success",
            onClick: async () => {
              await baseApi
                .multiDelete(`products?status=${2}`, ids)
                .then((res) => {
                  setIsDelete(!isDelete);
                  const action = setShow({
                    show: true,
                    content: "Chuyển đổi thành công",
                    type: "success",
                  });
                  dispatch(action);
                });
            },
          },
          {
            label: "Thoát",
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  window.onkeydown = (e: any) => {
    if (searchBoxRef.current && e.key === "F3") {
      searchBoxRef.current.focus();
    }
  };
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <section className="content-header" style={{ padding: "15px 19px" }}>
        <div className="container-fluid">
          <div className="d-flex algin-items-center justify-content-center">
            <div>
              <h4>
                <i className="nav-icon fa fa-cube"></i> Danh Sách Sản Phẩm
              </h4>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <CreateButton
                onClick={() => {
                  const newProduct = {
                    id: 0,
                    name: "",
                    description: "",
                    categoryName: "",
                    categoryId: 0,
                    image: "",
                    status: 0,
                    productDetails: [],
                  };
                  const action = handleChangeProduct({ ...newProduct });
                  dispatch(action);
                  history.push("/product/create");
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
                      placeholder="Tìm kiếm theo tên"
                      onChange={(value) => {
                        setFilter({ ...filter, search: value });
                        console.log(value);
                      }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <CategoryFilter
                      value={filter.categoryId}
                      onChange={(value) => {
                        console.log(value);

                        setFilter({ ...filter, categoryId: value, page: 0 });
                      }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <StatusSelect
                      value={filter.status}
                      options={productDetailStatusOptions}
                      onChange={(value) => {
                        console.log(value);

                        setFilter({ ...filter, status: value, page: 0 });
                      }}
                    />
                  </div>
                  <div className="col-lg-2 mb-2">
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
                  <div className="col-lg-4">
                    <MyAlert
                      isShow={isShowAlert}
                      content={
                        filter.from && filter.to
                          ? `Ngày: từ ${filter.from} đến ${filter.to}`
                          : filter.from
                          ? `Ngày: từ ${filter.from}`
                          : `Ngày: đến ${filter.to}`
                      }
                      onClose={() => {
                        setIsShowAlert(false);
                        setFilter({
                          ...filter,
                          from: "",
                          to: "",
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="card-body" style={{ paddingTop: 0 }}>
                  <div className="row">
                    {isLoading ? (
                      <div className="col-sm-12 text-center">
                        <Loading />
                      </div>
                    ) : (
                      <div className="col-sm-12 text-left">
                        <DataTable
                          data={products}
                          onDelete={handleOnDelete}
                          onChange={(values) => setProducts(values)}
                          onTranferStatus={handleOnTranferStatus}
                        />
                      </div>
                    )}
                  </div>
                  {metadata.total > 0 && (
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <Limit
                          onChange={(value) =>
                            setFilter({
                              ...filter,
                              size: parseInt(value),
                              page: 0,
                            })
                          }
                        />
                      </div>
                      <div className="col-sm-12 col-md-6 text-right">
                        {metadata.total > 1 && (
                          <Pagination
                            itemClass="page-item"
                            nextPageText=">"
                            prevPageText="<"
                            firstPageText="Trang đầu"
                            lastPageText="Trang cuối"
                            linkClass="page-link"
                            activePage={Number(filter.page + 1)}
                            innerClass="pagination justify-content-end mb-0"
                            itemsCountPerPage={Number(filter.size)}
                            totalItemsCount={metadata.total}
                            pageRangeDisplayed={5}
                            onChange={(page: number) => {
                              setFilter({ ...filter, page: page - 1 });
                            }}
                          />
                        )}
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
        values={{ from: filter.from, to: filter.to }}
        isShow={isShowOffCanvas}
        onClose={() => setIsShowOffCanvas(false)}
        onSubmit={(values) => {
          setIsShowOffCanvas(false);
          setFilter({ ...filter, from: values.from, to: values.to });
          setIsShowAlert(true);
        }}
      />
    </div>
  );
}

export default ProductList;
