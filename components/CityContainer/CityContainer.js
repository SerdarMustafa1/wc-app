import React, { useContext, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatGrid } from "react-native-super-grid";
import { LocationContext } from "../../context/locationContext";
import { useState } from "react";

const searchOptions = [
  {
    id: 1,
    name: "closest",
    icon: "rocket",
    action: "",
  },
  {
    id: 2,
    name: "family",
    icon: "user",
    action: "",
  },
  {
    id: 3,
    name: "accessible",
    icon: "wheelchair",
    action: "",
  },
  {
    id: 4,
    name: "general",
    icon: "child",
    action: "",
  },
];

const CityContainer = () => {
  const { city } = useContext(LocationContext);

  useEffect(() => {
    console.log("city 1", city);
    getCity();

    console.log("city 2", city);
  }, [city]);

  const getCity = (city) => {
    if (city) {
      return <Text style={styles.text}>{city}</Text>;
    } else {
      return <Text style={styles.text}>{"Searching for city..."}</Text>;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item.name} style={styles.menuOptions}>
        <TouchableOpacity
          style={{
            margin: 8,
            padding: 8,
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "lightgray",
            alignItems: "center",
          }}
        >
          <Icon name={item.icon} />
        </TouchableOpacity>
        <Text style={styles.smallText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {getCity()}
      <Text style={styles.smallText}>What are you looking for?</Text>

      <FlatGrid
        itemDimension={60}
        data={searchOptions}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CityContainer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 1,
    alignItems: "center",
    margin: 8,
    padding: 8,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  menuOptions: { alignItems: "center" },
  text: {
    display: "flex",
    // margin: 8,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  smallText: {
    display: "flex",
    marginTop: 8,
    fontSize: 11,
    fontWeight: "normal",
    textTransform: "capitalize",
  },
});
