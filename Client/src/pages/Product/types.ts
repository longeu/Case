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

export const productStatusOptions: SelectOption[] = [
  {
    value: 1,
    label: "Đang bán",
  },
  {
    value: 2,
    label: "Ngừng bán",
  },
];

export const productDetailStatusOptions: SelectOption[] = [
  {
    value: 1,
    label: "Đang bán",
  },
  {
    value: 2,
    label: "Ngừng bán",
  },
];

export interface InputProps {
  name: string;
  isInputValid: boolean;
  errorMessage: string;
}

export interface ProductRequest {
  id: number;
  name: string;
  description?: string;
  categoryName?: string;
  categoryId?: number;
  image?: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
  productDetails: ProductDetailRequest[];
}

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  categoryName?: string;
  categoryId?: number;
  image?: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
  productDetails: ProductDetail[];
  isChecked?: boolean;
}

export interface ProductDetailRequest {
  id: number;
  productId: number;
  productName: string;
  size: string;
  color: string;
  code: string;
  barCode: string;
  price: number;
  priceSell: number;
  discountSell: number;
  discount: number;
  quantity: number;
  quantitySell: number;
  description: string;
  image: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
  isChecked?: boolean;
}

export interface ProductDetail {
  id: number;
  productId: number;
  productName: string;
  size: string;
  color: string;
  code: string;
  barCode: string;
  price: number;
  priceSell: number;
  discountSell: number;
  discount: number;
  quantity: number;
  description: string;
  image: string;
  status: number;
  isChecked?: boolean;
}

export interface DateProps {
  from?: string;
  to?: string;
}

export interface SortState {
  sort?: string;
  order?: string;
}

export interface Filter {
  page: number;
  size?: number;
  status?: number;
  search?: string;
  order?: string;
  sort?: string;
  from?: string;
  to?: string;
  categoryId?: number;
  image?: string;
}

export interface Metadata {
  page: number;
  size: number;
  total: number;
}
