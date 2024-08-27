import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilterCategory,
  fetchTodos,
} from "../store//reducers/todoSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Category from "../components/Category";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const todos = useSelector((state) => state.todos).todos;

  const filterCategory = useSelector((state) => state.todos.filterCategory);
  const searchText = useSelector((state) => state.todos.searchText);

  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

  const categories = ["Personal", "Work", "School"];

  const insets = useSafeAreaInsets();

  const boxWidth = width / 3 - 25; // Subtract some padding for spacing

  useEffect(() => {
    dispatch(setFilterCategory(category));
    dispatch(fetchTodos());
  }, [category, dispatch]);

  const handleFilterChange = (categoryName) => {
    // Toggle logic: if the clicked category is already selected, set it to "all"
    const newCategory = categoryName === category ? "all" : categoryName;
    setCategory(newCategory);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(36,37,41)",
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ marginVertical: 12 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
            Categories
          </Text>
        </View>
        <View style={styles.containerRow}>
          {categories.map((categoryName, index) => {
            return (
              <View key={index} style={[styles.box, { width: boxWidth }]}>
                <Category
                  category={categoryName}
                  setCategory={() => {
                    handleFilterChange(categoryName);
                  }}
                  selectedCategory={category}
                />
              </View>
            );
          })}
        </View>
      </View>

      <View
        style={{
          marginVertical: 12,
          justiftyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
          Recent Todos
        </Text>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#363740",
              display: "flex",
              borderRadius: 13,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 16,
              paddingHorizontal: 4,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 8,
                gap: 8,
              }}
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <View style={{ justiftyContent: "center", alignItems: "center" }}>
                {item.completed ? (
                  <AntDesign name="checkcircleo" size={24} color="lightgray" />
                ) : (
                  <Entypo
                    name="circle"
                    size={24}
                    color="lightgray"
                    onPress={() => dispatch(toggleTodo(item.id))}
                  />
                )}
              </View>
              <View style={{ flexShrink: 1 }}>
                <Text
                  style={{
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  {item.text} ({item.category})
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
              }}
            >
              <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))}>
                <Ionicons name="trash-outline" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    margin: 5,
  },
});

export default HomeScreen;
