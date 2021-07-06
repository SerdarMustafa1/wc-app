import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Paragraph } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { useTheme } from "@react-navigation/native";

import { OpenStreetMapScreen } from "../../components/MapComponents/OSM";
import { LocationContextProvider } from "../../context/locationContext";
import ActionMenu from "../../components/Menus/mainMenu";
import CityContainer from "../../components/CityContainer/CityContainer";

const searchOptions = [
  {
    id: 1,
    name: "Type",
    icon: "user",
    action: "",
  },
  {
    id: 2,
    name: "family",
    icon: "team",
    action: "",
  },
  {
    id: 3,
    name: "accessible",
    icon: "addusergroup",
    action: "",
  },
  {
    id: 4,
    name: "costs",
    icon: "book",
    action: "",
  },
  {
    id: 5,
    name: "other",
    icon: "plus",
    action: "",
  },
];

const GuideScreen = () => {
  // console.log(currentUser);
  //const signOutUser = () => Firebase.auth().signOut();
  //const { userProfile } = useContext(mainContext);

  const [value, onChangeText] = useState("");

  // console.log(mainContext);
  // const { colors, dark } = useTheme();
  // console.log("useTheme", dark);

  // console.log("testing me", Appearance.getColorScheme());
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
    <LocationContextProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.item}>
          <View style={{ marginBottom: 30 }}>
            <Text>Location name, GPS address</Text>
          </View>
          <Text>Description</Text>
          <FlatGrid
            itemDimension={150}
            data={searchOptions}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={renderItem}
          />
          <View style={{ marginBottom: 30 }}>
            <Text>Location name, GPS address</Text>
          </View>
        </View>
        {/* section for post mvp (nearby) */}
        {/* <View style={styles.item}>
            <Text>Nearby</Text>
          </View> */}
      </SafeAreaView>
    </LocationContextProvider>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  item: {
    margin: 10,
    width: "100%", // is 50% of container width
    justifyContent: "center",
    alignItems: "center",
  },
  menuOptions: { alignItems: "center" },
});
