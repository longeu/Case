import Button from "@restart/ui/esm/Button";
import MyCollapse from "components/Collage/MyCollapse ";
import moment from "moment";
import React, { useState } from "react";
import { convertProductDetailStatus } from "utils/convertStatus";
import placeholder from "assets/dist/img/placeholder-image.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { showDetailImages } from "reducers/uploadImage";

function DetailProduct() {
  const product = useSelector((state: RootState) => state.productReducer);
  const [isShowDescriptionProduct, setIsShowDescriptionProduct] =
    useState(false);
  const dispatch = useDispatch();

  return (
    <div className="row">
      <div className="col-lg-5">
        <div className="filed-info d-flex">
          <span style={{ width: "170px" }}>Tên sản phẩm: </span>
          <span>{product.name}</span>
        </div>
        <div className="filed-info mt-3 d-flex">
          <span style={{ width: "170px" }}>Loại sản phẩm: </span>
          <span>{product.categoryName}</span>
        </div>
        <div className="filed-info mt-3 d-flex">
          <span style={{ width: "170px" }}>Trạng thái: </span>
          <span>{convertProductDetailStatus(product.status)}</span>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="filed-info d-flex">
          <span style={{ width: "170px" }}>Ngày tạo: </span>
          <span>{moment(product.createdAt).format("L")}</span>
        </div>
        <div className="filed-info mt-3 d-flex">
          <span style={{ width: "170px" }}>Ngày cập nhật: </span>
          <span>{moment(product.updatedAt).format("L")}</span>
        </div>
      </div>
      <div
        className="col-lg-3 text-center position-relative"
        onClick={() => {
          const action = showDetailImages();
          dispatch(action);
        }}
        style={{ cursor: "pointer" }}
      >
        {product.image !== "" ? (
          <>
            <span className="overlay-image ">
              {" "}
              <img
                alt="product"
                style={{ width: "100px", height: "100px" }}
                src={product.image ? product.image : placeholder}
              />
            </span>
            <span className="count-img ">
              {product.image?.trimStart().split(" ").length + " +"}
            </span>
          </>
        ) : (
          <img
            alt="product"
            style={{ width: "100px", height: "100px" }}
            src={product.image ? product.image : placeholder}
          />
        )}
      </div>
      {product.description ? (
        <div className="col-lg-12 mt-4 text-center">
          <MyCollapse
            value={product.description}
            isShow={isShowDescriptionProduct}
          />
          <Button
            className="btn border-0 mt-2"
            onClick={() =>
              setIsShowDescriptionProduct(!isShowDescriptionProduct)
            }
            style={{ color: "#007bff" }}
          >
            Xem thêm
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DetailProduct;
