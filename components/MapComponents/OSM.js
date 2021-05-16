import React, { useEffect, useRef, useState, useContext } from "react";

import { View, StyleSheet, StatusBar, Image, Dimensions } from "react-native";
import { Text } from "react-native";
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import queryOverpass from "@derhuerst/query-overpass";
import { CustomMarker } from "./CustomMarker";
import { LocationContext } from "../../context/locationContext";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

export const OpenStreetMapScreen = () => {
  const { location } = useContext(LocationContext);
  const _map = useRef(null);

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState({
    latitude: 51.510357,
    longitude: -0.116773,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [osmData, setOsmData] = useState([]);

  const contextLatitude = location?.coords?.latitude;
  const contextLongitude = location?.coords?.longitude;

  useEffect(() => {
    if (location?.coords) {
      console.log("qregion", region);
      setRegion({
        latitude: contextLatitude,
        longitude: contextLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [location?.coords]);

  const fetchOsmData = async () => {
    try {
      const response = await queryOverpass(`
      [out:json][timeout:25];
      node ["amenity"="toilets"]
      (51.49439676718,-0.14638423919678,51.519986109502,-0.12526988983154);
      out body;
    `);
      setOsmData(response);
    } catch (error) {
      console.log("query error", response);
    }
  };

  // console.log("test data ", osmData);

  useEffect(() => {
    fetchOsmData();
  }, []);

  const mapMarkers = () => {
    return osmData?.map((loc) => (
      <Marker
        // image={require("../../images/toilet.jpeg")}
        pinColor="green"
        key={loc.id}
        coordinate={{ latitude: loc.lat, longitude: loc.lon }}
        title={loc.tags?.amenity}
        description={loc.tags?.description}
      >
        <CustomMarker text={loc.tags?.description} />
      </Marker>
    ));
  };

  return (
    <>
      <View>
        <View style={{ alignItems: "center", justifyContent: "center" }}></View>
      </View>
      <View>
        <MapView
          ref={_map}
          showsMyLocationButton
          region={region}
          onRegionChangeComplete={(region) => setRegion(region)}
          provider={PROVIDER_GOOGLE}
          mapType={MAP_TYPES.STANDARD}
          rotateEnabled={false}
          style={styles.map}
          zoom={1}
          followsUserLocation
          showsUserLocation
          showsCompass
          zoomEnabled
          showsIndoors
          multiTouchControls
          zoomControlEnabled
          minZoomLevel={2}
        >
          {mapMarkers()}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: 400,
    height: 500,
  },
});
