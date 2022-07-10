import { customerType } from "interfaces/customerType.interface";
import { optionType } from "types";
import { FilterCustomer } from "./interface/FilterCustomer.interface";
import moment from "moment";

export const optionSelectGender: optionType[] = [
  { value: 2, label: "Tất Cả(Giới tính)" },
  { value: 1, label: "Nam" },
  { value: 0, label: "Nữ" },
];

export const initialCustomer: customerType = {
  gender: 1,
  phone: "",
  birth: new Date("1999-04-08"),
  name: "",
  address: "",
  email: "",
};

export const initialfilter: FilterCustomer = {
  page: 1,
  size: 5,
  search: "",
  order: "",
  sort: "",
  fromDate: "2000-01-01",
  toDate: moment(new Date()).format("yyyy-MM-DD"),
};
