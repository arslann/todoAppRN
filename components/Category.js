import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Category = ({ category, setCategory, selectedCategory }) => {
  const handleCategoryChange = () => {
    setCategory(category);
  };
  return (
    <TouchableOpacity
      style={{
        padding: 24,
        borderWidth: "1px",
        borderColor: selectedCategory == category ? "yellow" : "white",
      }}
      onPress={handleCategoryChange}
    >
      <Text style={{ color: "white" }}>{category}</Text>
    </TouchableOpacity>
  );
};

export default Category;
