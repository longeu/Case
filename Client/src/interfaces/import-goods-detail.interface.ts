import ProductDetail from "./product-detail.interface";

export interface PurchaseOrderDetailInterface {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    importGoodsId?: number;
    productDetailId?: number;
    quantity: number;
    price?: number;
    totalPrice?: number;
    discount?: number;
    productName?: string;
    productCode?: string;
    size?: string;
    color?: string;
    productDetail: ProductDetail;
}