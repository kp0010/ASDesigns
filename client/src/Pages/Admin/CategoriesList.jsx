import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          const flat = flattenCategoryTree(data.categoryTree);
          setCategories(flat);
        }
      });
  }, []);
  

  const handleEdit = (category) => {
    console.log("Edit clicked for:", category.name);
    // Your logic here
  };

  const handleDelete = (category) => {
    console.log("Delete clicked for:", category.name);
    // Your logic here
  };

  const flattenCategoryTree = (tree, parent = null, depth = 0) => {
    let flatList = [];

    tree.forEach((node) => {
      const categoryEntry = {
        name: node.name,
        parent: parent ? parent.name : null,
        depth,
      };

      flatList.push(categoryEntry);

      if (node.children && node.children.length > 0) {
        flatList = flatList.concat(
          flattenCategoryTree(node.children, node, depth + 1)
        );
      }
    });

    return flatList;
  };

  return (
    <div className="catList p-6">
      <h2 className="text-xl font-bold mb-4">Category List</h2>

      <Table className="border rounded-lg overflow-hidden shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-800">
            <TableHead className="w-1/3">Category Name</TableHead>
            <TableHead className="w-1/3 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition duration-150"
              >
                <TableCell>
                  <div
                    style={{
                      paddingLeft: `${cat.depth * 40}px`,
                      borderLeft: cat.depth > 0 ? "4px solid #ccc" : "none",
                    }}
                    className="pl-2"
                  >
                    {cat.name}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="ml-3 mr-3 bg-[#edeae7] text-black">
                    <FaEdit className="size-3" /> Edit
                  </Button>
                  <Button className="bg-black text-white">
                    <FaTrash className="size-3" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
