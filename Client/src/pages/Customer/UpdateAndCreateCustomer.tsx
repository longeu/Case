import baseApi from "api/baseApi";
import { customerType } from "interfaces/customerType.interface";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AddUpdateForm } from "./Component/Form/Form";
import { initialCustomer } from "./Initial";

function UpdateAndCreateCustomer() {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [customer, setCustomer] = useState(initialCustomer);

  useEffect(() => {
    const getStaff = async () => {
      try {
        if (id) {
          let res = await baseApi.getById("customers", Number.parseInt(id));

          setCustomer({
            ...res.data,
            birth: new Date(res.data.birth),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, [id]);

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Thêm khách hàng</h1>
            </div>
            <div style={{ flex: "1" }}> </div>
            <div>
              <button
                className="btn btn-default"
                onClick={() => history.goBack()}
              >
                Quay lại
              </button>
            </div>
            <div>
              <button
                type="submit"
                form="customer-form"
                className={id ? "btn btn-warning ml-2" : "btn btn-primary ml-2"}
                // disabled={!(progressImage === 0 || progressImage === 100)}
                style={{ cursor: "pointer" }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="card-body">
        <div
          className="row"
          style={{ backgroundColor: "#fff", borderRadius: "5px" }}
        >
          <div className="col-sm-12">
            <AddUpdateForm customer={customer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAndCreateCustomer;
