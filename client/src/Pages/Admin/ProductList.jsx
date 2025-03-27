import React from 'react'
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

const product_exps = [
  {
    product_id: "ASD001",
    product_img: "/Products/ASD001.jpeg",
    product_name: " Cricket Half-Sleeves Jersey - Blue",
    price: "899.99",
    category: "Cricket",
    tags: "light-weight",
    sales: "20",
  }
]

export const ProductList = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Product List
      </h2>
      <Table className="border rounded-lg overflow-hidden">
        <TableCaption>A List of your Recent Orders.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[120px]">Product</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {orderLoaded && orders.map((order) => (
            <TableRow key={order["order_id"]} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                <Link to={`/order/${order["order_id"]}`}>{order["order_id"]}</Link>
              </TableCell>
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
          ))} */}
          {product_exps.map((product_exp) => (
             <TableRow key={product_exp.product_id} className="hover:bg-gray-50">
               <TableCell className="font-medium">{product_exp.product_img}{product_exp.product_name}</TableCell>
               <TableCell>{product_exp.product_id}</TableCell>
               <TableCell>{product_exp.price}</TableCell>
               <TableCell>{product_exp.category}</TableCell>
               {/* <TableCell>
                 <a href="#" className="text-blue-600 hover:underline">
                   {invoice.receipt}
                 </a>
               </TableCell> */}
               <TableCell>
                 <Badge
                  //  className={
                  //    invoice.paymentStatus === "Paid"
                  //      ? "bg-green-500 text-white"
                  //      : invoice.paymentStatus === "Pending"
                  //      ? "bg-yellow-500 text-white"
                  //      : "bg-red-500 text-white"
                  //  }
                 >
                   {product_exp.tags}
                 </Badge>
               </TableCell>
               <TableCell>{product_exp.sales}</TableCell>
               {/* add edit delete view icons */}
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
  )
}
