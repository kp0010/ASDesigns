import React, { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Select from "react-select";

// Recursive flattening for react-select grouped structure
const buildOptions = (tree, parentPath = "") => {
  const options = [];

  for (const node of tree) {
    const currentPath = parentPath ? `${parentPath}  /  ${node.name}` : node.name;

    options.push({ label: currentPath, value: node.name });

    if (node.children && node.children.length > 0) {
      options.push(...buildOptions(node.children, currentPath));
    }
  }

  return options;
};

const transformToGroupedOptions = (tree) => {
  return tree.map((group) => ({
    label: group.name,
    options: buildOptions(group.children, group.name),
  }));
};

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState(null);
  const [categoryTree, setCategoryTree] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch category tree on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success && data.categoryTree) {
          setCategoryTree(data.categoryTree);
          setCategoryOptions(transformToGroupedOptions(data.categoryTree));
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle submit
  const handleAddCategory = (e) => {
    e.preventDefault();

    const payload = {
      name: categoryName.trim(),
      parent: parentCategory ? parentCategory.value : null,
    };

    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Category added successfully!");
          setCategoryName("");
          setParentCategory(null);
        } else {
          alert("Failed to add category.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding category.");
      });
  };

  return (
    <div className="add-category flex flex-col px-12 pt-8 gap-10 items-center">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Add Category
      </h2>

      <Card className="w-full max-w-lg p-6 shadow-lg rounded-2xl bg-white">
        <CardContent className="flex flex-col gap-4">
          <div className="grid w-full gap-3">
            <label
              htmlFor="category_name"
              className="font-medium text-gray-700"
            >
              Category Name
            </label>
            <Input
              type="text"
              id="category_name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Jerseys"
              className="border-gray-300"
            />
          </div>

          <div className="grid w-full gap-1.5">
            <label
              htmlFor="parent_category"
              className="font-medium text-gray-700"
            >
              Parent Category{" "}
              <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <Select
              id="parent_category"
              options={categoryOptions}
              value={parentCategory}
              onChange={(option) => setParentCategory(option)}
              placeholder="Leave empty to create a top-level category"
              isSearchable
              isClearable
            />
            <span className="text-sm text-gray-500">
              If no parent is selected, this category will be added as a new
              top-level (parent) category.
            </span>
          </div>

          <Button
            onClick={handleAddCategory}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Add Category
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
