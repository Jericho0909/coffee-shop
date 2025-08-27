import { useState, useEffect } from "react"
import DailySalesChart from "../charts/dailysaleschart"
import WeeklySalesChart from "../charts/weeklysaleschart"
import MonthlySalesChart from "../charts/monthlysaleschart"
import Loading from "../../loading"
const Dashboard = () => {
    const [chart, setChart] = useState("dailysales")
    const [ loading, setLoading ] = useState(true)

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

    const chartView = {
        dailysales: <DailySalesChart/>,
        weeklysales: <WeeklySalesChart/>,
        monthlysales: <MonthlySalesChart/>
    }
    return (
        <section>
            <div className="bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md sm:p-[0.90rem] md:p-[1.10rem] lg:p-[1.30rem] xl:p-[1.50rem] w-full">
                <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start p-1">
                    dashboard
                </h1>
                <div className="grid grid-rows-[auto_auto] lg:grid-cols-[2fr_1fr] w-full h-auto gap-2">
                    <div 
                        className="w-auto h-auto m-1 p-1 border border-black"
                    >
                        <div className="w-full h-[20rem] md:h-[25rem] p-2">
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
                    <div className="w-auto h-auto m-1 p-1 border border-black">
                        <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                            top sales
                        </h1>
                        <ol className="flex justify-center items-center flex-col w-full h-[80%] p-1">
                            <li>una</li>
                            <li>pangalawa</li>
                            <li>pangatlo</li>
                            <li>pangapat</li>
                            <li>panglima</li>
                        </ol>
                    </div>
                </div>
                <div className="w-auto h-auto p-1">
                    <div className="grid grid-rows-2 lg:grid-cols-[auto_auto] lg:grid-rows-[auto] gap-2 h-auto">
                        <div className="w-full p-1 border border-black">
                            <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                                total overview cards
                            </h1>
                            <ul className="flex justify-center items-start flex-col h-auto">
                                <li>total products -------- 15</li>
                                <li>total orders today -------- 6</li>
                                <li>total sales today -------- ₱740</li>
                            </ul>
                        </div>
                        <div className="p-1 border border-black">
                            <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                                low stock
                            </h1>
                            <ul className="flex justify-center items-start flex-col h-auto">
                                <li>- matcha latte (3)</li>
                                <li>- cold brew (out of stock)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard