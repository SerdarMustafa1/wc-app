import React from "react";
import { Fragment } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatGrid } from "react-native-super-grid";

const CityContainer = () => {
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
      <Text style={styles.text}>City Name</Text>
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
    fontSize: 12,
    fontWeight: "normal",
    textTransform: "capitalize",
  },
});
