import React from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../store//reducers/todoSlice";

const HomeScreen = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <View
      style={{ flex: 1, backgroundColor: "rgb(36,37,41)", paddingTop: 120 }}
    >
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                textDecorationLine: item.completed ? "line-through" : "none",
                color: "#fff",
                marginTop: 10,
              }}
            >
              {item.text} ({item.category})
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 8,
              }}
            >
              <Button
                title="Toggle"
                onPress={() => dispatch(toggleTodo(item.id))}
              />
              <Button
                title="Delete"
                onPress={() => dispatch(removeTodo(item.id))}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
