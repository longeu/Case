import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import baseApi from "api/baseApi";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginType } from "interfaces/loginType.interface";
import { login } from "reducers/userSlice";
import { useState } from "react";
function LoginLayout() {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const schema = yup
    .object({
      username: yup.string().required("Tài khoản không được để trống !"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(8, "Mật khẩu tối thiểu 8 kí tự !"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: loginType) => {
    const url = "accounts/login";
    try {
      const response = await baseApi.post(url, data);
      const action = login(response.data);
      dispatch(action);
      history.push("/");
    } catch (error) {
      console.log(error);
      setMessage("Tài khoản hoặc mật khẩu không chính xác !");
    }
  };
  return (
    <div className="container mt-5 ">
      <div className="row justify-content-md-center">
        <div className="col-6">
          <div>
            <div className="card-body login-card-body">
              <h2 className="login-box-msg">Đăng nhập</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
                <div className="form-group">
                  <input
                    type="text"
                    {...register("username")}
                    className={
                      errors.username || message
                        ? "form-control is-invalid"
                        : "form-control "
                    }
                    placeholder="Tài khoản"
                  />

                  <p style={{ color: "red" }}>{errors.username?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    {...register("password")}
                    className={
                      errors.password || message
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    placeholder="Mật khẩu"
                  />
                  <p style={{ color: "red" }}>{errors.password?.message}</p>
                </div>
                <div className="row">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
