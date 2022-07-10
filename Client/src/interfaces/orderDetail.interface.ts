import { ProductDetailRequest } from "pages/Product/types";

export default interface orderDetail {
  productDetailModel: ProductDetailRequest;
  quantity: number;
  price: number;
  status?: number;
  discount: number;
}
