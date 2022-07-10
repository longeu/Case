import { PurchaseOrderDetailInterface } from "./import-goods-detail.interface";

export default interface PurchaseOrderInterface {
    id: number;
    createdAt: string;
    updatedAt: string;
    code: string;
    accountId: number;
    accountName: string;
    totalPrice: number;
    totalQuantity: number;
    status: number;
    discount?: number;
    price: number;
    supplierId: number;
    supplierName: string;
    description: string;
    purchaseOrderDetails: PurchaseOrderDetailInterface[];
}