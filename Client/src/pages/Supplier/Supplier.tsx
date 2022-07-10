import { SupplierInterface } from "interfaces/supplier.interface";
import React, { ReactElement } from "react";
import baseApi from "../../api/baseApi"
interface Props {
  supplier: SupplierInterface;
  onDelete: (id: number) => void;
}

export default function Supplier({ onDelete }: Props): ReactElement {
  const [isEditing, setIsEditing] = React.useState(false);
  const [supplier, setSupplier] = React.useState<SupplierInterface>();
  return (
    <div>
      <div id="supplier-name">
        <span>Nhà cung cấp</span>
        <input type="text" />
      </div>
      <div id="supplier-detail">
        <span>Thông tin nhà cung cấp</span>
        <div className="content row">
          <div className="col-md-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Website"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Người liên hệ"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại người liên hệ"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email người liên hệ"
              />
            </div>
          </div>
        </div>
        <div className="address">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Địa chỉ" />
          </div>
        </div>
      </div>
      <div id="supplier-description">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor=""></label>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="Text"
              ></textarea>
              <small id="helpId" className="text-muted">
                Help text
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
