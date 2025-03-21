import React from 'react'
import { Input } from "@/Components/ui/input"

export const AddProducts = () => {
  return (
    <div className="add-products flex flex-col px-24 pt-8 gap-16">
      <div className="add-products-title">
        <h2 className="text-4xl font-bold text-center">Add Products</h2>
      </div>
      <div className="add-products-data bg-white rounded-lg p-4 flex flex-col w-full justify-center items-center shadow-md">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="product_id" className="font-medium" >Enter Product ID</label>
          <input type="text" id="product_id" placeholder="Enter Product ID" className="py-2 px-3 border-2 rounded mb-4 " />
          <label htmlFor="product_name" className="font-medium">Enter Product Name</label>
          <input type="text" id="product_name" placeholder="Enter Product Name" className="py-2 px-3 border-2 rounded mb-4 " />
          <label htmlFor="product_img" className="font-medium">Upload Image</label>
          {/* <input type="file" id="product_img" /> */}
          <Input id="product_img" type="file" className="py-2 mb-4" accept=".jpeg, .png, .jpg" />
          <label htmlFor="product_category" className="font-medium">Enter Product Categories</label>
          <input type="text" id="product_category" placeholder="Enter Product Categories" className="py-2 px-3 border-2 rounded mb-4" />
          <label htmlFor="product_tags" className="font-medium">Enter Product Tags</label>
          <input type="text" id="product_tags" placeholder="Enter Product Tags" className="py-2 px-3 border-2 rounded mb-4" />
        </div>
      </div>
    </div>
  )
}
