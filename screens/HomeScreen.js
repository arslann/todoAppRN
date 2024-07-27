import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../store//reducers/todoSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(36,37,41)",
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}
    >
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
                <Ionicons name="trash-outline" size={28} color="darkred" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
