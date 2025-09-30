import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, getWeek } from "date-fns";
const WeeklySalesChart = ({orders}) => {
    const weeklySales = orders.reduce((acc, order) => {
        const date = new Date(order.orderDate);
        const week = getWeek(date);
        const year = format(date, "yyyy");
        const label = `${year}-W${week}`;

        if (!acc[label]) {
            acc[label] = 0
        }
        acc[label] += order.total

        return acc
    }, {});


    const weeklyData = Object.keys(weeklySales).map(label => ({
        label,
        sales: weeklySales[label]
    }))

    const last12Weeks = weeklyData.slice(-12);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer>
                <BarChart
                    data={last12Weeks}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                   <XAxis 
                        dataKey="label"
                        angle={-45} 
                        textAnchor="end"
                        interval={0}
                        tick={{ fontSize: 10, fill: "#4B2E2E", fontFamily: "opensans", fontWeight: "bold" }}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return isNaN(date) 
                            ? value 
                            : date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                });
                        }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#6F4E37" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeeklySalesChart