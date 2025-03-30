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
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
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
  },
];
const products = [
  {
    product_id: "#7712309",
    product_name: "Sample Product",
    product_img: "https://via.placeholder.com/40",
    price: 1452.5,
    category: "Electronics",
    tags: "New",
    sales: 20,
  },
  {
    product_id: "#7712310",
    product_name: "Another Product",
    product_img: "https://via.placeholder.com/40",
    price: 899.99,
    category: "Accessories",
    tags: "Best Seller",
    sales: 15,
  },
];

export const ProductList = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Product List
      </h2>

      {/* Product Table */}
      <Table className="border rounded-lg overflow-hidden">
        <TableCaption>A List of your Products.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 text-center">
            <TableHead className="w-[250px] text-center">Product</TableHead>
            <TableHead className="w-[150px] text-center">Product ID</TableHead>
            <TableHead className="w-[120px] text-center">Price</TableHead>
            <TableHead className="w-[150px] text-center">Category</TableHead>
            <TableHead className="w-[150px] text-center">Tags</TableHead>
            <TableHead className="w-[100px] text-center">Sales</TableHead>
            <TableHead className="w-[180px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow
                key={product.product_id}
                className="hover:bg-gray-50 text-center"
              >
                {/* Product Image & Name */}
                <TableCell className="flex items-center space-x-2">
                  <img
                    src={`/Products/ASD001.jpeg`}
                    // alt={product.product_name}
                    className="w-20 h-20 rounded-lg"
                  />
                  <span>ASD001 | Cricket Half-Sleeves Jersey - Blue</span>
                </TableCell>

                {/* Product Details */}
                <TableCell>ASD001</TableCell>
                <TableCell>₹898.99</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md">
                    {product.tags}
                  </Badge>
                </TableCell>
                <TableCell>{product.sales}</TableCell>

                {/* Action Buttons */}
                <TableCell>
                  <div className="flex justify-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye className="size-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <FaEdit className="size-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash className="size-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No products available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* Footer */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="font-semibold">
              Total Sales
            </TableCell>
            <TableCell className="text-center font-semibold">
              ₹
              {products
                .reduce((total, product) => total + product.sales, 0)
                .toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
