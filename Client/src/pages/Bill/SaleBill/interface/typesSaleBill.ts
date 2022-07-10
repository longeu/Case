import { customerType } from "interfaces/customerType.interface";
import { ProductDetailRequest } from "pages/Product/types";

export interface Params {
  total?: number;
  page?: number;
  search?: string;
  size?: string;
  sort?: string;
  sortType?: string;
}

export interface SelectOption {
  value: number;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

export const orderStatusOptions: SelectOption[] = [
  {
    value: 0,
    label: "Hàng trả",
  },
  {
    value: 1,
    label: "Hoàn thành",
  },
];

export const orderDetailStatusOptions: SelectOption[] = [
  {
    value: 1,
    label: "Hoàn thành",
  },
  {
    value: 0,
    label: "Hàng trả",
  },
];

export interface InputProps {
  name: string;
  isInputValid: boolean;
  errorMessage: string;
}

export interface OrderRequest {
  totalPrice: number;
  code?: string;
  totalQuantity: number;
  accountId: number;
  accountName: String;
  money: number;
  note: string;
  status: number;
  discount: number;
  totalDiscount: number;
  createdAt?: Date;
  updatedAt?: Date;
  orderDetails: OrderDetailRequest[];
  customer: customerType;
  customerPay: number;
  accountPhone?: string;
}

export interface OrderDetailRequest {
  id?: number;
  price: number;
  quantity: number;
  discount: number;
  productDetail: ProductDetailRequest;
}
