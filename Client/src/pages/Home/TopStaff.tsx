
import "./Home.css";
import { ChartConfiguration } from "chart.js";
import ChartComponent from "./ChartComponent";
import React, { useEffect, useState } from "react";
import CustomerList from "pages/Customer/CustomerList";
import baseApi from "api/baseApi";


const chartTypes = ["bar"];

interface ComponentProps {
    ChartConfig: ChartConfiguration;
}


function TopStaff(props: ComponentProps) {
    const [selectedIndex, setIndex] = useState(0);
    const [chartConfig, setChartConfig] = useState<ChartConfiguration>();
    const getChart = async () => {
        const response = await baseApi.get("statisticals/topStaff", {})
        let labels: Array<string> = []
        let newData: Array<number> = []
        response.data.forEach((element: any) => {
            labels.push(element.fullname)
            newData.push(element.total_price)
        });
        setChartConfig({
            type: chartTypes[0],
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Đơn vị:triệu",
                        data: newData,
                        maxBarThickness: 30,
                        backgroundColor: [
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)"
                        ],
                        borderColor: [
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(54, 162, 235, 1)"
                        ],
                        borderWidth: 2,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                min:0,
                                stepSize: 2,
                                
                            }
                        }
                    ]
                }
            }
        })

    }
    useEffect(() => {
        getChart();
    }, [])
  
    const chartType = chartTypes[selectedIndex];
    return (
        <div>
            <ChartComponent
                ChartConfig={{
                    ...chartConfig,
                    type: chartType
                   
                }}
            />
             {/* <div style={{ display: "flex", flexDirection: "row" }}>
                {radioButtons}
             </div> */}
            <h5 style={{ textAlign: "center" }}>Top 5 Nhân Viên Doanh Thu Cao</h5>
        </div>
    );
}

export default TopStaff;
