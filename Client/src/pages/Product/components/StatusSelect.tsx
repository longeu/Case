import React from "react";
import Select from "react-select";
import { SelectOption } from "../types";

interface StatusSelectProps {
  options: SelectOption[];
  value?: number;
  onChange: (value: any) => void;
  className?: string;
}
function StatusSelect(props: StatusSelectProps) {
  return (
    <Select
      className={props.className && props.className}
      value={props.options.filter((option) => option.value === props.value)}
      placeholder="Trạng thái"
      options={props.options}
      onChange={(e: any) => {
        if (e) {
          props.onChange(e.value);
        } else {
          props.onChange(undefined);
        }
      }}
      name="status"
      isClearable={true}
    />
  );
}

export default StatusSelect;
