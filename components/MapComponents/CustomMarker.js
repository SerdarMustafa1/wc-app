import React from "react";
import { View, Text } from "react-native";

export const CustomMarker = ({ text }) => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: "#007bff",
      borderColor: "#eee",
      borderRadius: 5,
      elevation: 10,
    }}
  >
    <Text style={{ color: "#fff" }}>{text}</Text>
  </View>
);
