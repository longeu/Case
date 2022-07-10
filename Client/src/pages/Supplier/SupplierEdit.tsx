import { SupplierInterface } from "interfaces/supplier.interface";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { setShow } from "reducers/toastSlice";
import { formatter } from "types";
import baseApi from "../../api/baseApi";

interface Props {
  supplier: SupplierInterface;
}

export default function SupplierEdit({}: Props): ReactElement {
  const id: any = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [supplier, setSupplier] = React.useState<SupplierInterface>(
    {} as SupplierInterface
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    reValidateMode: "onBlur",
    defaultValues: {
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      website: supplier.website,
      personInCharge: supplier.personInCharge,
      address: supplier.address,
      addressDetail: supplier.addressDetail,
      description: supplier.description,
      status: supplier.status,
      personInChargePhone: supplier.personInChargePhone,
      personInChargeEmail: supplier.personInChargeEmail,
      taxCode: supplier.taxCode,
    },
    shouldFocusError: false,
  });
  const [errorsResult, setErrorsResult] = React.useState({
    email: false,
    phone: false,
    name: false,
  } as any);
  const [address1, setAddress1] = React.useState({
    province: {
      value: 0,
      label: "",
    },
    district: {
      value: 0,
      label: "",
    },
    ward: {
      value: 0,
      label: "",
    },
  } as any);
  const [totalPurchaseOrder, setTotalPurchaseOrder] = React.useState({} as any);
  const getSupplier = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/suppliers/${id.id}`
      );
      const data = await response.json();

      const total = await baseApi.getById("import-goods/total-purchase", id.id);
      setTotalPurchaseOrder(total.data);
      if (!data.address || data.address === "") {
        setSupplier(data);
      } else {
        setSupplier({
          ...data,
          address: JSON.parse(data.address),
        });

        console.log(JSON.parse(data.address));
        setAddress1(JSON.parse(data.address));
        await getProvinces();
        await getDistricts(JSON.parse(data.address).province);
        const response1 = await fetch(
          `https://provinces.open-api.vn/api/p/${
            JSON.parse(data.address).province.value
          }?depth=3`
        );
        const data1 = await response1.json();
        console.log(data1);
        await data1.districts.forEach((item: any) => {
          if (item.code === JSON.parse(data.address).district.value) {
            console.log(item);
            let newWards: any = [];
            item.wards.forEach((ward: any) => {
              newWards.push({
                ...ward,
                value: ward.code,
                label: ward.name,
              });
            });
            setWards(newWards);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [districts, setDistricts] = React.useState([] as any);
  const [provinces, setProvinces] = React.useState([] as any);
  const [wards, setWards] = React.useState([] as any);
  const getProvinces = async () => {
    try {
      const response = await fetch(
        ` https://provinces.open-api.vn/api/?depth=3`
      );
      const data = await response.json();
      let newProvinces: any = [];
      data.forEach((element: any) => {
        newProvinces.push({
          ...element,
          value: element.code,
          label: element.name,
        });
      });
      setProvinces(newProvinces);
    } catch (err) {
      console.log(err);
    }
  };
  const getDistricts = async (provinceCode: any) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode.value}?depth=3`
      );
      const data = await response.json();
      console.log(data);
      let newDistricts: any = [];
      data.districts.forEach((element: any) => {
        newDistricts.push({
          ...element,
          value: element.code,
          label: element.name,
        });
      });
      setDistricts(newDistricts);
    } catch (err) {
      console.log(err);
    }
  };
  const getWards = async (districtCode: any) => {
    await districts.forEach((element: any) => {
      if (element.value === districtCode.value) {
        let newWards: any = [];
        element.wards.forEach((ward: any) => {
          newWards.push({
            ...ward,
            value: ward.code,
            label: ward.name,
          });
        });
        setWards(newWards);
      }
    });
  };

  const [address, setAddress] = React.useState({} as any);
  React.useEffect(() => {
    console.log(id);
    if (id.id === undefined) {
      setSupplier({} as SupplierInterface);
    } else {
      getSupplier();
    }

    getProvinces();
    return () => {};
  }, [id]);

  const onHandleChange = (e: any) => {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setSupplier({ ...supplier, [name]: value });
  };

  const onSubmit = async () => {
    if (id.id !== undefined) {
      console.log("update");
      setSupplier({ ...supplier, id: id });
      const response = await baseApi.put(`suppliers`, {
        ...supplier,
        id: id.id,
        address: JSON.stringify(address1),
      });
      if (response.status === 200) {
        history.push("/suppliers");
        const action = setShow({
          show: true,
          content: "Đã lưu thông tin nhà cung cấp",
          type: "success",
        });
        dispatch(action);
      } else {
        const action = setShow({
          show: true,
          content: "Đã lưu thông tin nhà cung cấp thất bại !",
          type: "error",
        });
        dispatch(action);
      }
    } else {
      const response = await baseApi.post(`suppliers`, {
        ...supplier,
        address: JSON.stringify(address1),
      });
      console.log(response);
      if (response.status === 200) {
        const action = setShow({
          show: true,
          content: "Đã lưu thông tin nhà cung cấp",
          type: "success",
        });
        dispatch(action);
        history.push("/suppliers");
      } else {
        const action = setShow({
          show: true,
          content: "Đã lưu thông tin nhà cung cấp thất bại !",
          type: "error",
        });
        dispatch(action);
      }
    }
  };
  console.log(supplier);
  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Thêm nhà cung cấp</h1>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                className="btn btn-default"
                onClick={() => {
                  window.history.back();
                }}
              >
                Quay lại
              </button>
            </div>
            <div>
              <button
                type="submit"
                form="form-supplier"
                className="btn btn-primary ml-2"
                // disabled={!(progressImage === 0 || progressImage === 100)}
                style={{ cursor: "pointer" }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="row"
                    id="form-supplier"
                  >
                    <div className="col-md-8">
                      <div
                        id="supplier-name form-group card"
                        style={{
                          backgroundColor: "#fff",
                          padding: 20,
                          marginBottom: 20,
                        }}
                      >
                        <div className="mb-3">
                          <label className="">Thông tin chính</label>
                        </div>
                        <div className="mb-3">
                          <span>
                            Nhà cung cấp{" "}
                            <sup className="compulsory-field">*</sup>
                          </span>
                          <input
                            type="text"
                            className={
                              errors.name
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder="Tên nhà cung cấp"
                            value={supplier.name || ""}
                            {...register("name", {
                              value: supplier.name || "",
                              required: true,
                              minLength: 3,
                              maxLength: 50,
                              onChange: onHandleChange,
                              onBlur: () => {
                                setTimeout(() => {
                                  if (errors.name) {
                                    setErrorsResult({
                                      name: false,
                                    });
                                  }
                                }, 200);
                              },
                            })}
                            {...setValue("name", supplier.name)}
                            onFocus={() => {
                              setErrorsResult({ name: true });
                            }}
                          />
                          {errorsResult.name !== true && (
                            <>
                              {errors?.name?.type === "required" && (
                                <span className="text-danger">
                                  Không được để trống
                                </span>
                              )}
                              {errors?.name?.type === "minLength" && (
                                <span className="text-danger">
                                  Tối thiểu 3 ký tự
                                </span>
                              )}
                              {errors?.name?.type === "maxLength" && (
                                <span className="text-danger">
                                  Tối đa 50 ký tự
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="mb-3 row">
                          <div className="col-md-6">
                            <span>
                              Trạng thái giao dịch
                              <sup className="compulsory-field">*</sup>
                            </span>
                            <Select
                              className="col-md-12 p-0"
                              options={[
                                { value: 0, label: "Ngừng giao dịch" },
                                { value: 1, label: "Đang giao dịch" },
                              ]}
                              value={{
                                value: supplier.status || 0,
                                label:
                                  supplier.status === 1
                                    ? "Đang giao dịch"
                                    : "Ngừng giao dịch",
                              }}
                              placeholder="Trạng thái giao dịch"
                              onChange={(e: any) => {
                                setSupplier({ ...supplier, status: e.value });
                              }}
                            />
                          </div>
                        </div>
                        <div className="row" style={{ padding: 0, margin: 0 }}>
                          <div className="col-6 pl-0 ">
                            <div className=" form-group">
                              <span>
                                Số điện thoại{" "}
                                <sup className="compulsory-field">*</sup>
                              </span>
                              <input
                                type="text"
                                className={
                                  errors.phone
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                placeholder="Số điện thoại"
                                value={supplier.phone}
                                pattern="{0-9}*"
                                {...register("phone", {
                                  required: true,
                                  minLength: 10,
                                  value: supplier?.phone,
                                  onChange: onHandleChange,
                                  onBlur: () => {
                                    setTimeout(() => {
                                      setErrorsResult({
                                        phone: false,
                                      });
                                    }, 200);
                                  },
                                  pattern:
                                    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                })}
                                {...setValue("phone", supplier.phone)}
                                onFocus={() => {
                                  setErrorsResult({ phone: true });
                                }}
                              />
                              {errorsResult.phone !== true && (
                                <>
                                  {" "}
                                  {errors?.phone?.type === "required" && (
                                    <span className="text-danger">
                                      Không được để trống
                                    </span>
                                  )}
                                  {errors?.phone?.type === "minLength" && (
                                    <span className="text-danger">
                                      Tối thiểu 10 ký tự
                                    </span>
                                  )}
                                  {errors?.phone?.type === "pattern" && (
                                    <span className="text-danger">
                                      Số điện thoại không hợp lệ
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="col-6 pr-0">
                            <div className="form-group">
                              <span>Email</span>
                              <input
                                type="text"
                                className={
                                  errors.email
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                placeholder="Email"
                                value={supplier.email || ""}
                                {...register("email", {
                                  value: supplier?.email || "",
                                  minLength: 3,
                                  maxLength: 50,
                                  onChange: onHandleChange,
                                  onBlur: () => {
                                    setTimeout(() => {
                                      setErrorsResult({ email: false });
                                    }, 200);
                                  },
                                  pattern:
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
                                onFocus={() => {
                                  setErrorsResult({ email: true });
                                }}
                                {...setValue("email", supplier.email)}
                              />
                              {errorsResult.email !== true && (
                                <>
                                  {errors?.email?.type === "minLength" && (
                                    <span className="text-danger">
                                      Tối thiểu 3 ký tự
                                    </span>
                                  )}
                                  {errors?.email?.type === "maxLength" && (
                                    <span className="text-danger">
                                      Tối đa 50 ký tự
                                    </span>
                                  )}
                                  {errors?.email?.type === "pattern" && (
                                    <span className="text-danger">
                                      Email không hợp lệ
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="supplier-detail"
                        style={{
                          backgroundColor: "#fff",
                          padding: 20,
                          marginBottom: 20,
                        }}
                      >
                        <div className="mb-3">
                          <label className="">Thông tin nhà cung cấp</label>
                        </div>
                        <div className="content row">
                          <div className="col-md-12 mb-3 row">
                            <div className=" col-md-6">
                              <div className="form-group">
                                <span>Website</span>
                                <input
                                  type="text"
                                  className={
                                    errors.website
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Website"
                                  value={supplier.website}
                                  {...register("website", {
                                    required: false,
                                    minLength: 3,
                                    maxLength: 50,
                                    value: supplier?.website || "",
                                    onChange: onHandleChange,
                                    onBlur: () => {
                                      setTimeout(() => {
                                        setErrorsResult({ website: false });
                                      }, 200);
                                    },
                                    pattern:
                                      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                                  })}
                                  onFocus={() => {
                                    setErrorsResult({ website: true });
                                  }}
                                  {...setValue("website", supplier.website)}
                                />
                                {errorsResult.website !== true && (
                                  <>
                                    {errors?.website?.type === "required" && (
                                      <span className="text-danger">
                                        Không được để trống
                                      </span>
                                    )}
                                    {errors?.website?.type === "minLength" && (
                                      <span className="text-danger">
                                        Tối thiểu 3 ký tự
                                      </span>
                                    )}
                                    {errors?.website?.type === "maxLength" && (
                                      <span className="text-danger">
                                        Tối đa 50 ký tự
                                      </span>
                                    )}
                                    {errors?.website?.type === "pattern" && (
                                      <span className="text-danger">
                                        Website không hợp lệ
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <span>Người liên hệ</span>
                                <input
                                  type="text"
                                  className={
                                    errors.personInCharge
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Người liên hệ"
                                  value={supplier.personInCharge}
                                  {...register("personInCharge", {
                                    minLength: 3,
                                    maxLength: 50,
                                    value: supplier?.personInCharge || "",
                                    onChange: onHandleChange,
                                    onBlur: () => {
                                      setTimeout(() => {
                                        setErrorsResult({
                                          personInCharge: false,
                                        });
                                      }, 200);
                                    },
                                  })}
                                  {...setValue(
                                    "personInCharge",
                                    supplier.personInCharge
                                  )}
                                  onFocus={() => {
                                    setErrorsResult({ personInCharge: true });
                                  }}
                                />
                                {errorsResult.personInCharge !== true && (
                                  <>
                                    {errors?.personInCharge?.type ===
                                      "minLength" && (
                                      <span className="text-danger">
                                        Tối thiểu 3 ký tự
                                      </span>
                                    )}
                                    {errors?.personInCharge?.type ===
                                      "maxLength" && (
                                      <span className="text-danger">
                                        Tối đa 50 ký tự
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3 row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <span>Số điện thoại người liên hệ</span>
                                <input
                                  type="text"
                                  className={
                                    errors.personInChargePhone
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Số điện thoại người liên hệ"
                                  value={supplier.personInChargePhone}
                                  {...register("personInChargePhone", {
                                    minLength: 10,
                                    value: supplier?.personInChargePhone || "",
                                    onChange: onHandleChange,
                                    pattern:
                                      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                    onBlur: () => {
                                      setTimeout(() => {
                                        setErrorsResult({
                                          personInChargePhone: false,
                                        });
                                      }, 200);
                                    },
                                  })}
                                  onFocus={() => {
                                    setErrorsResult({
                                      personInChargePhone: true,
                                    });
                                  }}
                                  {...setValue(
                                    "personInChargePhone",
                                    supplier.personInChargePhone
                                  )}
                                />
                                {errorsResult.personInChargePhone !== true && (
                                  <>
                                    {errors.personInChargePhone?.type ===
                                      "minLength" && (
                                      <span className="text-danger">
                                        Tối thiểu 10 ký tự
                                      </span>
                                    )}
                                    {errors.personInChargePhone?.type ===
                                      "pattern" && (
                                      <span className="text-danger">
                                        Số điện thoại không hợp lệ
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="form-group">
                                <span>Email người liên hệ</span>
                                <input
                                  type="text"
                                  className={
                                    errors.personInChargeEmail
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Email người liên hệ"
                                  value={supplier.personInChargeEmail || ""}
                                  {...register("personInChargeEmail", {
                                    minLength: 3,
                                    maxLength: 50,
                                    value: supplier?.personInChargeEmail || "",
                                    onChange: onHandleChange,
                                    pattern:
                                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                    onBlur: () => {
                                      setTimeout(() => {
                                        setErrorsResult({
                                          personInChargeEmail: false,
                                        });
                                      }, 200);
                                    },
                                  })}
                                  onFocus={() => {
                                    setErrorsResult({
                                      personInChargeEmail: true,
                                    });
                                  }}
                                  {...setValue(
                                    "personInChargeEmail",
                                    supplier.personInChargeEmail
                                  )}
                                />
                                {errorsResult.personInChargeEmail !== true && (
                                  <>
                                    {errors?.personInChargeEmail?.type ===
                                      "minLength" && (
                                      <span className="text-danger">
                                        Tối thiểu 3 ký tự
                                      </span>
                                    )}
                                    {errors?.personInChargeEmail?.type ===
                                      "maxLength" && (
                                      <span className="text-danger">
                                        Tối đa 50 ký tự
                                      </span>
                                    )}
                                    {errors?.personInChargeEmail?.type ===
                                      "pattern" && (
                                      <span className="text-danger">
                                        Email không hợp lệ
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="address">
                          <div className="row">
                            <label className="col-md-12 mb-3">Địa chỉ</label>
                            <div className="col-md-6">
                              <span>Chọn tỉnh thành</span>
                              <Select
                                className="col-md-12 p-0"
                                options={provinces}
                                value={address1.province}
                                defaultValue={address1.province}
                                placeholder="Chọn tỉnh thành"
                                onChange={(e: any) => {
                                  setDistricts({});
                                  setWards({});
                                  setAddress({
                                    province: {
                                      value: e.value,
                                      label: e.label,
                                    },
                                  });
                                  setAddress1({
                                    province: {
                                      value: e.value,
                                      label: e.label,
                                    },
                                    district: {
                                      value: "",
                                      label: "",
                                    },
                                    ward: {
                                      value: "",
                                      label: "",
                                    },
                                  });
                                  getDistricts(e);
                                }}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <span>Chọn quận huyện</span>

                              <Select
                                className="col-md-12 p-0"
                                options={districts}
                                value={address1.district}
                                defaultValue={address1.district}
                                placeholder="Chọn quận huyện"
                                onChange={(e: any) => {
                                  setWards({});
                                  setAddress({
                                    ...address,
                                    district: {
                                      value: e.value,
                                      label: e.label,
                                    },
                                  });
                                  setAddress1({
                                    ...address1,
                                    district: {
                                      value: e.value,
                                      label: e.label,
                                    },
                                  });
                                  getWards(e);
                                  console.log(e);
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <span>Chọn phường xã</span>
                              <Select
                                className="col-md-12 p-0"
                                options={wards}
                                value={address1.ward}
                                defaultValue={address1.ward}
                                placeholder="Chọn phường xã"
                                onChange={(e: any) => {
                                  setAddress({
                                    ...address,
                                    ward: {
                                      value: e.value,
                                      label: e.label,
                                    },
                                  });
                                  setAddress1({
                                    ...address1,
                                    ward: {
                                      value: e.value,
                                      label: e.label,
                                    },
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                              <span>
                                Địa chỉ chi tiết{" "}
                                <sup className="compulsory-field">*</sup>
                              </span>
                              <input
                                type="text"
                                className={
                                  errors.addressDetail
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                placeholder="Địa chỉ"
                                value={supplier.addressDetail}
                                {...register("addressDetail", {
                                  required: true,
                                  minLength: 3,
                                  maxLength: 200,
                                  value: supplier?.addressDetail || "",
                                  onChange: onHandleChange,
                                  onBlur: () => {
                                    setTimeout(() => {
                                      setErrorsResult({ addressDetail: false });
                                    }, 200);
                                  },
                                })}
                                onFocus={() => {
                                  setErrorsResult({ addressDetail: true });
                                }}
                                {...setValue(
                                  "addressDetail",
                                  supplier.addressDetail
                                )}
                              />
                              {errorsResult.addressDetail !== true && (
                                <>
                                  {errors?.addressDetail?.type ===
                                    "required" && (
                                    <span className="text-danger">
                                      Không được để trống
                                    </span>
                                  )}
                                  {errors?.addressDetail?.type ===
                                    "minLength" && (
                                    <span className="text-danger">
                                      Tối thiểu 3 ký tự
                                    </span>
                                  )}
                                  {errors?.addressDetail?.type ===
                                    "maxLength" && (
                                    <span className="text-danger">
                                      Tối đa 200 ký tự
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        id="supplier-description"
                        className="card rounded-lg"
                        style={{ padding: 20, marginRight: 20 }}
                      >
                        <label>Thông tin bổ sung</label>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <span>Mô tả</span>
                              <textarea
                                className={
                                  errors.description
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                id=""
                                cols={50}
                                rows={5}
                                placeholder="Mô tả"
                                value={supplier.description || ""}
                                {...register("description", {
                                  maxLength: 500,
                                  value: supplier?.description || "",
                                  onChange: onHandleChange,
                                  onBlur: () => {
                                    setTimeout(() => {
                                      setErrorsResult({ description: false });
                                    }, 200);
                                  },
                                })}
                                onFocus={() => {
                                  setErrorsResult({ description: true });
                                }}
                                {...setValue(
                                  "description",
                                  supplier.description
                                )}
                              ></textarea>
                              <br />
                              {errorsResult.description !== true && (
                                <>
                                  {errors?.description?.type ===
                                    "maxLength" && (
                                    <span className="text-danger">
                                      Tối đa 500 ký tự
                                    </span>
                                  )}
                                </>
                              )}
                              <br />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-sm-7">
                                <label>Tổng số đơn hàng </label>
                              </div>
                              <div className="col-sm-5 text-success">
                                :{" "}
                                <label style={{ float: "right" }}>
                                  {totalPurchaseOrder[0] || 0} đơn
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-7">
                                <label>Tổng số tiền hàng </label>
                              </div>
                              <div className="col-sm-5 ">
                                :
                                <label
                                  className="text-danger"
                                  style={{ float: "right" }}
                                >
                                  {formatter.format(totalPurchaseOrder[1] || 0)}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
