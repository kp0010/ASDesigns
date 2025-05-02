import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";

export const TagsList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("/api/tags")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setTags(data.tags);
        }
      })
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  const handleEdit = (id) => {
    alert(`Edit tag with id: ${id}`);
    // Implement edit logic/modal here
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this tag?")) {
      fetch(`/api/tags/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            setTags((prev) => prev.filter((tag) => tag.id !== id));
          } else {
            alert("Failed to delete tag.");
          }
        })
        .catch((err) => console.error("Error deleting tag:", err));
    }
  };

  return (
    <div className="tags-list flex flex-col px-12 pt-8 gap-6 items-center">
      <h2 className="text-3xl font-bold text-gray-800 text-center">All Tags</h2>
      <Card className="w-full max-w-xl p-4 bg-white shadow-md rounded-xl">
        <CardContent className="grid gap-3">
          {tags.length === 0 ? (
            <p className="text-gray-500 text-center">No tags found.</p>
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between border rounded-md px-4 py-2 text-gray-700 bg-gray-100"
              >
                <span>{tag.name}</span>
                <div className="flex">
                  <Button
                    className="ml-3 mr-2 bg-[#edeae7] text-black"
                    onClick={() => handleEdit(tag.id)}
                  >
                    <FaEdit className="size-3" /> Edit
                  </Button>
                  <Button
                    className="bg-black text-white"
                    onClick={() => handleDelete(tag.id)}
                  >
                    <FaTrash className="size-3" /> Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
