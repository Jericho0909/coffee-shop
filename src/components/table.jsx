import { useContext } from "react"
import AddHighlightContext from "../context/addhighlightContext"
const Table = ({tableHeader, tableData, openModal}) => {
    const { containerRefs, saveIndex } = useContext(AddHighlightContext)
    return(
        <div 
            className="overflow-x-auto w-full"
        >
            <table className="table-auto border-collapse w-full min-w-[600px]">
                <thead className="bg-gray-100">
                    <tr>
                        {tableHeader.map((key, value) => (
                            <th 
                                key={value}
                                className="text-center"
                            >
                                {key.label}
                            </th>
                        ))}
                            <th>
                                
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(row => (
                        <tr key={row.id || row.orderId} ref={(el) => (containerRefs.current[row.id || row.orderId] = el)}>
                            {tableHeader.map((header, colIndex) => (
                                <td 
                                    key={colIndex}
                                >
                                    {row[header.key]}
                                </td>
                            ))}
                            <td>
                                <button
                                    className="bg-[#88A550] text-white px-4 py-2 rounded shadow-md w-full h-auto
                                    transition-transform duration-300 ease-in-out
                                    hover:bg-[#7a9549] hover:scale-105 hover:shadow-[0_4px_12px_rgba(136,165,80,0.4)] active:translate-y-1 active:shadow-none"
                                    style={{ fontVariant: "small-caps" }}
                                    onClick={() => {
                                        openModal(row)
                                        saveIndex(row.id)
                                    }}
                                >
                                    manage
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Table