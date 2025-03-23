import React from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const AddProducts = () => {
  return (
    <div className="add-products flex flex-col px-12 pt-8 gap-10 items-center">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Add Products
      </h2>

      <Card className="w-full max-w-lg p-6 shadow-lg rounded-2xl bg-white">
        <CardContent className="flex flex-col gap-4">
          <div className="grid w-full gap-3">
            <label htmlFor="product_id" className="font-medium text-gray-700">
              Product ID
            </label>
            <Input
              type="text"
              id="product_id"
              placeholder="Enter Product ID"
              className="border-gray-300"
            />
          </div>

          <div className="grid w-full gap-3">
            <label htmlFor="product_name" className="font-medium text-gray-700">
              Product Name
            </label>
            <Input
              type="text"
              id="product_name"
              placeholder="Enter Product Name"
              className="border-gray-300"
            />
          </div>

          <div className="grid w-full gap-3">
            <label htmlFor="product_img" className="font-medium text-gray-700">
              Upload Image
            </label>
            <Input id="product_img" type="file" className="border-gray-300" />
          </div>

          <div className="grid w-full gap-3">
            <label
              htmlFor="product_category"
              className="font-medium text-gray-700"
            >
              Product Categories
            </label>
            <Input
              type="text"
              id="product_category"
              placeholder="Enter Product Categories"
              className="border-gray-300"
            />
          </div>

          <div className="grid w-full gap-3">
            <label htmlFor="product_tags" className="font-medium text-gray-700">
              Product Tags
            </label>
            <Input
              type="text"
              id="product_tags"
              placeholder="Enter Product Tags"
              className="border-gray-300"
            />
          </div>

          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Add Product
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
