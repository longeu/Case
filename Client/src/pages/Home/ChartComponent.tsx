import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { ChartConfiguration } from "chart.js";

interface ChartProps {
  ChartConfig: ChartConfiguration;
  
}
const ChartComponent = (props: ChartProps) => {
  const chartElement = useRef<HTMLCanvasElement | null>(null);

  let chart = useRef<Chart>();

  const { ChartConfig } = props;

  useEffect(() => {
    return () => {
      chart.current && chart.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (!!chartElement.current && !chart.current) {
      const ctx: CanvasRenderingContext2D | null =
        chartElement.current.getContext("2d");
      if (ctx) {
        chart.current = new Chart(ctx, ChartConfig);
      }
    } else {
      if (chart.current ) {
        try{
          chart.current.config = ChartConfig;
          chart.current.update();
        }catch(e){
            
        }
      }
    }
  }, [ChartConfig]);

  return <canvas ref={chartElement} />;
};


export default ChartComponent;
