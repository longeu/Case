import moment from "moment";
import { Link } from "react-router-dom";
import { formatter } from "types";
import { convertOrderStatus } from "utils/convertStatus";
import { useHistory } from "react-router";
interface DataTableSaleBillProps {
  data: any[];
}
const columns = [
  "Mã đơn hàng",
  "Ngày tạo",
  "Nhân viên",
  "Khách hàng",
  "Trạng thái",
  "Tổng tiền",
  "Chiết khấu",
  "Ghi chú",
];

function DataTableSaleBill(props: DataTableSaleBillProps) {
  const history = useHistory();
  if (props.data.length) {
    return (
      <table className="table    table-hover">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => {
              return <th key={index + col}>{col}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => {
            return (
              <tr
                key={item + index}
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/bill/sale/${item.id}/detail`)}
              >
                <td style={{ color: "#007bff" }}>{item.code}</td>
                <td>{moment(item.createdAt).format("L")}</td>
                <td>{item.accountName}</td>
                <td className="text-left">
                  {item.customerName} - {item.customerPhone}
                </td>
                <td>{convertOrderStatus(item.status)}</td>
                <td>{formatter.format(item.totalPrice)}</td>
                <td>{formatter.format(item.discount)}</td>
                <td>{item.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <div className="text-center">Không có dữ liệu</div>;
  }
}

export default DataTableSaleBill;
