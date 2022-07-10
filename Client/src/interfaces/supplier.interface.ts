export interface SupplierInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  website: string;
  debt: number;
  taxCode: string;
  bankAccount: string;
  bankName: string;
  personInCharge: string;
  personInChargePhone: string;
  personInChargeEmail: string;
  description: string;
  status: number;
}
