import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
const MonthlySalesChart = ({orders}) => {
    const monthlySales = orders.reduce((acc, order) => {
        const month = format(new Date(order.orderDate), "yyyy-MM");
        if (!acc[month]){
            acc[month] = 0
        }
        acc[month] += order.total
        return acc
    }, {})

    const monthlyData = Object.keys(monthlySales).map(label => ({
        label,
        sales: monthlySales[label]
    }))

    const last12Months = monthlyData.slice(-12);
    
    return (
        <div className="w-full h-full">
            <ResponsiveContainer>
                <BarChart
                    data={last12Months}
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
                            const [year, month] = value.split("-")
                            const date = new Date(year, month - 1)
                            return date.toLocaleDateString("en-US", {
                            month: "short", 
                            year: "numeric",
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

export default MonthlySalesChart