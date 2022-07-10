import React, { ChangeEvent } from "react";
interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

function DateTimePicker(props: DateTimePickerProps) {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    props.onChange(value);
  };
  return (
    <div className="input-group input-group-md ">
      <input
        className="form-control form-control-navbar border "
        type="date"
        onChange={handleOnChange}
        value={props.value}
      />
    </div>
  );
}

export default DateTimePicker;
