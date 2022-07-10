// import { ComponentProps } from "../../types";
import "./Home.css";
import { ChartConfiguration } from "chart.js";
import ChartComponent from "./ChartComponent";
import React, {useEffect, useState } from "react";
import baseApi from "api/baseApi";
import moment, { max } from "moment";
 import "moment/locale/vi";
const chartTypes = ["bar", "doughnut", "bubble"];


interface ComponentProps{
    ChartConfig: ChartConfiguration;
}

function CustomerNewChart(props: ComponentProps) {
    const [selectedIndex, setIndex] = useState(0);
    const [chartConfig, setChartConfig] = useState<ChartConfiguration>();

    const getChart = async () => {
        const response = await baseApi.get("statisticals/day", {})
        let labels: Array<string> = []
        let newData: Array<number> = []
        response.data.forEach((element: any) => {
            labels.push(moment(element.day).format("L"))
            newData.push(element.number_customer)
        });
        setChartConfig({
            type: chartTypes[0],
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Đơn vị:Khách Hàng",
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
                                stepSize: 1,
                                min:0
                            
                                      
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
                    type: chartType,
                    
                }}
            />
            
            <h5 style={{ textAlign: "center" }}>Biểu Đồ Thống Kê Khách Hàng Mới</h5>
        </div>
    );
}

export default CustomerNewChart;
