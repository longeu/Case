export default interface ProductDetail {
    length: number;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    productId?: number;
    productName?: string;
    size?: string;
    color?: string;
    code?: string;
    barCode?: string;
    image?: string;
    status?: number;
    price?: number;
    quantity: number;
    quantitySell?: number;
    discount?: number;
}