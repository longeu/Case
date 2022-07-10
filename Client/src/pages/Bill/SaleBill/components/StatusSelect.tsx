import React from "react";
import Select from "react-select";
import { SelectOption } from "../interface/typesSaleBill";

interface StatusSelectProps {
  options: SelectOption[];
  value?: number;
  onChange: (value: any) => void;
}
function StatusSelect(props: StatusSelectProps) {
  const handleOnChange = (e: any) => {
    props.onChange(e.value);
  };
  return (
    <Select
      value={props.options.filter((option) => option.value === props.value)}
      placeholder="Trạng thái"
      options={props.options}
      onChange={handleOnChange}
      name="status"
    />
  );
}

export default StatusSelect;
