import axiosConfig from "./axiosConfig";

// api/productApi.js
const baseApi = {
  get: (url: string, params: any) => {
    return axiosConfig.get(url, { params });
  },
  post: (url: string, data: any) => {
    return axiosConfig.post(url, data);
  },
  put: (url: string, data: any) => {
    url = `${url}/${data.id}`;
    return axiosConfig.put(url, data);
  },
  getById: (url: string, id: number) => {
    url = `${url}/${id}`;
    console.log(url);
    return axiosConfig.get(url);
  },
  delete: (url: string, id: number) => {
    url = `${url}/${id}`;
    return axiosConfig.delete(url);
  },
  multiDelete: (url: string, ids: any) => {
    url = `${url}`;
    return axiosConfig.put(url, ids);
  },
  putStatus: (url: string, id: number, data: any) => {
    url = `${url}/${id}/status`;
    return axiosConfig.put(url, data);
  },
  getByStartDate: (url: string, startDate: string) => {
    url = `${url}/start-date/${startDate}`;
    return axiosConfig.get(url);
  },
  putNote: (url: string, id: number, data: any) => {
    url = `${url}/${id}/note`;
    return axiosConfig.put(url, data);
  },
};
export default baseApi;
