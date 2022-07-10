import React, { RefObject, useRef } from "react";
interface SearchBoxProps {
  placeholder: string;
  onChange: (value: string) => void;
  searchBox: RefObject<HTMLInputElement>;
}
function SearchBox(props: SearchBoxProps) {
  const { onChange, placeholder, searchBox } = props;
  const typingTimeoutRef = useRef() as any;
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onChange(event.target.value.trim());
    }, 300);
  }

  return (
    <div className="input-group input-group-md ">
      <input
        className="form-control form-control-navbar border "
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        onChange={handleOnChange}
        ref={searchBox}
      />
    </div>
  );
}

export default SearchBox;
