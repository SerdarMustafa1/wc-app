import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, View, TextInput } from "react-native";
import { Paragraph } from "react-native-paper";

import { styles } from "./HomeScreen.styles";

import { OpenStreetMapScreen } from "../../components/MapComponents/OSM";
import { LocationContextProvider } from "../../context/locationContext";
import { useTheme } from "@react-navigation/native";
import ActionMenu from "../../components/Menus/mainMenu";
import CityContainer from "../../components/CityContainer/CityContainer";

const HomeScreen = () => {
  // console.log(currentUser);
  //const signOutUser = () => Firebase.auth().signOut();
  //const { userProfile } = useContext(mainContext);

  const [value, onChangeText] = useState("");

  // console.log(mainContext);
  // const { colors, dark } = useTheme();
  // console.log("useTheme", dark);

  // console.log("testing me", Appearance.getColorScheme());

  return (
    <LocationContextProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <ActionMenu />
          <TextInput
            autoCorrect
            // autoFocus
            placeholder="Search  here"
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
          <OpenStreetMapScreen />
        </View>
        <View style={styles.box}>
          <CityContainer />
        </View>
      </SafeAreaView>
    </LocationContextProvider>
  );
};

export default HomeScreen;
