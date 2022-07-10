import baseApi from "api/baseApi";
import { PurchaseOrderDetailInterface } from "interfaces/import-goods-detail.interface";
import ImportGoods from "interfaces/import-goods.interface";
import React, { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";

interface Props {}

export default function ImportGoodsDetail({}: Props): ReactElement {
  const path: any = useParams();
  const [importGoods, setImportGoods] = React.useState({} as ImportGoods);
  const [purchaseOrders, setPurchaseOrders] = React.useState<
    Array<PurchaseOrderDetailInterface>
  >([] as Array<PurchaseOrderDetailInterface>);
  const getPurchaseOrder = async () => {
    const response = await baseApi.getById("import-goods", path.id);
    setImportGoods(response.data);
    console.log(response.data.importGoodsDetails);
};
const getPurchaseOrderDetail = async () => {
    const response = await baseApi.getById("import-goods-details/find-by-import-goods-id", path.id);
    console.log(response);
    setPurchaseOrders(response.data.data);
  };
  React.useEffect(() => {
    getPurchaseOrder();
    getPurchaseOrderDetail();
  }, [path]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mã phiếu nhập: {importGoods.code}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Ngày nhập: {importGoods.updatedAt}
              </h6>
              <p className="card-text">
                Nhà cung cấp: {importGoods.supplierName}
              </p>
              <p className="card-text">Nhân viên: {importGoods.accountName}</p>
              <p className="card-text">Tổng tiền: {importGoods.totalPrice}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Chi tiết phiếu nhập</h5>
              <table className="table table-bordered table-hovers">
                <thead>
                  <tr>
                    <th scope="col">Mã sản phẩm</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Chiết khấu</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((item: any) => (
                    <tr key={item.id}>
                      <td>
                        <Link to={`/product/${item.productDetail.productId}`}>
                          {item.productDetail.code}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/product/${item.productDetail.productId}`}>
                          {item.productDetail.productName}
                        </Link>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.discount}</td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-8"></div>
      </div>
    </div>
  );
}
