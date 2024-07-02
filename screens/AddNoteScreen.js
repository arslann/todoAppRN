import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/reducers/todoSlice";
import Category from "../components/Category";

const { width } = Dimensions.get("window");

const AddNoteScreen = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const todos = useSelector((state) => state.todos);
  const categories = ["Personal", "Work", "School"];

  const boxWidth = width / 3 - 25; // Subtract some padding for spacing

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text && category) {
      dispatch(addTodo(text, category));
      setText("");
      setCategory("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <View>
          <View>
            <Text>Categories</Text>
          </View>
          <View style={styles.containerRow}>
            {categories.map((categoryName, index) => {
              return (
                <View key={index} style={[styles.box, { width: boxWidth }]}>
                  <Category
                    category={categoryName}
                    setCategory={setCategory}
                    selectedCategory={category}
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{}}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter todo"
          />
        </View>
        <View
          style={{
            backgroundColor: "rgb(161,171,255)",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => handleAddTodo()}>
            <Text style={{ color: "black", fontSize: 18 }}>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(36,37,41)",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    color: "white",
    fontSize: 18,
  },
  btn: {
    color: "white",
  },
  containerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    aspectRatio: 1, // Make the height equal to the width
    margin: 5,
  },
});

export default AddNoteScreen;
