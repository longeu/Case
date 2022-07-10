import PurchaseOrderInterface from "interfaces/import-goods.interface";
import moment from "moment";
import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import { formatter } from "types";
interface Props {
  purchaseOrder: PurchaseOrderInterface;
  index: number;
}

export default function PurchaseOrder({
  purchaseOrder,
  index,
}: Props): ReactElement {
  const history = useHistory();
  return (
    <tr className="text-left">
      <td>{index + 1}</td>
      <td className="text-left">{purchaseOrder.code}</td>
      <td style={{ width: "200px" }} className="text-left">
        {purchaseOrder.totalQuantity}
      </td>
      <td className="text-left">
        {formatter.format(purchaseOrder.totalPrice)}
      </td>
      <td className="text-left">
        {" "}
        {moment(purchaseOrder.createdAt).format("DD-MM-YYYY  HH:mm")}
      </td>
      <td className="text-left">
        {" "}
        {moment(purchaseOrder.updatedAt).format("DD-MM-YYYY HH:mm")}
      </td>
      <td className="text-left">
        {purchaseOrder.status === 0 ? (
          <span className="badge badge-danger">Lên đơn</span>
        ) : (
          <span className="badge badge-primary">Hoàn thành</span>
        )}
      </td>
    </tr>
  );
}
