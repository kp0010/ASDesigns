import { useEffect, useState } from "react";

import { Badge } from "@/Components/ui/badge";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const UserPreviousOrders = () => {
    const [orders, setOrders] = useState([]);
    const [orderItemsMap, setOrderItemsMap] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavoir: "smooth" });
        const splitLink = event.currentTarget.href.split("/");
        const productId = splitLink[splitLink.length - 1];
        navigate(`/product/${productId}`);
    };

    useEffect(() => {
        // Fetch all orders
        fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.success) {
                    setOrders(data.orders);

                    // For each order, fetch its items
                    const itemsMap = {};
                    await Promise.all(
                        data.orders.map(async (order) => {
                            const res = await fetch("/api/order", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ orderId: order.order_id }),
                            });
                            const detail = await res.json();
                            if (detail.success) {
                                itemsMap[order.order_id] = detail.orderItems;
                            }
                        })
                    );
                    setOrderItemsMap(itemsMap);
                    console.log(orderItemsMap);
                }
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="userPrevOrders">
            <div className="pb-5 bg-[#edeae7] flex flex-col items-center min-h-screen">
                <h2 className="text-5xl text-center pt-10 mb-5 mt-1">Previous Orders</h2>
                {orders.length === 0 ? (
                    <p>No previous orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.order_id} className="cards bg-white pt-2 w-[80%] rounded-lg flex flex-col md:flex items-center md:items-start mb-3 p-4">
                            <div className="prevOrders-head w-full m-3 pr-0 flex justify-between items-center sm:pr-10">
                                <p className="text-md font-medium"><strong>Order ID: </strong><Link to={`/order/${order["order_id"]}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">{order.order_id}</Link></p>
                                <p className="text-md font-medium"><strong>Date: </strong>{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="prevOrders-main flex w-[95%] pb-4 flex-col gap-4 mt-2 mx-4 lg:mx-8">
                                {(orderItemsMap[order.order_id] || []).map((item, index, arr) => (
                                    <div key={item.product_id} className={`${index !== arr.length - 1 ? "border-b-2 border-black" : ""}`}>
                                        <div className="flex gap-6 pb-4 lg:gap-10">
                                            <Link to={`/product/${item.product_id}`} onClick={handleClick}>
                                                <div className="prevOrders-left pl-0 xl:pl-8">
                                                    <div className="prevOrders-img h-[100px] w-[100px]">
                                                        <img
                                                            src={`/api/assets/${item.product_id}.jpeg`}
                                                            alt={item.name}
                                                            className="rounded-lg w-full h-full object-cover mb-2"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="prevOrders-right flex flex-col justify-between items-center w-[80%] sm:flex-row">
                                                <Link to={`/product/${item.product_id}`} onClick={handleClick}>
                                                    <h2 className="text-lg font-medium break-words text-gray-800">
                                                        {item.name}
                                                    </h2>
                                                </Link>
                                                <h2 className="text-lg font-bold text-gray-900">₹ {item.amount}</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="prevOrders-tail w-full m-3 pr-0 flex justify-center items-center gap-4 sm:pr-10 sm:justify-end">
                                <p className="text-md font-medium"><strong>Total: </strong>₹{order.total_amount}</p>
                                <p className="text-md font-medium"><strong>Status: </strong>
                                    <Badge
                                        className={
                                            order.status === "paid"
                                                ? "bg-green-500 text-white"
                                                : order.status === "pending"
                                                    ? "bg-yellow-500 text-white"
                                                    : "bg-red-500 text-white"
                                        }
                                    >
                                        {order.status.charAt(0).toUpperCase() + order.status.substring(1).toLowerCase()}
                                    </Badge></p>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

