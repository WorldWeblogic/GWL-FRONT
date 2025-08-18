import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "../contexts/auth";

function WaveChart() {
  const { theme } = useTheme();
  const { customersdata } = useAuth();
  const monthlyCustomerData = getMonthlyCustomerData(customersdata);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={monthlyCustomerData}
        margin={{ top: 0, right: 10, left: -30, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip
          cursor={false}
          formatter={(value) => `${value} customers`}
        />

        <XAxis
          dataKey="name"
          strokeWidth={0}
          stroke={theme === "light" ? "#475569" : "#94a3b8"}
          tickMargin={6}
        />
        <YAxis
          strokeWidth={0}
          stroke={theme === "light" ? "#475569" : "#94a3b8"}
          tickMargin={6}
        />

        <Area
          type="monotone"
          dataKey="total"
          stroke="#2563eb"
          fillOpacity={1}
          fill="url(#colorTotal)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Utility function
const getMonthlyCustomerData = (data) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthlyCounts = new Array(12).fill(0);
  data.forEach((customer) => {
    const date = new Date(customer.createdAt);
    const month = date.getMonth();
    monthlyCounts[month]++;
  });
  return months.map((name, i) => ({
    name,
    total: monthlyCounts[i],
  }));
};

export default WaveChart;

