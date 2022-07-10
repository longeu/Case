import { SupplierInterface } from "interfaces/supplier.interface";
import React, { ReactElement } from "react";

import styles from "../index.module.css";
interface Props {
  supplier: SupplierInterface;
  onSelectSupplier: (supplier: SupplierInterface) => void;
}

export default function Supplier({
  supplier,
  onSelectSupplier,
}: Props): ReactElement {
  return (
    <div
      className={[styles.supplier_response, "m-2 mt-3"].join(" ")}
      onClick={() => onSelectSupplier(supplier)}
      style={{ borderBottom: "1px solid" }}
    >
      <span className="m-1 ml-2">{supplier.name}</span>
      <span className="mt-1 ml-2" style={{ display: "block" }}>
        {supplier.phone}
      </span>
    </div>
  );
}
