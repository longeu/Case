import baseApi from "api/baseApi";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ProductDetailRequest, SelectOption } from "./types";
import { convertProductDetailStatus } from "../../utils/convertStatus";
import UpdateAndCreateProductDetail from "./components/UpdateAndCreateProductDetail";
import { formatter } from "types";
import DetailProduct from "./components/DetailProduct";
import placeholder from "assets/dist/img/placeholder-image.png";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { handleChangeProduct } from "reducers/productSlice";
import DetailProductImages from "./components/DetailProductImages";
import MyBadge from "components/Bedge/MyBadge";
import { confirmAlert } from "react-confirm-alert";
import { setShow } from "reducers/toastSlice";
import "react-confirm-alert/src/react-confirm-alert.css";

const selectOptions: SelectOption[] = [
  {
    value: 1,
    label: "Xóa sản phẩm",
  },
  {
    value: 2,
    label: "Chuyển trạng thái",
  },
];
function ProductDetail() {
  const { id } = useParams() as any;
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const product = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch();
  const [isTranferStatus, setIsTranferStatus] = useState(false);
  const [isCreateAndUpdateProductDetail, setIsCreateAndUpdateProductDetail] =
    useState(false);

  const [currentProductDetails, setCurrentProductDetails] = useState(
    {} as ProductDetailRequest
  );
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await baseApi.getById("products", id);
        const productDetails = await baseApi.get(
          `product_details/product/${id}/status`,
          {
            status: 1,
          }
        );
        console.log(response.data.productDetails[0]);

        const action = handleChangeProduct(response.data);
        dispatch(action);
        setCurrentProductDetails(response.data.productDetails[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [id, isTranferStatus, isCreateAndUpdateProductDetail]);

  const handleOnChangeSelect = (value: any) => {
    if (value.value === 1) {
      handleDeleteProductDetail();
    } else {
      handleTranferStatus();
    }
  };

  const handleTranferStatus = async () => {
    try {
      const ids = product.productDetails
        .filter((pd) => pd.isChecked)
        .map((pd) => pd.id);
      confirmAlert({
        title: "Xác nhận",

        message: "Bạn chắc chắn muốn chuyển trạng thái không?",
        buttons: [
          {
            label: "Đồng ý",
            className: "btn-confirm-success",
            onClick: async () => {
              await baseApi
                .multiDelete(`product_details?status=${2}`, ids)
                .then((res) => {
                  setIsTranferStatus(true);
                  const action = setShow({
                    show: true,
                    content: "Chuyển thành công",
                    type: "success",
                  });
                  dispatch(action);
                });
            },
          },
          {
            label: "Thoát",
            onClick: () => {
              console.log("Thing was not saved to the database.");
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProductDetail = async () => {
    try {
      const ids = product.productDetails
        .filter((pd) => pd.isChecked)
        .map((pd) => pd.id);
      confirmAlert({
        title: "Xác nhận",
        message: "Bạn chắc chắn muốn xóa sản phẩm ?",
        buttons: [
          {
            label: "Đồng ý",
            className: "btn-confirm-success",
            onClick: async () => {
              await baseApi
                .multiDelete(`product_details?status=${1}`, ids)
                .then((res) => {
                  setIsTranferStatus(true);
                  const action = setShow({
                    show: true,
                    content: "Xóa thành công",
                    type: "success",
                  });
                  dispatch(action);
                });
            },
          },
          {
            label: "Thoát",
            onClick: () => {
              console.log("Thing was not saved to the database.");
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (e: any, index?: number) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempProducts = product.productDetails.map((p) => {
        return { ...p, isChecked: checked };
      });
      const action = handleChangeProduct({
        ...product,
        productDetails: [...tempProducts],
      });
      dispatch(action);
    } else {
      let tempProducts = product.productDetails.map((pd, i) =>
        index === i ? { ...pd, isChecked: checked } : pd
      );
      const action = handleChangeProduct({
        ...product,
        productDetails: [...tempProducts],
      });
      dispatch(action);
    }
  };

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Chi tiết sản phẩm</h1>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                className="btn btn-default"
                onClick={() => history.goBack()}
              >
                Quay lại
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary ml-2"
                onClick={() => {
                  history.push(`/product/${product.id}/update`);
                }}
              >
                Sửa sản phẩm
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
                <div className=" card-header-custom ">
                  <h4>
                    <i className="fas fa-info-circle"></i> Thông tin chung
                  </h4>
                </div>

                <div className="card-body">
                  <DetailProduct />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div
                  className="card-body d-flex align-items-center justify-content-center"
                  style={{ padding: 0 }}
                >
                  <table className="table table-fixed  position-relative">
                    <thead
                      className="card-header-custom"
                      style={{ padding: 6 }}
                    >
                      <tr>
                        {product.productDetails.some((p) => p.isChecked) ? (
                          <>
                            <th className="">
                              <div className="text-center">
                                <input
                                  type="checkbox"
                                  name="allSelect"
                                  checked={
                                    !product.productDetails.some(
                                      (pd) => pd.isChecked !== true
                                    )
                                  }
                                  onChange={handleCheck}
                                />
                              </div>
                            </th>
                            <th colSpan={2} style={{ padding: 0 }}>
                              <div className="d-flex">
                                <Select
                                  className="form-select-sm p-0"
                                  placeholder="Chọn thao tác"
                                  options={selectOptions}
                                  onChange={(value) =>
                                    handleOnChangeSelect(value)
                                  }
                                />
                                <div style={{ flex: 1 }}></div>
                              </div>
                            </th>
                          </>
                        ) : (
                          <>
                            <th>
                              <div className="text-center">
                                <input
                                  type="checkbox"
                                  name="allSelect"
                                  checked={
                                    !product.productDetails.some(
                                      (p) => p.isChecked !== true
                                    )
                                  }
                                  onChange={handleCheck}
                                />
                              </div>
                            </th>

                            <th style={{ fontWeight: 400, padding: 0 }}>
                              <h4 className="mb-0">Danh sách phiên bản</h4>
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody style={{ padding: 5 }} className="tr-table-pd ">
                      {product.productDetails
                        .filter((item) => item.status !== 3)

                        .map((item, index) => {
                          return (
                            <tr
                              className={
                                currentProductDetails.id === item.id &&
                                item.isChecked
                                  ? "active-pd-checked"
                                  : currentProductDetails.id === item.id &&
                                    !item.isChecked
                                  ? "active-pd"
                                  : ""
                              }
                              style={{ cursor: "pointer" }}
                              key={index}
                              onClick={() => setCurrentProductDetails(item)}
                            >
                              <td>
                                <div className="text-center">
                                  <input
                                    type="checkbox"
                                    name={index.toString()}
                                    checked={item?.isChecked || false}
                                    onChange={(e) => handleCheck(e, index)}
                                  />
                                </div>
                              </td>
                              <td style={{ paddingLeft: 0 }}>
                                <div className="d-flex align-items-center">
                                  <img
                                    style={{ width: "50px", height: "50px" }}
                                    src={item.image ? item.image : placeholder}
                                    alt="product"
                                  />
                                  <div style={{ marginLeft: 10 }}>
                                    <p className="color-size-pd">
                                      {item.color + "-" + item.size}
                                    </p>
                                    <p className="quantity-pd">
                                      {"Số lượng: " + item.quantity}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div
                  className="d-flex justify-content-center mb-3 mt-3 align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsOpenModal(true);
                    setIsUpdate(false);
                  }}
                >
                  <i className="far fa-plus-square add-product-detail-btn"></i>

                  <span className="ml-2" style={{ color: "royalblue" }}>
                    Thêm mới phiên bản
                  </span>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card custom-card">
                <div className="card-header-custom d-flex align-items-center ">
                  <h4>
                    <i className="fas fa-cube"></i> Chi tiết phiên bản
                  </h4>
                </div>
                <div className="card-body d-flex align-items-center justify-content-center">
                  {product.productDetails.length > 0 ? (
                    <div className="row" style={{ flex: 1 }}>
                      <div className="col-lg-8">
                        <div className="filed-info d-flex">
                          <span style={{ width: "170px" }}>Mã sản phẩm </span>
                          <span>{currentProductDetails.code}</span>
                        </div>
                        <div className="filed-info mt-3 d-flex">
                          <span style={{ width: "170px" }}>Barcode: </span>
                          <span>{currentProductDetails.barCode}</span>
                        </div>
                        <div className="filed-info mt-3 d-flex">
                          <span style={{ width: "170px" }}>Màu sắc: </span>
                          <span>{currentProductDetails.color}</span>
                        </div>
                        <div className="filed-info mt-3 d-flex">
                          <span style={{ width: "170px" }}>Kích cỡ: </span>
                          <span>{currentProductDetails.size}</span>
                        </div>
                        <div className="filed-info mt-3 d-flex">
                          <span style={{ width: "170px" }}>Giá bán: </span>
                          <span>
                            {formatter.format(currentProductDetails.price)}
                          </span>
                        </div>
                        <div className="filed-info mt-3 d-flex">
                          <span style={{ width: "170px" }}>Số lượng: </span>
                          <span>{currentProductDetails.quantity}</span>
                        </div>
                        <div className="filed-info mt-3 d-flex">
                          <span style={{ width: "170px" }}>Trạng thái: </span>

                          <MyBadge
                            className="p-top-5"
                            content={convertProductDetailStatus(
                              currentProductDetails.status
                            )}
                            color={
                              currentProductDetails.status === 1
                                ? "primary"
                                : "danger"
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 text-center">
                        <img
                          alt="product"
                          style={{ width: "200px", height: "200px" }}
                          src={
                            currentProductDetails.image
                              ? currentProductDetails.image
                              : placeholder
                          }
                        />
                      </div>
                      <div className="text-center col-lg-12 mt-5">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIsUpdate(true);
                            setIsOpenModal(true);
                            setCurrentProductDetails({
                              ...currentProductDetails,
                            });
                          }}
                        >
                          <i
                            className="fas fa-wrench"
                            style={{ color: "royalblue" }}
                          ></i>
                          {}
                          <span className="ml-2" style={{ color: "royalblue" }}>
                            Sửa thông tin phiên bản
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>Chưa có thông tin chi tiết phiên bản</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {productDetails && ( */}
      <UpdateAndCreateProductDetail
        onCreate={() => {
          setIsCreateAndUpdateProductDetail(!isCreateAndUpdateProductDetail);
        }}
        value={
          isUpdate
            ? currentProductDetails
            : ({
                id: 0,
                productId: id,
                productName: "",
                size: "",
                color: "",
                code: "",
                barCode: "",
                description: "",
                image: "",
                status: 1,
              } as ProductDetailRequest)
        }
        isOpen={isOpenModal}
        hideModal={() => {
          setIsOpenModal(!isOpenModal);
        }}
      />

      <DetailProductImages />

      {/* )} */}
    </div>
  );
}

export default ProductDetail;
