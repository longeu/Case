import { SupplierInterface } from "interfaces/supplier.interface";
import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";

interface Props {
  supplier: SupplierInterface;
  onDelete: (id: number) => void;
  index: number;
  onUpdateStatus: (id: number, newStatus: number, status: number) => void;
}

export default function Item({ supplier, index }: Props): ReactElement {
  const history = useHistory();
  const [newStatus, setNewStatus] = React.useState<number>(supplier.status);
  React.useEffect(() => {
    setNewStatus(supplier.status);
  }, [supplier.status]);
  return (
    <tr
      style={{ textAlign: "left", cursor: "pointer" }}
      onClick={() => {
        history.push(`/suppliers/${supplier.id}/detail`);
      }}
    >
      <td>{index + 1}</td>
      <td>{supplier.code}</td>
      <td style={{ color: "#007bff" }}>{supplier.name}</td>
      <td>
        {supplier.status === 0 ? (
          <span className="badge badge-danger">Ngừng Giao dịch</span>
        ) : (
          <span className="badge badge-primary">Đang giao dịch</span>
        )}
      </td>
      <td>{supplier.email}</td>
      <td>{supplier.website || "chưa có website"}</td>
      <td>{supplier.phone}</td>
      <td>{supplier.personInCharge}</td>
    </tr>
  );
}
