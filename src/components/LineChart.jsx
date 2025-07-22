import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useAuth } from "../contexts/auth";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function LineChart() {
    const { employeedata } = useAuth();
    // This function will return an array with the count of employees per month
    const getMonthlyEmployeeCounts = (data) => {
        const monthlyCounts = Array(12).fill(0); // Jan to Dec

        data.forEach((emp) => {
            const date = new Date(emp.createdAt);
            const month = date.getMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
            monthlyCounts[month]++;
        });

        return monthlyCounts;
    };
    const monthlyCounts = getMonthlyEmployeeCounts(employeedata);
    const options = {
        responsive: true,
    };
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Employee Data",
                data: monthlyCounts,
                fill: false,
                backgroundColor: "rgb(31, 77, 180)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };
    return (
        <>
            <Line
                options={options}
                data={data}
            />
        </>
    );
}

export default LineChart;
