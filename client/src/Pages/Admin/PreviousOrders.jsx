import React from "react";
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

const invoices = [
  {
    invoice: "INV001",
    userEmail: "user1@example.com",
    userPhone: "123-456-7890",
    totalAmount: "$250.00",
    receipt: "View",
    paymentStatus: "Paid",
    date: "2025-03-22",
  },
  {
    invoice: "INV002",
    userEmail: "user2@example.com",
    userPhone: "987-654-3210",
    totalAmount: "$150.00",
    receipt: "View",
    paymentStatus: "Pending",
    date: "2025-03-20",
  },
  {
    invoice: "INV003",
    userEmail: "user3@example.com",
    userPhone: "555-666-7777",
    totalAmount: "$350.00",
    receipt: "View",
    paymentStatus: "Unpaid",
    date: "2025-03-18",
  },
];

export const PreviousOrders = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Previous Orders
      </h2>
      <Table className="border rounded-lg overflow-hidden">
        <TableCaption>A list of your recent invoices.</TableCaption>
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice} className="hover:bg-gray-50">
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.userEmail}</TableCell>
              <TableCell>{invoice.userPhone}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
              <TableCell>
                <a href="#" className="text-blue-600 hover:underline">
                  {invoice.receipt}
                </a>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    invoice.paymentStatus === "Paid"
                      ? "bg-green-500 text-white"
                      : invoice.paymentStatus === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                  }
                >
                  {invoice.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{invoice.date}</TableCell>
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
