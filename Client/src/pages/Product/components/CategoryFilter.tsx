import baseApi from "api/baseApi";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SelectOption } from "../types";
interface CategorySelectProps {
  isCreate?: boolean;
  value?: number;
  onChange: (value: any) => void;
}
function CategorySelect(props: CategorySelectProps) {
  const [categories, setCategories] = useState<SelectOption[]>();
  //load categories
  useEffect(() => {
    handleLoadingCategories();
  }, [props.isCreate]);

  const handleLoadingCategories = async () => {
    try {
      const response = await baseApi.get("categories", {});

      const result: SelectOption[] = response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Select
      placeholder="Loại sản phẩm"
      // isMulti
      // className="basic-multi-select"
      // classNamePrefix="select"
      value={categories?.filter((option) => option.value === props.value)}
      name="category"
      options={categories}
      onChange={(e: any) => {
        if (e) {
          props.onChange(e.value);
        } else {
          props.onChange(undefined);
        }
      }}
      isClearable={true}
    />
  );
}

export default CategorySelect;
