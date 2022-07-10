import * as yup from "yup";

const regxPhone = new RegExp("^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$");
const regxEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const schema = yup
  .object({
    name: yup.string().required("Tài khoản không được để trống !"),
    phone: yup
      .string()
      .required("Số điện thoại không được để trống !")
      .matches(regxPhone, "Số điện thoại không đúng định dạng !"),
    email: yup
      .string()
      .required("Email không được để trống !")
      .matches(regxEmail, "Định dạng gmail không đúng"),
    addressDetail: yup.string().required("Địa chỉ không được để trống !"),
    birth: yup.date(),
    gender: yup.number(),
  })
  .required();
	