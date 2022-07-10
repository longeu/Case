import ProductDetail from "interfaces/product-detail.interface";
import React, { ReactElement, RefObject } from "react";
import { formatter } from "types";
import styles from "./index.module.css";

interface Props {
  product: ProductDetail;
  handleOnAddProduct: (product: ProductDetail) => void;
  productRef: RefObject<HTMLDivElement>;
  isSelected: boolean;
}

export default function ProductDetails({
  product,
  handleOnAddProduct,
  productRef,
  isSelected,
}: Props): ReactElement {
  return (
    <div
      className={["col-md-12 border", styles.list_product].join(" ")}
      key={product.id}
      onClick={() => handleOnAddProduct(product)}
      style={{
        cursor: "pointer",
        height: "70px",
        backgroundColor: isSelected ? "rgb(211, 237, 253)" : "",
        color: isSelected ? "dodgerblue" : "",
      }}
      ref={productRef}
    >
      <div className="row" style={{ zIndex: 1 }}>
        <div className="col-1 m-0 p-0">
          <img
            src={product.image}
            alt={product.productName}
            style={{ width: "100%", height: "68px" }}
          />
        </div>
        <div className="col-11 row border-left p-0 m-0">
          <div className="col-8 mr-auto">
            <div className="row">
              <span className="col-8 mb-1 mt-2">{product.productName}</span>
              <span className="col-4 mt-2">
                Màu sắc: {product.color || "chưa có thông tin"}
              </span>
            </div>
            <div className="row">
              <span
                className="m-0 col-8 font-weight-bold mb-1 mt-2"
                style={{ lineHeight: 0.5 }}
              >
                Số lượng: {product.quantity}
              </span>
              <span className="col-4 m-0">
                Kích cỡ: {product.size || "chưa có thông tin"}
              </span>
            </div>
          </div>
          <div className="col-auto text-end ">
            <span className="d-block mb-1 mt-2">
              đã bán: {product.quantitySell || 0}
            </span>
            <span>đơn giá: {formatter.format(product.price || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
