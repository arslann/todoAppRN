import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AddNoteScreen from "../screens/AddNoteScreen";

const TabRouter = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          height: 70 + insets.bottom,

          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "rgb(159,158,191)" : "gray",
                fontSize: 10,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home-outline"
              size={32}
              color={focused ? "rgb(159,158,191)" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNoteScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "rgb(159,158,191)" : "gray",
                fontSize: 10,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Add
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="add"
              size={32}
              color={focused ? "rgb(159,158,191)" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
