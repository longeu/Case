import DateTimePicker from "components/DateTime Picker/DateTimePicker";
import React, { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";

export interface DateProps {
    from: string;
    to: string;
  }
  
interface FilterOffcanvasProps {
  values: DateProps;
  isShow: boolean;
  onClose: () => void;
  onSubmit: (value: DateProps) => void;
}

function Off(props: FilterOffcanvasProps) {
  const [dates, setDates] = useState({} as DateProps);

  useEffect(() => {
    setDates(props.values);
  }, [props]);

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
              <DateTimePicker
                value={dates.from}
                onChange={(value) => setDates({ ...dates, from: value })}
              />
            </div>

            <div className="col-lg-12 mb-3">
              <label htmlFor="name" className="form-label">
                Đến ngày:
              </label>
              <DateTimePicker
                value={dates.to}
                onChange={(value) => {
                  setDates({ ...dates, to: value });
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

export default Off;
