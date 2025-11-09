import { useState, useEffect, useContext } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import { useParams } from "react-router-dom"
import DailySalesChart from "../charts/dailysaleschart"
import WeeklySalesChart from "../charts/weeklysaleschart"
import MonthlySalesChart from "../charts/monthlysaleschart"
import Loading from "../../loading"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Trophy } from "lucide-react";
import { X } from 'lucide-react';
import getTodayDate from "../../../utils/getTodayDate"
const Dashboard = () => {
    const { id } = useParams()
    const { adminList, 
        productList,
        orderList,
        stockList
    } = useContext(FirebaseFetchDataContext)
    const [ chart, setChart ] = useState("dailysales")
    const [ loading, setLoading ] = useState(true)

    const admin = adminList.find(key => key.id === id)
    const topSales = productList.sort((a, b) => b.orderCount - a.orderCount).slice(0,5)
    const totalSalesToday = orderList.filter(order => {
        const today = getTodayDate()
        const orderDate = order.orderDate.split("T")[0];
        return (orderDate === today &&
        (order.status === "Processing" || order.status === "Completed"))
    }).reduce((sum, order) => sum + order.total, 0)
    const totalOrderToday = orderList.filter(order => {
        const today = getTodayDate()
        return order.orderDate.split("T")[0] === today
    }).length


    const lowStock = stockList.filter(key => key.quantity <= 10)

    const colorTrophy = [
        "#FFD700",
        "#C0C0C0",
        "#CD7F32"
    ]

    const switchChartView = (chart) => {
        setChart(chart)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])
    
    if(loading){
        return(
            <Loading/>
        )
    }

    const validOrders = orderList.filter(order => order.status === "Completed")

    const chartView = {
        dailysales: <DailySalesChart orders={validOrders}/>,
        weeklysales: <WeeklySalesChart orders={validOrders}/>,
        monthlysales: <MonthlySalesChart orders={validOrders}/>
    }
    return (
        <section className="flex justify-start items-center flex-col w-full p-2">
                <div className="container-flex justify-between w-full h-auto p-1 mb-0">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start p-1">
                        dashboard
                    </h1>
                    <div className="container-flex justify-center w-auto h-auto p-1 mb-0 gap-1">
                        <div className="container-flex justify-center mb-0">
                            <FontAwesomeIcon 
                                icon={faUserTie}
                                size="1x" 
                                color="#8c6244"
                            />
                        </div>
                        <span className="font-opensans text-[clamp(1rem,2vw,1.10rem)] tracking-wide font-semibold">
                            {admin.username}
                        </span>
                    </div>
                </div>
                <div className="grid grid-rows-[auto_auto] lg:grid-cols-[2fr_1fr] w-full h-auto gap-2 m-1 p-1">
                    <div 
                        className="w-auto h-auto border border-black bg-[#D9CBBF]"
                    >
                        <div className="w-full h-[20rem] md:h-[25rem]">
                            {chartView[chart]}
                        </div>
                        <div className="flex justify-between items-center gap-1 w-full h-auto p-1">
                            <button
                                onClick={() => switchChartView("dailysales")}
                                className={`bg-[#8c6244] border border-black w-full text-white font-semibold py-2 px-4 rounded 
                                ${chart === "dailysales" ? "translate-y-1 shadow-inner" : "shadow-md"}`}
                            >
                                daily
                            </button>
                            <button
                                onClick={() => switchChartView("weeklysales")}
                                className={`bg-[#8c6244] border border-black w-full text-white font-semibold py-2 px-4 rounded 
                                ${chart === "weeklysales" ? "translate-y-1 shadow-inner" : "shadow-md"}`}
                            
                            >
                                weekly  
                            </button>
                            <button
                                onClick={() => switchChartView("monthlysales")}
                                className={`bg-[#8c6244] border border-black w-full text-white font-semibold py-2 px-4 rounded 
                                ${chart === "monthlysales" ? "translate-y-1 shadow-inner" : "shadow-md"}`}
                            >
                                monthly
                            </button>
                        </div>
                    </div>
                    <div className="w-auto h-auto border border-black bg-[#6F4E37]">
                        <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                            top sales
                        </h1>
                        <ol className="flex justify-center items-center flex-col w-full h-[80%] p-1">
                            {topSales.map((item, value) => (
                                <li
                                    key={value}
                                    className="container-flex font-opensans font-bold text-[clamp(1.20rem,2vw,1.35rem)] mb-0 gap-1"
                                >
                                    {value <= 2 && 
                                        (
                                            <span>
                                                <Trophy size={18} color={colorTrophy[value]}/>
                                            </span>
                                        )
                                    }
                                    <span>
                                        {item.name.toLowerCase()}
                                    </span>
                                    <span className="container-flex justify-center mb-0 text-[#D4A373] text-[clamp(0.65rem,2vw,0.80rem)] font-medium italic">
                                        (
                                            <X 
                                                size={15}
                                                color="black"
                                            />
                                            <span>
                                                {item.orderCount}
                                            </span>
                                        )
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div 
                    className="grid grid-rows-2 lg:grid-cols-[auto_auto] lg:grid-rows-[auto] w-full h-auto gap-2 m-1 p-1"
                >
                    <div className="w-auto h-auto border border-black bg-[#A3B18A]">
                        <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                            total overview cards
                        </h1>
                        <ul className="container-flex justify-center flex-col w-auto h-auto mb-0 p-1">
                            <li className="font-opensans font-bold text-[clamp(1.05rem,2vw,1.20rem)]">
                                total products -------- {productList.length}
                            </li>
                            <li className="font-opensans font-bold text-[clamp(1.05rem,2vw,1.20rem)]">
                                total orders today -------- { totalOrderToday}
                            </li>
                            <li className="font-opensans font-bold text-[clamp(1.05rem,2vw,1.20rem)]">
                                total sales today -------- {totalSalesToday}
                            </li>
                        </ul>
                    </div>
                    <div className="w-auto h-auto border border-black bg-[#C18F65]">
                        <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                            low stock
                        </h1>
                        <ul className="flex justify-start items-start flex-col max-h-[6.50rem] p-1 overflow-y-auto scrollbar-coffee">
                            {lowStock.map((item, index) => (
                                <li 
                                    key={index}
                                    className="container-flex justify-center w-full font-opensans font-bold text-[clamp(1.05rem,2vw,1.20rem)] p-[0.15rem] mb-0"
                                >
                                    <span>
                                         -{item.name.toLowerCase()}
                                    </span>
                                    <span className="container-flex justify-center mb-0 text-[clamp(0.65rem,2vw,0.80rem)] font-medium italic">
                                        {item.quantity === 0
                                            ? "(out of stock)"
                                            :   
                                                <>
                                                    (
                                                        <X 
                                                            size={15}
                                                            color="black"
                                                        />
                                                        <span>
                                                            {item.quantity}
                                                        </span>
                                                    )
                                                </>
                                        }
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </section>
    )
}

export default Dashboard