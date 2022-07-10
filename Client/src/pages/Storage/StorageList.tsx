import baseApi from "api/baseApi";
import { RootState } from "app/store";
import MyAlert from "components/Alert/MyAlert";
import Limit from "components/Limit/Limit";
import OffCanvas from "pages/Product/components/OffCanvas";
import Pagination from "react-js-pagination";
import SearchBox from "components/SearchBox/SearchBox";
import CategoryFilter from "pages/Product/components/CategoryFilter";
import Loading from "pages/Product/components/Loading";
import StatusSelect from "pages/Product/components/StatusSelect";

import {
  Filter,
  Metadata,
  ProductDetailRequest,
  productDetailStatusOptions,
} from "pages/Product/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ComponentProps } from "types";
import DataTableStorageList from "./components/DataTableStorageList";
import { ExportReactCSV } from "./components/ExportReactCSV";

function StorageList(props: ComponentProps) {
  const [productDetails, setProductDetails] = useState<ProductDetailRequest[]>(
    []
  );

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
        const response = await baseApi.get("product_details", {
          page: filter.page,
          size: filter.size,
          status: filter.status,
          search: filter.search,
          order: order,
          sort: sort,
          from: "" ? "2000-01-01" : filter.from,
          to: "" ? "2000-01-01" : filter.to,
          categoryId: filter.categoryId,
        });
        setProductDetails(response.data.data);
        setIsLoading(false);
        console.log(response.data);

        setMetadata(response.data.metadata);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [filter, isDelete, sort, order]);

  const handleOnDelete = async (productDetails: ProductDetailRequest[]) => {
    try {
      const ids = productDetails.map((pd) => {
        return pd.id;
      });

      if (window.confirm("Bạn có muốn xóa sản phẩm")) {
        await baseApi.multiDelete("product_details", ids).then((res) => {
          setIsDelete(!isDelete);
          alert("Xóa thành công");
        });
      } else {
        console.log("Thing was not saved to the database.");
      }
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
          <div className="d-flex algin-items-center justify-content-space-between">
            <div>
              <h4>
                <i className="nav-icon fa fa-cubes"></i> Quản Lý Kho
              </h4>
            </div>
            {/* <ExportReactCSV csvData={productDetails} fileName={"my-file.csv"} /> */}
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header row">
                  <div className="col-lg-5">
                    <SearchBox
                      searchBox={searchBoxRef}
                      placeholder="Tìm kiếm theo tên, màu, kích thước, code, barcode"
                      onChange={(value) => {
                        setFilter({ ...filter, search: value.trim(), page: 0 });
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
                  <div className="col-lg-2">
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
                    <div className="col-sm-12 text-center">
                      {isLoading ? (
                        <div className="col-sm-12 text-center">
                          <Loading />
                        </div>
                      ) : (
                        <div className="col-sm-12 text-left">
                          <DataTableStorageList
                            data={productDetails}
                            onDelete={handleOnDelete}
                            onChange={(values) => setProductDetails(values)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {metadata.total > 1 && (
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
                      <div className="col-sm-12 col-md-6 text-left">
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

export default StorageList;
