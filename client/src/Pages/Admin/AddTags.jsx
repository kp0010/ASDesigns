// AddTag.jsx
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

export const AddTag = () => {
  const [tagName, setTagName] = useState("");

  const handleAddTag = async (e) => {
    e.preventDefault();

    if (!tagName.trim()) {
      alert("Tag name cannot be empty.");
      return;
    }

    const payload = { name: tagName.trim() };

    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Tag added successfully!");
        setTagName("");
      } else {
        alert("Failed to add tag.");
      }
    } catch (err) {
      console.error("Error adding tag:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="add-tag flex flex-col px-12 pt-8 gap-6 items-center">
      <h2 className="text-3xl font-bold text-center text-gray-800">Add New Tag</h2>
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <CardContent className="flex flex-col gap-4">
          <label htmlFor="tag_name" className="font-medium text-gray-700">
            Tag Name
          </label>
          <Input
            type="text"
            id="tag_name"
            placeholder="e.g. Premium Quality"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="border-gray-300"
          />
          <Button
            onClick={handleAddTag}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Add Tag
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
