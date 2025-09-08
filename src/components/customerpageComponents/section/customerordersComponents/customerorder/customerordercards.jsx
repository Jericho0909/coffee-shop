import OrderCard from "../../../../ordercard"
const CustomerOrderCards = ({customerOrders}) => {
    return(
        <div className="grid grid-cols-1 w-full h-full gap-3">
            {customerOrders.map(orderCard => (
                <OrderCard
                    key={orderCard.orderId}
                    orderCard={orderCard}
                />
            ))}
        </div>
    )
}

export default CustomerOrderCards