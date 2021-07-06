import React, { useState, useEffect, createContext } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";

const LocationContext = createContext({});

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [city, setCity] = useState();

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const contextLatitude = location?.coords?.latitude;
  const contextLongitude = location?.coords?.longitude;

  useEffect(() => {
    getLocation();
  }, [city]);

  // console.log("location", location);

  useEffect(() => {
    if (location?.coords) {
      setRegion({
        latitude: contextLatitude,
        longitude: contextLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [location?.coords]);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) {
        return;
      } else {
        setLocationPermission(true);
      }

      const last = await Location.getLastKnownPositionAsync();

      if (last) setLocation(last);
      else {
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          // timeInterval: 1000, //this will poll for new data
        });
        setLocation(current);

        let place = await Location.reverseGeocodeAsync({
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        });
        console.log("place", place);

        setCity(place[0]?.city);
      }

      let place = await Location.reverseGeocodeAsync({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
      console.log("place", place);

      setCity(place[0]?.city);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("location ---", location?.coords);

  console.log("city ===", city);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        errorMsg,
        setErrorMsg,
        region,
        setRegion,
        hasLocationPermissions,
        city,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationContextProvider };
