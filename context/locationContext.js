import React, { useState, useEffect, createContext } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

const LocationContext = createContext({});

const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const last = await Location.getLastKnownPositionAsync();
      if (last) setLocation(last);
      else {
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          // timeInterval: 1000, //this will poll for new data
        });
        setLocation(current);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationContextProvider };
