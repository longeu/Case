import { Link } from "react-router-dom";
import { formatter } from "types";
import { OrderDetailRequest } from "../interface/typesSaleBill";
import { useHistory } from "react-router";
interface DataTableSaleBillDetailProps {
  data: OrderDetailRequest[];
}
const columns = [
  "Mã",
  "Tên sản phẩm",
  "Số lượng",
  "Đơn giá",
  "Giảm giá",
  "Thành tiền",
];

function DataTableSaleBillDetail(props: DataTableSaleBillDetailProps) {
  const history = useHistory();
  const { data } = props;
  return (
    <table id="example2" className="table  table-hover">
      <thead className="table-light">
        <tr>
          {columns.map((col, index) => {
            return <th key={index + col}>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item: OrderDetailRequest, index) => {
          console.log(item);
          return (
            <tr
              style={{ cursor: "pointer" }}
              key={index + 1}
              onClick={() =>
                history.push(`/product/${item.productDetail.productId}/detail`)
              }
            >
              <td>{item.productDetail.code}</td>
              <td style={{ color: "#007bff" }}>
                {item.productDetail.productName.substring(0, 25) + "..."} -
                {item.productDetail.size} - {item.productDetail.color}
              </td>
              <td className="text-center">{item.quantity}</td>
              <td>{formatter.format(item.price * item.quantity)}</td>
              <td className="text-right">{formatter.format(item.discount)}</td>
              <td>
                {formatter.format(item.price * item.quantity - item.discount)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTableSaleBillDetail;
