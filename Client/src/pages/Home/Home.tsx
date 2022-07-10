import baseApi from "api/baseApi";
import { ChartConfiguration } from "chart.js";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link } from "react-router-dom";
import { formatter } from "../../types";
import ChartComponent from "./ChartComponent";
import "./Home.css";

import { startOfMonth, endOfMonth } from "date-fns";
// Require Esperanto locale
import { vi } from "date-fns/locale";
import { defaultInputRanges, defaultStaticRanges } from "utils/configDate";

interface Customer {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
  phone?: string;
  gender?: boolean;
  name?: string;
  birth?: Date;
  email?: string;
  address?: string;
  totalPrice?: string;
}
interface Total {
  id?: string;
  total_revenue?: string;
}
interface ComponentProps {
  ChartConfig: ChartConfiguration;
}
interface topProduct {
  id: number;
  productId: number;
  productName: string;
  size: string;
  color: string;
  code: string;
  totalPriceSell: number;
  totalQuantitySell: number;
}
interface business {
  totalCustomer: number;
  totalOrder: number;
  totalOrderSuccess: number;
  totalImport: number;
  totalSupplier: number;
}
function Home(props: ComponentProps) {
  const [chartConfig, setChartConfig] = useState<ChartConfiguration>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [topProduct, setTopProduct] = useState<topProduct[]>([]);
  const [totals, setTotals] = useState<Total>({} as Total);
  const [business, setBusiness] = useState<business>({
    totalCustomer: 0,
    totalImport: 0,
    totalOrder: 0,
    totalOrderSuccess: 0,
    totalSupplier: 0,
  } as business);
  const [filter, setFilter] = useState({
    fromDate: moment(startOfMonth(new Date())).format("yyyy-MM-DD"),
    toDate: moment(endOfMonth(new Date())).format("yyyy-MM-DD"),
  });
  const [selectionRange, setSelectionRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    key: "selection",
  });
  const [dataChar, setDataChar] = useState<Array<number>>();
  const [labelsChar, setLabelsChar] = useState<Array<string>>();
  useEffect(() => {
    const getData = async () => {
      const response = await baseApi.get("statisticals/revenue", filter);
      const arrayDate = getDateArray(
        selectionRange.startDate,
        selectionRange.endDate
      );
      let newData: Array<number> = [];
      let dataSet: Array<any> = [];
      response.data.forEach((element: any) => {
        dataSet.push({
          label: moment(element.createdAt).format("L"),
          totalPrice: element.totalPrice,
        });
      });
      arrayDate.map((date: string, index: number) => {
        newData.push(dataSet.find((e) => e.label === date)?.totalPrice || 0);
      });

      setLabelsChar(arrayDate);
      setDataChar(newData);
    };
    getData();
  }, [filter]);
  const getChart = async () => {
    setChartConfig({
      type: "bar",
      data: {
        labels: labelsChar,
        datasets: [
          {
            label: "Đơn vị:Triệu",
            data: dataChar,
            maxBarThickness: 30,
            backgroundColor: "rgba(54, 162, 235, 1)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
              },
            },
          ],
          xAxes: [
            {
              type: "time",
            },
          ],
        },
      },
    });
  };
  useEffect(() => {
    getChart();
  }, [labelsChar, dataChar]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const url = "statisticals/customer";
        const response = await baseApi.get(url, filter);
        const { data } = response;
        setCustomers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, [filter]);

  useEffect(() => {
    const getTotals = async () => {
      try {
        const url = "statisticals/total";
        const resp = await baseApi.get(url, filter);
        const { data } = resp;
        setTotals(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotals();
  }, [filter]);
  useEffect(() => {
    const getTotals = async () => {
      try {
        const url = "statisticals/product";
        const resp = await baseApi.get(url, filter);
        const { data } = resp;
        setTopProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotals();
  }, [filter]);
  useEffect(() => {
    const getTotals = async () => {
      try {
        const url = "statisticals/business";
        const resp = await baseApi.get(url, filter);
        const { data } = resp;
        setBusiness(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotals();
  }, [filter]);

  const changeDate = (ranges: any) => {
    setFilter({
      fromDate: moment(ranges.selection.startDate).format("yyyy-MM-DD"),
      toDate: moment(ranges.selection.endDate).format("yyyy-MM-DD"),
    });
    setSelectionRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };
  const getDateArray = (start: any, end: any): Array<any> => {
    var arrDate = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      arrDate.push(moment(new Date(dt)).format("L"));
      dt.setDate(dt.getDate() + 1);
    }
    return arrDate;
  };

  const [isShowDateRangePicker, setIsShowDateRangePicker] =
    React.useState(false);
  return (
    <div>
      <section className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid" style={{ paddingLeft: 16 }}>
            <div className="d-flex   mb-2 algin-items-center justify-content-space-between">
              <div>
                <h1>
                  <i className="nav-icon fa fa-home"></i> Tổng Quan Báo Cáo
                </h1>
              </div>
            </div>
            <div
              className="d-block"
              style={{ marginTop: 15, position: "relative" }}
            >
              <span
                style={{
                  background: "#ffff",
                  border: "1px solid darkgray",
                  fontSize: "14px",
                  cursor: "pointer",
                  padding: "11px",
                  borderRadius: 8,
                }}
                onClick={() => {
                  console.log(true);
                  setIsShowDateRangePicker(!isShowDateRangePicker);
                }}
              >
                {moment(filter.fromDate).format("DD/MM/yyyy")} đến{" "}
                {moment(filter.toDate).format("DD/MM/yyyy")}
                <i className="ml-4 far fa-calendar-alt"></i>
              </span>
              <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  top: 42,
                  display: isShowDateRangePicker ? "" : "none",
                }}
                onMouseLeave={() => {
                  setIsShowDateRangePicker(false);
                }}
              >
                <DateRangePicker
                  locale={vi}
                  onChange={changeDate}
                  inputRanges={defaultInputRanges}
                  preview={selectionRange}
                  moveRangeOnFirstSelection={false}
                  showPreview={true}
                  showDateDisplay={true}
                  staticRanges={defaultStaticRanges}
                  months={2}
                  maxDate={new Date()}
                  ranges={[selectionRange]}
                  direction="horizontal"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div
              className="row"
              style={{ paddingLeft: "0 100px", marginLeft: 8 }}
            >
              <div className="col-8 charts">
                <div className="d-flex justify-content-start">
                  <span style={{ marginTop: "4px", fontSize: 20 }}>
                    Tổng doanh thu:{" "}
                    <span style={{ color: "#5EB858", fontWeight: "bold" }}>
                      {formatter.format(Number(totals?.total_revenue || 0))}
                    </span>
                  </span>
                </div>

                <ChartComponent
                  ChartConfig={{
                    ...chartConfig,
                    type: "bar",
                  }}
                />
                <h5 style={{ textAlign: "center", marginTop: "15px" }}>
                  Biểu Đồ Thống Kê Doanh Số
                </h5>
              </div>
              <div className="col-4">
                <div
                  className="card"
                  style={{ height: "100%", borderRadius: 0 }}
                >
                  <div
                    className="card-header text-center"
                    style={{ padding: 18 }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      <i className="fas fa-chart-pie mr-1"></i>
                      Tình hình kinh doanh
                    </span>
                  </div>
                  <div
                    className="card-body "
                    style={{ borderTop: "1px solid #e9ebee" }}
                  >
                    <div className="p-20-b text-left">
                      <i
                        className="fas fa-user mr-3"
                        style={{ fontSize: 20 }}
                      ></i>
                      <span>{business?.totalCustomer} Khách hàng mới</span>
                    </div>
                    <div className="p-20-b text-left">
                      <i
                        className="fas fa-shopping-cart mr-3"
                        style={{ fontSize: 20 }}
                      ></i>
                      <span>{business?.totalOrder} Đơn hàng</span>
                    </div>

                    <div className="p-20-b text-left">
                      <i
                        className="fas fa-shopping-cart mr-3"
                        style={{ fontSize: 20 }}
                      ></i>
                      <span>{business?.totalImport} Đơn nhập hàng</span>
                    </div>
                    <div className="p-20-b text-left">
                      <i
                        className="fas fa-truck mr-3"
                        style={{ fontSize: 20 }}
                      ></i>
                      <span>{business?.totalSupplier} Nhà cung cấp mới</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col-6 ">
                <div className="top" style={{ height: 360 }}>
                  <div className="title d-flex justify-content-center align-items-center pt-3">
                    <div className="p-16">
                      <span style={{ fontSize: "20px" }}>
                        <i className="fa fa-cube mr-1"></i>
                        Top 5 sản phẩm bán chạy
                      </span>
                    </div>
                  </div>
                  {topProduct.length > 0 ? (
                    <table className="table  table-hover">
                      <thead className="table-light">
                        <th style={{ width: "70%" }} className="text-left">
                          Tên sản phẩm
                        </th>
                        <th style={{ width: "30%" }} className="text-right">
                          Tổng doanh thu
                        </th>{" "}
                      </thead>
                      <tbody>
                        {topProduct.map(
                          (product: topProduct, index: number) => {
                            return (
                              <tr key={index} className="tr_border">
                                <td className="text-left">
                                  {index + 1} {". "}
                                  <Link
                                    to={`/product/${product.productId}/detail`}
                                  >
                                    {product.productName.substring(0, 30) +
                                      "..."}
                                    {product.code} {product.color}
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    paddingLeft: 15,
                                    color: "rgb(94, 184, 88)",
                                  }}
                                  className="text-right"
                                >
                                  {formatter.format(product.totalPriceSell)}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center">Không có dữ liệu</div>
                  )}
                </div>
              </div>
              <div className="col-6 ">
                <div className="top " style={{ height: 360 }}>
                  <div className="title d-flex justify-content-center align-items-center pt-3">
                    <div className="p-16">
                      <span style={{ fontSize: "20px" }}>
                        <i className="fas fa-users mr-1"></i>
                        Top 5 khách hàng mua nhiều
                      </span>
                    </div>
                  </div>
                  {customers.length > 0 ? (
                    <table className="table  table-hover">
                      <thead className="table-light">
                        <th style={{ width: "70%" }} className="text-left">
                          Tên khách hàng
                        </th>
                        <th style={{ width: "30%" }} className="text-right">
                          Tổng chi tiêu
                        </th>{" "}
                      </thead>
                      <tbody>
                        {customers.map((customer: Customer, index) => {
                          return (
                            <tr key={index} className="tr_border">
                              <td className="text-left">
                                {index + 1} {". "}
                                <Link to={`/customer/${customer.id}/detail`}>
                                  {customer.name}
                                </Link>
                              </td>
                              <td
                                style={{
                                  paddingLeft: 15,
                                  color: "rgb(94, 184, 88)",
                                }}
                                className="text-right"
                              >
                                {formatter.format(Number(customer.totalPrice))}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center">Không có dữ liệu</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
export default Home;
