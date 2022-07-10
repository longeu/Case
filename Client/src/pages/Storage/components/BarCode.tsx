import React from "react";
import { useBarcode } from "react-barcodes";
interface BarCodeProps {
  value: string;
}
function BarCode(props: BarCodeProps) {
  const { value } = props;
  const { inputRef } = useBarcode({
    value: value,
    options: {
      background: "#ffff",
    },
  });

  return <img ref={inputRef} />;
}

export default BarCode;
