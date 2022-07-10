export interface FilterStaff {
  page: number | string;
  size: number | string;
  search: string;
  sort: string;
  order: string;
  role?: number;
  status?: number;
  fromDate: string;
  toDate: string;
}
