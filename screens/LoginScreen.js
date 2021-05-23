import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import Firebase from "../Firebase";
import { TextInput, Button } from "react-native-paper";
import loc from "../utils/localization";
import mainContext from "../context/mainContext";
import Logo from "../images/logo.png";
const LoginScreen = ({ navigation }) => {
  const { handleGLogin } = useContext(mainContext);
  const { handleLogin } = useContext(mainContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image source={Logo} style={{ margin: 30 }} width={300} height={200} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            onChangeText={(email) => setEmail(email)}
            value={email}
            label="Email"
            keyboardType={"email-address"}
            mode="outlined"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            secureTextEntry={true}
            label="Password"
            mode="outlined"
          />
        </View>
        <Button
          onPress={() => handleLogin(email, password)}
          mode="contained"
          icon="login"
        >
          {loc.t("loginButton")}
        </Button>

        <Button
          title={loc.t("noaccount")}
          onPress={() => navigation.navigate("Signup")}
        >
          {loc.t("noaccount")}
        </Button>
        <Button
          style={{ backgroundColor: "#4285F4", marginTop: 20 }}
          onPress={() => handleGLogin()}
          mode="contained"
          icon="google"
        >
          Login with Google
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
