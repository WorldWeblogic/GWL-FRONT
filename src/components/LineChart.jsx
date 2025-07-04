import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function LineChart() {
    const options = {
        responsive: true,
    };
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Employee Data",
                data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55],
                fill: false,
                backgroundColor: "rgb(31, 77, 180)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };
    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}

export default LineChart;
