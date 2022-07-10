import * as yup from "yup";
const regxPhone = new RegExp("^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$");
export const schemaValidate = yup
  .object({
    username: yup.string().required("Tài khoản không được để trống !"),
    fullName: yup.string().required("Họ tên không được để trống !"),
    birth: yup.date(),
    gender: yup.number(),
    roles: yup.array(),

    phone: yup
      .string()
      .required("Số điện thoại không được để trống !")
      .matches(regxPhone, "Số điện thoại không đúng định dạng !"),
    addressDetail: yup.string().required("Địa chỉ không được để trống !"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống !")
      .min(8, "Mật khẩu tối thiểu 8 kí tự !"),
  })
  .required();
export const schemaValidateUpdate = yup
  .object({
    fullName: yup.string().required("Họ tên không được để trống !"),
    birth: yup.date(),
    gender: yup.number(),
    roles: yup.array(),

    phone: yup
      .string()
      .required("Số điện thoại không được để trống !")
      .matches(regxPhone, "Số điện thoại không đúng định dạng !"),
    addressDetail: yup.string().required("Địa chỉ không được để trống !"),
  })
  .required();
export const schemaValidateUpdateProfile = yup
  .object({
    fullName: yup.string().required("Họ tên không được để trống !"),
    birth: yup.date(),
    gender: yup.number(),
    phone: yup
      .string()
      .required("Số điện thoại không được để trống !")
      .matches(regxPhone, "Số điện thoại không đúng định dạng !"),
    addressDetail: yup.string().required("Địa chỉ không được để trống !"),
  })
  .required();
