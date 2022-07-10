import React, { useState } from "react";
import "./style.css";
interface LimitProps {
  onChange: (value: string) => void;
}
function Limit(props: LimitProps) {
  const [optionValue, setOptionValue] = useState<string>("5");
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOptionValue(value);
    props.onChange(value);
  };
  return (
    <div className="limit d-flex">
      <p className="mb-0 mr-3 " style={{ marginTop: 3 }}>
        Hiển thị
      </p>
      <select
        value={optionValue}
        className="form-select form-select-sm"
        style={{ width: "11%" }}
        aria-label=".form-select-lg example"
        onChange={handleOnChange}
      >
        <option selected>5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <p className="mb-0 ml-3" style={{ marginTop: 3 }}>
        kết quả
      </p>
    </div>
  );
}

export default Limit;
