import React, { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Select from "react-select";

const buildOptions = (tree, parentPath = "") => {
  const options = [];

  for (const node of tree) {
    const currentPath = parentPath ? `${parentPath}  /  ${node.name}` : node.name;

    if (node.children && node.children.length > 0) {
      options.push(...buildOptions(node.children, currentPath));
    } else {
      options.push({ label: currentPath, value: currentPath });
    }
  }

  return options;
};

// Convert API categoryTree to grouped options
const transformToGroupedOptions = (categoryTree) => {
  return categoryTree.map((group) => ({
    label: group.name,
    options: buildOptions(group.children, group.name),
  }));
};

export const AddProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success && data.categoryTree) {
          const transformed = transformToGroupedOptions(data.categoryTree);
          setCategoryOptions(transformed);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    fetch("/api/tags")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          // Map the tags data into a format suitable for react-select
          const tagOptions = data.tags.map((tag) => ({
            label: tag.name,
            value: tag.id,
          }));
          setTags(tagOptions);
        }
      })
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  return (
    <div className="add-products flex flex-col px-12 pt-8 gap-10 items-center mb-20">
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
            <Select
              id="product_category"
              options={categoryOptions}
              onChange={(option) => setSelectedCategory(option)}
              placeholder="Select Product Category"
              isSearchable
            />
          </div>

          <div className="grid w-full gap-3">
            <label htmlFor="product_tags" className="font-medium text-gray-700">
              Product Tags
            </label>
            <Select
              id="product_tags"
              isMulti // Allows selecting multiple tags
              options={tags}
              onChange={(selectedOptions) => setSelectedTags(selectedOptions)}
              placeholder="Select Product Tags"
              isSearchable
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
