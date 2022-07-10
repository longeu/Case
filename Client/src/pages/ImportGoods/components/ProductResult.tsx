import { PurchaseOrderDetailInterface } from "interfaces/import-goods-detail.interface";
import React, { ReactElement } from "react";
import CurrencyFormat from "react-currency-format";
import { formatter } from "types";
import styles from "../index.module.css";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";

interface Props {
  product: PurchaseOrderDetailInterface;
  index: number;
  handleOnMinus: (id: number) => void;
  handleQuantityOnChange: (
    e: any,
    product: PurchaseOrderDetailInterface
  ) => void;
  handleOnPlus: (id: number) => void;
  status: number;
  productResult: PurchaseOrderDetailInterface[];
  setProductResult: (productResult: PurchaseOrderDetailInterface[]) => void;
  inputQuantityRef: React.RefObject<HTMLInputElement>;
  updateQuantityRefLength: (e: number) => void;
  handleOnShowProductDetailModalDiscount: (product:any) => void;
}

export default function ProductResult({
  product,
  index,
  handleOnMinus,
  handleOnPlus,
  handleQuantityOnChange,
  status,
  productResult,
  setProductResult,
  inputQuantityRef,
  updateQuantityRefLength,
  handleOnShowProductDetailModalDiscount
}: Props): ReactElement {
 
  return (
    <>
      <tr>
        <td>{product.productDetail.code}</td>
        <td>
          <span>
            <Link to={`/product/${product.productDetail.productId}/detail`}>
              {product.productDetail.productName?.substring(0, 25) + "..."}
            </Link>
          </span>
          <span className="d-block ">
            {product.productDetail.color} - {product.productDetail.size}
          </span>
        </td>

        {status !== 1 ? (
          <>
            <td style={{ display: "flex" }}>
              <i
                className="fas fa-minus mr-1"
                onClick={() => {
                  handleOnMinus(product.productDetailId as number);
                }}
                style={{ lineHeight: "40px" }}
              ></i>
              <input
                className="form-control input_quantity"
                type="number"
                pattern="[0-9]*"
                onChange={(e: any) => {
                  handleQuantityOnChange(e, product);
                }}
                value={product.quantity}
                style={{ width: "80px", textAlign: "center" }}
                ref={inputQuantityRef}
              />
              <i
                className={["fas fa-plus ml-1", styles.icon_plus].join(" ")}
                onClick={() => {
                  handleOnPlus(product.productDetailId as number);
                  console.log(product);
                }}
                style={{ lineHeight: "40px" }}
              ></i>
            </td>
            <td>
              <CurrencyFormat
                style={{ textAlign: "right", width: 110 }}
                decimalSeparator={","}
                thousandSeparator={". "}
                suffix={"đ"}
                value={product.price || "0"}
                className="form-control  input_quantity"
                onValueChange={(values: any) => {
                  console.log(values, index);
                  const { value } = values;
                  const newData = [...productResult];
                  newData[index] = {
                    ...product,
                    price: parseFloat(value),
                  };
                  setProductResult(newData);
                }}
                isAllowed={(values: any) => {
                  const { value } = values;
                  return value > 0;
                }}
              />
            </td>
            <td style={{ width: 120 }}>
              <div
                onClick={() => {
                  handleOnShowProductDetailModalDiscount(product);
                }}
                className="col-4 text-right"
                style={{ cursor: "pointer" }}
              >
                <CurrencyFormat
                  type="text"
                  disabled={true}
                  style={{
                    textAlign: "right",
                    cursor: "pointer",
                    border: "none",
                    borderBottom: "1.5px solid darkgray",
                    borderRadius: 0,
                    padding: 0,
                    background: "#fff",
                    fontSize: "17px",
                    color: "black",
                    width: "110px",
                  }}
                  className="form-control"
                  value={product.discount}
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  suffix={" ₫"}
                />
              </div>
            </td>
          </>
        ) : (
          <>
            <td className="text-center">{product.quantity}</td>
            <td style={{ textAlign: "end" }}>
              {formatter.format(product.price || 0)}
            </td>
            <td className="text-center">{formatter.format(product.discount || 0)} </td>
          </>
        )}

        <td style={{ textAlign: "end", width: 130 }}>
          {formatter.format(
            (product.quantity || 0) * (product.price || 0) -
              (product.discount || 0) 
          )}
        </td>
        {status !== 1 && (
          <td>
            <i
              onClick={() => {
                setProductResult(
                  productResult.filter((item) => item.id !== product.id)
                );
                updateQuantityRefLength(productResult.length);
              }}
              className="fas fa-trash-alt"
              style={{ lineHeight: "40px" }}
            ></i>
          </td>
        )}
      </tr>
    </>
  );
}
