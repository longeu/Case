import MyBadge from "components/Bedge/MyBadge";
import { staffType } from "interfaces/statffType.interface";
import moment from "moment";
import * as React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { convertRole, convertStatusStaff } from "utils/convertStatus";

export interface IStaffTableProps {
  staffs: staffType[];
  handleChangeStatus: Function;
}
const columns = [
  "STT",
  "Mã nhân viên",
  "Họ và tên",
  "Ảnh",
  "SĐT",
  "Chức vụ",
  "Trạng thái",
];
export default function StaffTable(props: IStaffTableProps) {
  const { staffs, handleChangeStatus } = props;
  const history = useHistory();
  if (staffs.length === 0) {
    return (
      <div className="container text-center">
        <div className="row">
          <div>Không tìm thấy dữ liệu</div>
        </div>
      </div>
    );
  }
  return (
    <table className="table table-hover">
      <thead className="table-light">
        <tr>
          {columns.map((col, index) => {
            return <th key={index + col}>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {staffs.map((row, index) => {
          return (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/staff/${row.id}/detail`);
              }}
            >
              <td>{index + 1}</td>
              <td>{row.code}</td>
              <td style={{ color: "#007bff" }}>{row.fullName.toUpperCase()}</td>
              <td>
                <img
                  alt={row.fullName}
                  style={{ width: "40px", height: "40px" }}
                  src={
                    row.image ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                  }
                />
              </td>
              <td>{row.phone}</td>

              <td>
                {row.roles?.map((role: number, index: number) => {
                  if (index > 0) {
                    return " - " + convertRole(role);
                  }
                  return convertRole(role);
                })}
              </td>
              <td style={{ width: 100 }}>
                <MyBadge
                  content={convertStatusStaff(row.status)}
                  color={row.status === 1 ? "primary" : "danger"}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
