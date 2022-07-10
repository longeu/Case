import baseApi from "api/baseApi";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AddUpdateForm } from "./Components/Form/Form";
import { initialStaff } from "./Initial";

function UpdateAndCreateStaff() {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [staff, setStaff] = useState(initialStaff);
  useEffect(() => {
    const getStaff = async () => {
      try {
        if (id) {
          let res = await baseApi.getById("accounts", Number.parseInt(id));

          setStaff({
            ...res.data,
            birth: new Date(res.data.birth),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, []);
  console.log(staff);
  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
            <div>
              <h1>Thêm nhân viên</h1>
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
                form="staff-form"
                className={
                  !id ? "btn btn-primary ml-2" : "btn btn-warning ml-2"
                }
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
                  <AddUpdateForm staff={staff} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateAndCreateStaff;
