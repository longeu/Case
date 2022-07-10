
export interface customerType {
  id?: number;
  code?: string;
  name: string;
  phone: string;
  birth: Date;
  address?: any;
  addressDetail?: string;
  email: string;
  gender?: any;
  createdAt?: Date;
  updatedAt?: Date;
  totalQuantity?: number;

  totalOrders?: number;

  totalPrice?: number;
}