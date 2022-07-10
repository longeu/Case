import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import CategorySelect from "./components/CategorySelect";
import StatusSelect from "./components/StatusSelect";
import { productStatusOptions } from "./types";
import baseApi from "api/baseApi";
import Loading from "./components/LoadingSmall";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { storage } from "components/Firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import CreateCategory from "./components/CreateCategory";
import placeholder from "../../assets/dist/img/placeholder.png";
import DataTableProductDetail from "./components/DataTableProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { setShow } from "reducers/toastSlice";
import {
  handleChangeProduct,
  handleChangeProductDetails,
} from "reducers/productSlice";
import LoadingSmall from "./components/LoadingSmall";
import { showUploadImage } from "reducers/uploadImage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ProductProperty from "./components/ProductProperty";
function UpdateAndCreateProduct() {
  const history = useHistory();
  const { id } = useParams() as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [valueProperty, setValueProperty] = useState<Array<string>>([]);
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.productReducer);

  const schema = yup.object().shape({
    name: yup.string().required("Tên sản phẩm không được để chống"),
  });

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setValue,
  } = useForm({
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function getProduct() {
      const response = await baseApi.getById("products", id);
      const action = handleChangeProduct(response.data);
      dispatch(action);
    }
    if (id) {
      getProduct();
    }
  }, [id, isUpdate]);

  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image") {
      const file = e.target.files[0];
      uploadFiles(file);
    } else {
      const action = handleChangeProduct({ ...product, [name]: value });
      dispatch(action);
    }
  };

  const uploadFiles = (file: any): any => {
    if (!file) return;
    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      setErrorImage("Bạn phải chọn một ảnh");
      return;
    }
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoadingImage(true);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoadingImage(false);
          const action = handleChangeProduct({
            ...product,
            image: downloadURL,
          });
          dispatch(action);
          return downloadURL;
        });
      }
    );
    return;
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (
        product.productDetails
          .filter((pd) => pd.status === 1)
          .some((pd) => pd.color === "" || pd.size === "")
      ) {
        setIsLoading(false);
        const action = setShow({
          show: true,
          content: "Không được để trống màu và kích thước ",
          type: "error",
        });
        dispatch(action);
        document
          .getElementById("color-0")
          ?.scrollIntoView({ behavior: "smooth" });

        return;
      }
      if (!id) {
        await baseApi
          .post("products", {
            name: product.name,
            description: product.description,

            categoryId: product.categoryId,
            image: product.image,
            status: product.status,
            productDetails: product.productDetails,
          })
          .then((res) => {
            setIsLoading(false);
            const success = setShow({
              show: true,
              content: "Thêm mới thành công",
              type: "success",
            });
            dispatch(success);
            confirmAlert({
              title: "Xác nhận",
              message: "Bạn có muốn tiếp tục thêm mới không?",
              buttons: [
                {
                  label: "Đồng ý",
                  className: "btn-confirm-success",
                  onClick: async () => {
                    const action = handleChangeProduct({
                      id: 0,
                      name: "",
                      description: "",
                      image: "",
                      status: 1,
                      productDetails: [],
                    });
                    dispatch(action);
                  },
                },
                {
                  label: "Thoát",
                  onClick: () => {
                    history.push("/product/list");
                  },
                },
              ],
            });
          });
      } else {
        await baseApi.put("products", product).then((res) => {
          setIsLoading(false);
          setIsUpdate(!isUpdate);
          const success = setShow({
            show: true,
            content: "Sửa thành công",
            type: "success",
          });
          dispatch(success);
          confirmAlert({
            title: "Xác nhận",
            message: "Bạn có muốn tiếp tục sửa không?",
            buttons: [
              {
                label: "Đồng ý",
                className: "btn-confirm-success",
                onClick: async () => {
                  setValueProperty([""]);
                  history.push(`/product/${res.data.id}/update`);
                },
              },
              {
                label: "Thoát",
                onClick: () => {
                  history.push(`/product/${res.data.id}/detail`);
                },
              },
            ],
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProductDetail = async () => {
    try {
      confirmAlert({
        title: "Xác nhận",
        message: "Bạn có chắc chắn muốn xóa phiên bản không?",
        buttons: [
          {
            label: "Đồng ý",
            className: "btn-confirm-success",
            onClick: async () => {
              const newProductDetails = product.productDetails.filter((pd) => {
                if (!pd.isChecked) {
                  return { ...pd, status: pd.status === 3, isChecked: false };
                }
              });
              const action = handleChangeProductDetails([...newProductDetails]);
              dispatch(action);
              const ids = product.productDetails
                .filter((pd) => pd.isChecked && pd.id)
                .map((pd) => pd.id);
              if (ids.length > 0) {
                await baseApi
                  .multiDelete(`product_details?status=${1}`, ids)
                  .then((res) => {
                    setIsUpdate(!isUpdate);
                  });
              }
              const showAlert = setShow({
                show: true,
                content: "Xóa phiên bản thành công",
                type: "success",
              });
              dispatch(showAlert);
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
      alert("Xóa không  thành công");
    }
  };

  const handleOnTranferStatus = async () => {
    try {
      confirmAlert({
        title: "Xác nhận",
        message: "Bạn có chắc chắn muốn xóa chuyển trạng thái không?",
        buttons: [
          {
            label: "Đồng ý",
            className: "btn-confirm-success",
            onClick: async () => {
              const newProductDetails = product.productDetails.map((pd) => {
                if (pd.isChecked) {
                  return { ...pd, status: pd.status === 2, isChecked: false };
                } else {
                  return pd;
                }
              });
              const action = handleChangeProductDetails([...newProductDetails]);
              dispatch(action);
              const ids = product.productDetails
                .filter((pd) => pd.isChecked && pd.id)
                .map((pd) => pd.id);
              if (ids.length > 0) {
                await baseApi
                  .multiDelete(`product_details?status=${2}`, ids)
                  .then((res) => {
                    setIsUpdate(!isUpdate);
                  });
              }
              const showAlert = setShow({
                show: true,
                content: "Chuyển trạng thái thành công",
                type: "success",
              });
              dispatch(showAlert);
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
      alert("Xóa không  thành công");
    }
  };
  const setShowModalCategory = () => {
    setIsOpenModal(true);
  };
  return (
    <div className="position-relative">
      <section className="content-header position-sticky">
        <div className="container-fluid">
          <div className="d-flex  mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>{!id ? "Thêm mới sản phẩm" : "Sửa sản phẩm"}</h1>
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
                form="create-product-form"
                type="submit"
              >
                {isLoading ? <Loading /> : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header-custom">Thông tin chung</div>

                <div className="card-body" style={{ height: "355px" }}>
                  <form
                    className="row g-3"
                    onSubmit={handleSubmit(onSubmit)}
                    id="create-product-form"
                  >
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="name" className="form-label">
                            Tên sản phẩm
                            <span className="ml-1 text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Điền tên sản phẩm"
                            className={
                              errors.name
                                ? "form-control is-invalid"
                                : "form-control "
                            }
                            onFocus={() => clearErrors("name")}
                            {...register("name", {
                              onChange: handleOnChange,

                              value: product.name,
                            })}
                            {...setValue("name", product.name)}
                          />
                          {errors.name && (
                            <p style={{ color: "red" }}>
                              {errors.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label htmlFor="name" className="form-label">
                            Loại
                            <span className="ml-1 text-danger">*</span>
                          </label>
                          <CategorySelect
                            showModalCategory={setShowModalCategory}
                            isCreate={isCreateCategory}
                            value={product.categoryId}
                            onChange={(value) => {
                              const action = handleChangeProduct({
                                ...product,
                                categoryId: value,
                              });
                              dispatch(action);
                            }}
                          />
                          {errorImage && (
                            <p style={{ color: "red" }}>{errorImage}</p>
                          )}
                        </div>
                        <div className="col-md-6 mt-3">
                          <label htmlFor="name" className="form-label">
                            Trạng thái
                            <span className="ml-1 text-danger">*</span>
                          </label>
                          <StatusSelect
                            options={productStatusOptions}
                            value={product.status}
                            onChange={(value) => {
                              const action = handleChangeProduct({
                                ...product,
                                status: value,
                              });
                              dispatch(action);
                            }}
                          />
                          {errorImage && (
                            <p style={{ color: "red" }}>{errorImage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <label htmlFor="name" className="form-label">
                        Ảnh
                      </label>
                      <label
                        htmlFor="image-product"
                        className="d-block position-relative image-box-create-product"
                        onClick={() => {
                          const action = showUploadImage();
                          dispatch(action);
                        }}
                      >
                        {isLoadingImage ? (
                          <span className="loading-image ">
                            <LoadingSmall className="loading-image-spinner" />
                          </span>
                        ) : (
                          <>
                            {product.image ? (
                              <img
                                src={product.image}
                                alt="product"
                                style={{
                                  width: "100%",
                                  height: 122,
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <>
                                <img
                                  src={placeholder}
                                  alt="product"
                                  style={{
                                    width: "100%",
                                    height: 122,
                                    objectFit: "cover",
                                  }}
                                />
                                <p className="not-image-text">Chọn ảnh</p>
                              </>
                            )}
                          </>
                        )}
                      </label>
                      {errorImage && (
                        <p style={{ color: "red" }}>{errorImage}</p>
                      )}
                    </div>

                    <div className="col-lg-12 mt-2">
                      <label htmlFor="name" className="form-label">
                        Mô tả
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Điền mô tả sản phẩm"
                        name="description"
                        rows={4}
                        value={product.description}
                        onChange={handleOnChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <ProductProperty value={valueProperty} />
            </div>
            <div className="col-lg-12">
              <DataTableProductDetail
                onDelete={handleDeleteProductDetail}
                onTranfer={handleOnTranferStatus}
              />
            </div>
          </div>
        </div>
      </section>
      <CreateCategory
        onCreate={() => setIsCreateCategory(!isCreateCategory)}
        isOpen={isOpenModal}
        hideModal={() => {
          setIsOpenModal(!isOpenModal);
        }}
      />
    </div>
  );
}

export default UpdateAndCreateProduct;
