import ImportGoods from "interfaces/import-goods.interface";
import React, { ReactElement } from "react";
import moment from "moment";
import "moment/locale/vi";
import { Link, useHistory } from "react-router-dom";
import { formatter } from "types";

interface Props {
  importGoods: ImportGoods;
  onDelete: (id: number) => void;
  index: number;
}

export default function Item({
  importGoods,
  onDelete,
  index,
}: Props): ReactElement {
  const history = useHistory();
  return (
    <tr>
      <td
        style={{ textAlign: "left", cursor: "pointer" }}
        onClick={() => {
          history.push(`/bill/import/${importGoods.id}/update`);
        }}
      >
        {index + 1}
      </td>
      <td
        className="text-left"
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push(`/bill/import/${importGoods.id}/update`);
        }}
      >
        {importGoods.code}
      </td>
      <td
        className="text-left"
        style={{ textAlign: "left", cursor: "pointer" }}
        onClick={() => {
          history.push(`/bill/import/${importGoods.id}/update`);
        }}
      >
        {importGoods.totalQuantity}
      </td>
      <td
        style={{ textAlign: "left", cursor: "pointer" }}
        onClick={() => {
          history.push(`/bill/import/${importGoods.id}/update`);
        }}
      >
        {formatter.format(importGoods.totalPrice)}
      </td>
      <td>
        <Link to={`/suppliers/${importGoods.supplierId}/detail`}>
          {importGoods.supplierName}
        </Link>
      </td>
      <td
        style={{ textAlign: "left", cursor: "pointer" }}
        onClick={() => {
          history.push(`/bill/import/${importGoods.id}/update`);
        }}
      >
        {moment(importGoods.createdAt).format("l")}
      </td>
      <td
        style={{ textAlign: "left", cursor: "pointer" }}
        onClick={() => {
          history.push(`/bill/import/${importGoods.id}/update`);
        }}
      >
        {importGoods.status === 0 ? (
          <span className="badge badge-danger">Lên đơn</span>
        ) : (
          <span className="badge badge-primary">Hoàn thành</span>
        )}
      </td>
    </tr>
  );
}
