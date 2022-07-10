import { staffType } from "interfaces/statffType.interface";
import moment from "moment";
import { optionType } from "types";
import { FilterStaff } from "./interface/FilterStaff.interface";

export const optionsGender: optionType[] = [
  { value: 1, label: "Nam" },
  { value: 0, label: "Nữ" },
];
export const optionSelectStatus: optionType[] = [
  { value: 1, label: "Đang làm" },
  { value: 0, label: "Đã nghỉ" },
];
export const optionRole: optionType[] = [
  { value: 1, label: "Quản lý" },
  { value: 2, label: "Nhân viên bán hàng" },
  { value: 3, label: "Nhân viên kho" },
  { value: 4, label: "Nhân viên chăm sóc khách hàng" },
];
export const initialStaff: staffType = {
  gender: 1,
  status: 1,
  phone: "",
  fullName: "",
  roles: [2],
  image: "",
  birth: new Date("2000-01-01"),
  username: "",
  password: "",
  address: "",
  addressDetail: "",
};

export const initialfilter: FilterStaff = {
  page: 1,
  size: 5,
  status: 2,
  role: 0,
  search: "",
  order: "",
  sort: "id",
  fromDate: "2000-01-01",
  toDate: moment(new Date()).format("yyyy-MM-DD"),
};
