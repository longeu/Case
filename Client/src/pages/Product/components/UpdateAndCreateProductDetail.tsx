import { yupResolver } from "@hookform/resolvers/yup";
import baseApi from "api/baseApi";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { ProductDetailRequest, productDetailStatusOptions } from "../types";
import LoadingSmall from "./LoadingSmall";
import StatusSelect from "./StatusSelect";
import { storage } from "components/Firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Progress from "./Progress";
import CurrencyFormat from "react-currency-format";
import placeholder from "assets/dist/img/placeholder.png";
import { setShow } from "reducers/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { handleChangeProduct } from "reducers/productSlice";

interface UpdateAndCreateProductDetailProps {
  onCreate: () => void;
  isOpen: boolean;
  hideModal: () => void;
  value: ProductDetailRequest;
}

function UpdateAndCreateProductDetail(
  props: UpdateAndCreateProductDetailProps
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowProgress, setIsShowProgress] = useState<boolean>(false);
  const [errorImage, setErrorImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [productDetail, setProductDetail] = useState(props.value);
  const product = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setProductDetail(props.value);
  }, [props.value]);

  const schema = yup.object().shape({
    color: yup.string().required("Màu không được để trống").max(11),
    size: yup.string().required("Kích thước không được để trống").max(11),
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
  const handleOnChangeNumber = (value: any, name: string) => {
    setProductDetail({ ...productDetail, [name]: parseFloat(value) });
  };

  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image") {
      const file = e.target.files[0];
      uploadFiles(file);
    } else {
      setProductDetail({ ...productDetail, [name]: value });
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
        setIsShowProgress(true);
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsShowProgress(false);
          setProductDetail({
            ...productDetail,
            image: downloadURL,
          });
          return downloadURL;
        });
      }
    );
    return;
  };

  const handleCheckRule = (e: any) => {
    const name = e.target.name;

    if (
      product.productDetails
        .filter((pd) => pd.status === 1)
        .some(
          (pd, i) =>
            productDetail.color === pd.color && productDetail.size === pd.size
        )
    ) {
      setProductDetail({ ...productDetail, [name]: "" });
    }
  };

  const onSubmit: SubmitHandler<ProductDetailRequest> = () => {
    setIsLoading(true);
    if (props.value.id !== 0) {
      baseApi.put("product_details", productDetail).then((res) => {
        const action = setShow({
          show: true,
          content: "Sửa thành công",
          type: "success",
        });
        dispatch(action);
        setIsLoading(false);
        props.hideModal();
        props.onCreate();
      });
    } else {
      baseApi.post("product_details", productDetail).then((res) => {
        const action = setShow({
          show: true,
          content: "Thêm thành công",
          type: "success",
        });
        dispatch(action);
        setIsLoading(false);
        props.hideModal();
        props.onCreate();
      });
    }
  };

  const hideModalAndClearErrors = () => {
    props.hideModal();
    clearErrors(["size", "color"]);
  };

  const inputFile = React.useRef<HTMLInputElement>(null);
  return (
    <Modal size="lg" show={props.isOpen} onHide={hideModalAndClearErrors}>
      <Modal.Header>
        <Modal.Title>Thêm mới phiên bản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="create_and_update_product"
          >
            <div className="col-lg-8 row">
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Mã code
                  {/* <span className="ml-1 text-danger">*</span> */}
                </label>
                <input
                  disabled
                  type="text"
                  className={
                    errors.code ? "form-control is-invalid" : "form-control "
                  }
                  onFocus={() => clearErrors("code")}
                  {...register("code", {
                    onChange: handleOnChange,
                    value: productDetail.code,
                  })}
                  {...setValue("code", productDetail.code)}
                />
                {errors.code && (
                  <p style={{ color: "red" }}>{errors.code?.message}</p>
                )}
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Mã Barcode
                  {/* <span className="ml-1 text-danger">*</span> */}
                </label>
                <input
                  disabled
                  type="text"
                  value={productDetail.barCode}
                  className={
                    errors.barCode ? "form-control is-invalid" : "form-control "
                  }
                  onFocus={() => clearErrors("barCode")}
                  {...register("barCode", {
                    onChange: handleOnChange,
                    value: productDetail.barCode,
                  })}
                  {...setValue("barCode", productDetail.barCode)}
                />
                {errors.barCode && (
                  <p style={{ color: "red" }}>{errors.barCode?.message}</p>
                )}
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Màu
                  <span className="ml-1 text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={productDetail.color}
                  className={
                    errors.color ? "form-control is-invalid" : "form-control "
                  }
                  onFocus={() => clearErrors("color")}
                  {...register("color", {
                    onChange: handleOnChange,
                    value: productDetail.color,
                  })}
                  {...setValue("color", productDetail.color)}
                  onBlur={(e) => handleCheckRule(e)}
                />
                {errors.color && (
                  <p style={{ color: "red" }}>{errors.color?.message}</p>
                )}
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Kích cỡ
                  <span className="ml-1 text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={productDetail.size}
                  className={
                    errors.size ? "form-control is-invalid" : "form-control "
                  }
                  onFocus={() => clearErrors("size")}
                  {...register("size", {
                    onChange: handleOnChange,
                    value: productDetail.size,
                  })}
                  {...setValue("size", productDetail.size)}
                  onBlur={(e) => handleCheckRule(e)}
                />
                {errors.size && (
                  <p style={{ color: "red" }}>{errors.size?.message}</p>
                )}
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Giá bán sản phẩm
                  <span className="ml-1 text-danger">*</span>
                </label>

                <CurrencyFormat
                  name="priceSell"
                  value={productDetail.priceSell || 0}
                  className={
                    errors.priceSell
                      ? "form-control is-invalid"
                      : "form-control "
                  }
                  defaultValue={productDetail.priceSell}
                  onValueChange={(values) => {
                    setProductDetail({
                      ...productDetail,
                      priceSell: parseFloat(values.value),
                    });
                  }}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  suffix={" ₫"}
                  isAllowed={(val: any) => {
                    const { value } = val;
                    return value >= 0;
                  }}
                />
                {errors.priceSell && (
                  <p style={{ color: "red" }}>{errors.priceSell?.message}</p>
                )}
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Giá nhập sản phẩm
                  <span className="ml-1 text-danger">*</span>
                </label>

                <CurrencyFormat
                  name="price"
                  value={productDetail.price || 0}
                  className={
                    errors.price ? "form-control is-invalid" : "form-control "
                  }
                  defaultValue={productDetail.price}
                  onValueChange={(values) => {
                    handleOnChangeNumber(values.value, "price");
                  }}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  suffix={" ₫"}
                  isAllowed={(val: any) => {
                    const { value } = val;
                    return value >= 0;
                  }}
                />
                {errors.price && (
                  <p style={{ color: "red" }}>{errors.price?.message}</p>
                )}
              </div>
            </div>
            <div className="col-lg-4 position-relative">
              <label htmlFor="name" className="form-label">
                Ảnh
              </label>
              <label
                className="border d-block"
                htmlFor="img-pd"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={productDetail.image ? productDetail.image : placeholder}
                  alt="product"
                  style={{ width: "100%", height: 207 }}
                />
              </label>
              <Progress now={progress} isDisplay={isShowProgress} />
              {!productDetail.image && (
                <span className="not-image-pd-text">Chọn ảnh sản phẩm</span>
              )}
              <input
                id="img-pd"
                type="file"
                className="form-control d-none"
                name="image"
                onChange={handleOnChange}
              />

              {errorImage && <p style={{ color: "red" }}>{errorImage}</p>}
            </div>

            <div className="col-lg-12 row">
              <div className="col-lg-4 mb-3">
                <label htmlFor="quantity" className="form-label">
                  Số lượng
                  <span className="ml-1 text-danger">*</span>
                </label>
                <CurrencyFormat
                  value={productDetail.quantity || 0}
                  className={
                    errors.quantity
                      ? "form-control is-invalid"
                      : "form-control "
                  }
                  defaultValue={productDetail.quantity}
                  onValueChange={(values) => {
                    handleOnChangeNumber(values.value, "quantity");
                  }}
                  isAllowed={(val: any) => {
                    const { value } = val;
                    return value >= 0;
                  }}
                />
              </div>
              <div className="col-lg-4 mb-3">
                <label htmlFor="name" className="form-label">
                  Giám giá
                </label>
                <CurrencyFormat
                  name="discountSell"
                  value={productDetail.discountSell || 0}
                  className={
                    errors.discountSell
                      ? "form-control is-invalid"
                      : "form-control "
                  }
                  defaultValue={productDetail.discountSell}
                  onValueChange={(values) => {
                    handleOnChangeNumber(values.value, "discountSell");
                  }}
                  suffix={"%"}
                  isAllowed={(val: any) => {
                    const { value } = val;
                    return value >= 0 && value <= 100;
                  }}
                />
                {errors.discountSell && (
                  <p style={{ color: "red" }}>{errors.discountSell?.message}</p>
                )}
              </div>

              <div className="col-lg-4 mb-3">
                <label htmlFor="name" className="form-label">
                  Trạng thái
                  <span className="ml-1 text-danger">*</span>
                </label>

                <StatusSelect
                  value={productDetail.status}
                  options={productDetailStatusOptions}
                  onChange={(value) => {
                    setProductDetail({ ...productDetail, status: value });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-12">
              <label htmlFor="name" className="form-label">
                Mô tả
              </label>
              <textarea
                className="form-control"
                rows={5}
                {...register("description", {
                  onChange: handleOnChange,
                  value: productDetail.description,
                })}
                {...setValue("price", productDetail.description)}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.hideModal();
            clearErrors(["color", "size"]);
          }}
        >
          Hủy
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          form="create_and_update_product"
        >
          {isLoading ? <LoadingSmall /> : "Lưu"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAndCreateProductDetail;
