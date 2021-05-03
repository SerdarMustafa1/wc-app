import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, Title, Paragraph } from "react-native-paper";
import mainContext from "../../context/mainContext";
import Firebase from "../../Firebase";
import loc from "../../utils/localization";
import { styles } from "./HomeScreen.styles";
import Logo from "../../images/wc.jpg";
import Map from "../../components/MapComponents/Map";

const HomeScreen = () => {
  const { currentUser } = Firebase.auth();
  console.log(currentUser);
  //const signOutUser = () => Firebase.auth().signOut();
  //const { userProfile } = useContext(mainContext);
  const { signOutUser } = useContext(mainContext);
  const { inHome } = useContext(mainContext);

  // console.log(mainContext);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            display: "flex",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Title>Welcome, {currentUser?.displayName}</Title>
          <Image
            style={{
              marginHorizontal: 10,
              height: 40,
              width: 40,
              borderRadius: 30,
            }}
            source={{
              uri: currentUser.photoURL,
            }}
          />
        </View>
      </View>
      <Image source={Logo} style={{ margin: 30 }} />
      <Map />
      <View style={styles.box}>
        <Paragraph></Paragraph>
      </View>
      <View style={styles.box}>
        <Button onPress={() => signOutUser()} mode="contained" icon="logout">
          {loc.t("signout")}
        </Button>
      </View>
      <View style={styles.box}>
        <Button
          onPress={() => inHome()}
          icon="theme-light-dark"
          mode="contained"
        >
          {loc.t("theme")}
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;
