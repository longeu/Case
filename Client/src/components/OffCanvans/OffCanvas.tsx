import DateTimePicker from "components/DateTime Picker/DateTimePicker";
import moment from "moment";

import React, { ChangeEvent, useState } from "react";
import { Offcanvas } from "react-bootstrap";

export interface DateProps {
  fromDate: string;
  toDate: string;
}

interface FilterOffcanvasProps {
  isShow: boolean;
  onClose: () => void;
  onSubmit: (value: DateProps) => void;
  dates: DateProps;
}

function OffCanvas(props: FilterOffcanvasProps) {
  const [dates, setDates] = useState(props.dates);

  return (
    <Offcanvas show={props.isShow} onHide={props.onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Bộ lọc khác</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <label htmlFor="name" className="form-label">
                Từ ngày:
              </label>
              <div className="input-group input-group-md ">
                <input
                  className="form-control form-control-navbar border "
                  type="date"
                  value={moment(new Date(dates.fromDate)).format("yyyy-MM-DD")}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setDates({ ...dates, fromDate: value });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-12 mb-3">
              <label htmlFor="name" className="form-label">
                Đến ngày:
              </label>
              <input
                className="form-control form-control-navbar border "
                type="date"
                value={moment(new Date(dates.toDate)).format("yyyy-MM-DD")}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  setDates({ ...dates, toDate: value });
                }}
              />
            </div>
            <div className="col-lg-12 text-left">
              <button
                className="btn btn-primary w-100"
                onClick={() => props.onSubmit(dates)}
              >
                Lọc
              </button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffCanvas;
