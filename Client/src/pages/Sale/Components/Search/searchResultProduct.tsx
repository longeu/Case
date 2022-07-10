import { ProductDetailRequest } from "pages/Product/types";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { setShow } from "reducers/toastSlice";
import { formatter } from "types";
import { checkDiscount } from "utils/countPrice";
import styles from "../../index.module.css";
export interface ISearchResultProductProps {
  showResult: any;
  productDetails: ProductDetailRequest[];
  handleClick: Function;
  fetchMoreData: any;
  hasMore: boolean;
  productRef: React.RefObject<HTMLDivElement>[];
  isSelected: number;
}
export default function SearchResultProduct(props: ISearchResultProductProps) {
  const dispatch = useDispatch();
  const {
    showResult,
    productDetails,
    handleClick,
    fetchMoreData,
    hasMore,
    productRef,
    isSelected,
  } = props;
  const alertMessage = () => {
    const action = setShow({
      show: true,
      content: "Sản phẩm này hiện tại đã hết hàng !",
      type: "error",
    });
    dispatch(action);
  };
  return (
    <div className={[styles.listProduct].join(" ")} style={showResult}>
      <div className="card border">
        {productDetails.length > 0 ? (
          <InfiniteScroll
            dataLength={productDetails.length}
            next={fetchMoreData}
            hasMore={hasMore}
            height={550}
            loader={
              hasMore ? (
                <div className="text-center text-primary">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : null
            }
          >
            {productDetails.map((product, index) => (
              <div
                onClick={() =>
                  product.quantity !== 0 ? handleClick(product) : alertMessage()
                }
                key={index}
                className={[
                  "col-md-12 border",
                  styles.list_product,
                  styles.product_item,
                ].join(" ")}
                style={{
                  cursor: "pointer",
                  height: "70px",
                  backgroundColor:
                    index === isSelected ? "rgb(211, 237, 253)" : "",
                  color: index === isSelected ? "dodgerblue" : "",
                }}
                ref={productRef[index]}
              >
                <div className="row" style={{ zIndex: 1 }}>
                  <div className="col-1 m-auto" style={{ padding: 0 }}>
                    <img
                      src={product.image}
                      alt={product.productName}
                      style={{ width: "100%", height: 67 }}
                    />
                  </div>
                  <div className="col-11 row border-left p-0 m-0">
                    <div
                      className="col-7 mr-auto"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="row">
                        <span className="col-12">
                          {" "}
                          {product.productName.substring(0, 20) + "..."} -{" "}
                          {product.color} -{product.size}
                        </span>
                        <span className="col-12" style={{ display: "block" }}>
                          {product.code}
                        </span>
                      </div>
                    </div>
                    <div
                      className="col-auto text-right"
                      style={{ marginTop: 7 }}
                    >
                      <div className="row ">
                        {product.discountSell > 0 && product.status === 1 ? (
                          <span className="col-12">
                            {formatter.format(
                              checkDiscount(
                                product.priceSell,
                                product.discountSell
                              )
                            )}
                            <del
                              style={{ fontSize: 12, padding: 5, color: "red" }}
                            >
                              {formatter.format(product.priceSell)}
                            </del>
                          </span>
                        ) : (
                          <span className="col-12">
                            {formatter.format(product.priceSell)}
                          </span>
                        )}
                        <span className="col-12" style={{ display: "block" }}>
                          Có thể bán:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {product.quantity}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className="card-body">
            <div className="text-center">
              <h6>Không có dữ liệu</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
