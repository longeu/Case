import { roleType } from "./roleType.interface";

export interface staffType {
  id?: number;
  code?: string;
  username: string;
  fullName: string;
  image: string;
  password: string;
  phone: string;
  birth: Date;
  roles: number[] | string[] | any;
  address?: any;
  addressDetail: string;
  gender?: any;
  status?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
