import * as React from "react";
import { formatter } from "types";
import { BarCode } from "../types";
import MyBarCode from "./BarCode";

interface PrintBarCodesProps {
  barCodes: BarCode[];
}
const PrintBarCodes = React.forwardRef(
  (props: PrintBarCodesProps, ref: any) => {
    return (
      <div ref={ref} key={Math.floor(Math.random() * 1000)}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            {props.barCodes.map((item, index) => {
              return (
                <div className="col-12 text-center mb-5" key={index}>
                  <h1>{item.name}</h1>
                  <div>
                    <span style={{ fontSize: 30 }} className="mr-2">
                      {item.color}
                    </span>
                    <span> - </span>
                    <span style={{ fontSize: 30 }}>{item.color}</span>
                  </div>
                  <MyBarCode value={item.barCode} />
                  <h1>{formatter.format(item.price)} đ</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
export default PrintBarCodes;
