import React, { useState, useEffect } from "react";
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

export const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const fetchProducts = () => {
    console.log("CALLING")
    fetch(`/api/products-metadata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setProducts(data.products)
        console.log(data.products[0].tags)
        setLoaded(true)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Product List
      </h2>

      {/* Product Table */}
      <Table className="border rounded-lg overflow-hidden">
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
          {(loaded && products.length) ? (
            products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-gray-50 text-center"
              >
                {/* Product Image & Name */}
                <TableCell className="flex items-center space-x-2">
                  <img
                    src={`/Products/${product.product_id}.jpeg`}
                    className="w-20 h-20 rounded-lg"
                  />
                  <span>{product["product_id"] +
                    (product["name"] ? " | " + product["name"] : "")}</span>
                </TableCell>

                {/* Product Details */}
                <TableCell>{product["product_id"]}</TableCell>
                <TableCell>₹{parseFloat(product["price"]).toFixed(2)}</TableCell>
                <TableCell>{product["category_path"].join(", ")}</TableCell>
                <TableCell>
                  {product.tags[0] ? (product.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-blue-500 text-white px-2 py-1 rounded-md">
                      {tag}
                    </Badge>
                  ))) :
                    (
                      <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        None
                      </Badge>
                    )
                  }
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
