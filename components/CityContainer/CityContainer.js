import React from "react";
import { Text, View } from "react-native";

const CityContainer = () => {
  const searchOptions = [
    {
      id: 1,
      name: "closest",
      icon: "",
      action: "",
    },
    {
      id: 2,
      name: "family",
      icon: "",
      action: "",
    },
    {
      id: 3,
      name: "accessible",
      icon: "",
      action: "",
    },
    {
      id: 4,
      name: "general",
      icon: "",
      action: "",
    },
  ];

  return (
    <View
      style={{ display: "flex", alignItems: "center", margin: 8, padding: 8 }}
    >
      <Text
        style={{ display: "flex", margin: 8, fontSize: 14, fontWeight: "bold" }}
      >
        City Name
      </Text>
      <Text style={{ display: "flex", margin: 8 }}>
        What are you looking for?
      </Text>

      <View style={{ display: "flex", flexDirection: "row" }}>
        {searchOptions?.map((user) => (
          <View
            key={user.name}
            style={{
              margin: 8,
              padding: 8,
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "lightgray",
            }}
          >
            <Text>{user.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CityContainer;