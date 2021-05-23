import { StatusBar } from "expo-status-bar";
import React, { useState, useMemo, useEffect } from "react";
import { Appearance, View } from "react-native";
import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import Firebase from "./Firebase";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import mainContext from "./context/mainContext";

//console.log(i18n.locale);

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...DefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...DefaultTheme.colors,
    primary: "#718E57",
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...DarkTheme,
  dark: true,
  colors: { ...PaperDarkTheme.colors, ...DarkTheme.colors, primary: "#718E57" },
};

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import loc from "./utils/localization";
import { disableExpoCliLogging } from "expo/build/logs/Logs";
const AppStack = createStackNavigator();
if (Appearance.getColorScheme() === "dark") {
  status = true;
} else {
  status = false;
}

const App = ({ navigation }) => {
  //console.log(Firebase);
  const [isDarkTheme, setIsDarkTheme] = useState(status);
  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setReady] = useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const nativeBase = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  };

  useEffect(() => {
    nativeBase();
    setReady(true);
  });

  useEffect(() => {
    const authListener = Firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
      setIsLoading(false);
      setUserProfile(user);
    });
    // console.log("vdlsvldskvkl", user);
    return authListener;
  }, []);

  const Glogin = async () => {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({
        //return an object with result token and user
        iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
        androidClientId: Constants.manifest.extra.ANDROID_KEY, //From app.json
      });
      if (result.type === "success") {
        console.log(result);
        setIsLoading(true);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        Firebase.auth()
          .signInWithCredential(credential) //Login to Firebase
          .catch((error) => {
            console.log(error);
          });
      } else {
        //CANCEL
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  const doLogin = async (email, password) => {
    setIsLoading(true);
    //console.log('login' + JSON.stringify(userProfile));
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  const doSignup = async (name, email, password) => {
    setIsLoading(true);
    //console.log('login' + JSON.stringify(userProfile));
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  const mainC = useMemo(
    () => ({
      userProfile: { userProfile },
      inHome: () => setIsDarkTheme((isDark) => !isDark),
      signOutUser: () => Firebase.auth().signOut(),
      handleLogin: (email, password) => {
        doLogin(email, password);
      },
      handleSignup: (name, email, password) => {
        doSignup(name, email, password);
      },
      handleGLogin: () => {
        //The new login with google handler available to context
        Glogin();
      },
    }),
    []
  );

  if (isLoading) {
    // Checking if already logged in
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  // console.log("is user logged in?", userLogged);

  return (
    <mainContext.Provider value={mainC}>
      <PaperProvider theme={theme}>
        {isDarkTheme ? <StatusBar style="light" /> : <StatusBar style="dark" />}
        <NavigationContainer theme={theme}>
          <AppStack.Navigator initialRouteName="Login">
            {userLogged == false ? (
              <>
                <AppStack.Screen name="Login" component={LoginScreen} />

                <AppStack.Screen
                  name="Signup"
                  options={{ title: loc.t("signup") }}
                >
                  {() => <SignUpScreen />}
                </AppStack.Screen>
              </>
            ) : (
              <>
                <AppStack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </AppStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </mainContext.Provider>
  );
};

export default App;
