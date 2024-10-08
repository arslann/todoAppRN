import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

import {
  SimpleLineIcons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import { createTable } from "../database/db";
import { fetchTodos } from "../store/reducers/todoSlice";
import { useDispatch } from "react-redux";

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    createTable();
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(36,37,41)",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 100,
      }}
    >
      <View style={{ gap: 15, alignContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 48,
            color: "rgb(171,167,251)",
            fontWeight: "bold",
          }}
        >
          Remind.me
        </Text>
        <Text style={{ color: "white", fontSize: 16 }}>
          Note taking made easier
        </Text>
      </View>
      <View
        backgroundColor="rgb(55,55,63)"
        padding={50}
        borderRadius={150}
        style={{ position: "relative" }}
      >
        <SimpleLineIcons name="notebook" size={88} color="white" />
        <View
          style={{ position: "absolute", left: -30, top: -30, opacity: 0.6 }}
        >
          <FontAwesome name="bell-o" size={32} color="gray" op />
        </View>
        <View
          style={{ position: "absolute", right: -30, top: -30, opacity: 0.6 }}
        >
          <SimpleLineIcons name="pencil" size={32} color="gray" />
        </View>
        <View
          style={{ position: "absolute", bottom: -30, left: -30, opacity: 0.6 }}
        >
          <MaterialCommunityIcons
            name="note-edit-outline"
            size={32}
            color="gray"
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            opacity: 0.6,
          }}
        >
          <Foundation name="page" size={32} color="gray" />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(161,171,255)",
          width: "80%",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 15,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={{ color: "black", fontSize: 18 }}>Let's Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
