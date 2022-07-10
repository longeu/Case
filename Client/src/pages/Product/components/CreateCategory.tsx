import { yupResolver } from "@hookform/resolvers/yup";
import baseApi from "api/baseApi";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingSmall from "./LoadingSmall";
interface CreateCategorylProps {
  onCreate: () => void;
  isOpen: boolean;
  hideModal: () => void;
}

interface FormValues {
  name: string;
}
function CreateCategory(props: CreateCategorylProps) {
  const [category, setCategory] = useState<FormValues>({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required("Tên loại không được để chống"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);
    baseApi.post("categories", category).then((res) => {
      console.log(res);
      setIsLoading(false);
      props.hideModal();
      props.onCreate();
    });
    console.log(data);
  };

  return (
    <Modal size="lg" show={props.isOpen} onHide={props.hideModal}>
      <Modal.Header>
        <Modal.Title>Thêm mới loại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit(onSubmit)} id="creat_category">
              <div className="col-lg-12 ">
                <label htmlFor="name" className="form-label">
                  Tên loại
                  <span className="ml-1 text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={
                    errors.name ? "form-control is-invalid" : "form-control "
                  }
                  {...register("name", {
                    onChange: (e) => setCategory({ name: e.target.value }),
                  })}
                />
              </div>
              <p style={{ color: "red" }}>{errors.name?.message}</p>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={() => props.hideModal()}>
          Hủy
        </button>
        <button className="btn btn-primary" type="submit" form="creat_category">
          {isLoading ? <LoadingSmall /> : "Lưu"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCategory;
