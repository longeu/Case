import { customerType } from "./customerType.interface";
import orderDetail from "./orderDetail.interface";

export default interface orderType {
  orderDetails: orderDetail[] | any;
  customer?: customerType;
  totalPrice: number;
  totalDiscount: number;
  totalQuantity: number;
  discount: number;
  money: number;
  note?: string;
  payment?: string;
  customerPay: number;
  accountId?: number;
  code: String;
}
