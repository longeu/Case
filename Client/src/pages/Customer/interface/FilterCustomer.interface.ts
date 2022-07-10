export interface FilterCustomer {
  page: number | string;
  size: number | string;
  search: string;
  sort: string;
  order: string;
  gender?: number;
  birth?: number;
  fromDate: string;
  toDate: string;
}
