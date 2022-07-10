import baseApi from "api/baseApi";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SelectOption } from "pages/Product/types";
interface AccountSelectProps {
  value?: number;
  onChange: (value: any) => void;
}
function AccountSelect(props: AccountSelectProps) {
  const [accounts, setAccounts] = useState<SelectOption[]>();
  const [defaultValue, setDefaultValue] = useState({} as SelectOption);
  //load categories
  useEffect(() => {
    handleLoadingAccounts();
  }, []);

  const handleLoadingAccounts = async () => {
    const response = await baseApi.get("accounts", {});
    console.log(response);
    const result: SelectOption[] = response.data.data.map((item: any) => {
      return {
        value: item.id,
        label: item.fullName,
      };
    });
    setAccounts(result);
    setDefaultValue(result[0]);
  };

  return (
    <Select
      placeholder="Nhân viên bán"
      // isMulti
      // className="basic-multi-select"
      // classNamePrefix="select"
      defaultValue={defaultValue}
      value={accounts?.filter((option) => option.value === props.value)}
      name="account"
      options={accounts}
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

export default AccountSelect;
