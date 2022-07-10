import { customerType } from "interfaces/customerType.interface";
import * as React from "react";
import styles from "../../index.module.css";
export interface ISearchCustomerResultProps {
  showResultCustomer: any;
  customers: customerType[];
  handleClickCustomer: Function;
  showModalCustomer: Function;
  customerRef: React.RefObject<HTMLDivElement>[];
  isSelected: number;
}

export default function SearchCustomerResult(
  props: ISearchCustomerResultProps
) {
  const {
    showResultCustomer,
    customers,
    handleClickCustomer,
    showModalCustomer,
    customerRef,
    isSelected,
  } = props;
  return (
    <div style={showResultCustomer} className={[styles.listCustomer].join(" ")}>
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div
            className={[styles.product_item].join(" ")}
            style={{ cursor: "pointer" }}
          >
            <div
              ref={customerRef[0]}
              onClick={() => showModalCustomer()}
              className="col-12 text-left"
              style={{
                borderBottom: "1px solid #a39f9f",
                padding: 10,
                backgroundColor: 0 === isSelected ? "rgb(211, 237, 253)" : "",
                color: 0 === isSelected ? "dodgerblue" : "",
              }}
            >
              <i className="fas fa-plus mr-3"></i>
              <span className="mb-1">Thêm mới khách hàng</span>
            </div>
          </div>
          {customers.length > 0 ? (
            customers.map((item, index) => {
              return (
                <div
                  className={[styles.product_item].join(" ")}
                  onClick={() => handleClickCustomer(item)}
                  key={index}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      index + 1 === isSelected ? "rgb(211, 237, 253)" : "",
                    color: index + 1 === isSelected ? "dodgerblue" : "",
                  }}
                  ref={customerRef[index + 1]}
                >
                  <div
                    className="col-12 text-left"
                    style={{ borderBottom: "1px solid #a39f9f", padding: 5 }}
                  >
                    <span style={{ display: "block" }} className="mb-1">
                      {item.gender ? "Anh " : "Chị "}
                      {item.name}
                    </span>
                    <span className="mb-1">{item.phone}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center" style={{ padding: 10 }}>
              Không có dữ liệu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
