import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";

export const PreviousOrders = () => {
  const [orders, setOrders] = useState([])
  const [orderLoaded, setOrderLoaded] = useState(false)

  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "getAll": true
    })
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.success) {
        setOrders(data.orders)
        setOrderLoaded(true)
      }
    });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Previous Orders
      </h2>
      <Table className="border rounded-lg overflow-hidden">
        <TableCaption>A List of your Recent Orders.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>User Phone</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Receipt</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderLoaded && orders.map((order) => (
            <TableRow key={order["order_id"]} className="hover:bg-gray-50">
              <TableCell className="font-medium">{order["order_id"]}</TableCell>
              <TableCell>{order["user_mail"]}</TableCell>
              <TableCell>+91 {order["user_phone"]}</TableCell>
              <TableCell>{parseFloat(order["total_amount"]).toFixed(2)}</TableCell>
              <TableCell>
                {order["receipt"].substring(0, 15) + (order["receipt"].length > 15 && "...")}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    order["status"] === "paid"
                      ? "bg-green-500 text-white"
                      : order["status"] === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                  }
                >
                  {order["status"].charAt(0).toUpperCase() + order["status"].substring(1).toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{new Date(order["created_at"]).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold">$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
