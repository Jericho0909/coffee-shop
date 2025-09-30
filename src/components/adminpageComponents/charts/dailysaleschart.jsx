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
import dayjs from "dayjs";
const DailySalesChart = ({orders}) => {
    const dailySales = orders.reduce((acc, order) => {
        const day = format(new Date(order.orderDate), "yyyy-MM-dd")
        if (!acc[day]){
            acc[day] = 0
        }
        acc[day] += order.total;
        return acc;
    }, {})

    const dailyData = Object.keys(dailySales).map(day => ({
        label: day,
        sales: dailySales[day]
    }));

    const last7Days = dailyData.slice(-7);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer>
                <BarChart
                    data={last7Days}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="label" 
                        angle={-45} 
                        textAnchor="end"
                        interval={0}
                        tick={{ fontSize: 10, fill: "#4B2E2E", fontFamily: "opensans", fontWeight: "bold" }}
                        tickFormatter={(value) => dayjs(value).format("MMM DD")} 
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#6F4E37" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DailySalesChart

