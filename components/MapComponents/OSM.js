import React, { useEffect, useRef, useState, useContext } from "react";

import { View, StyleSheet, StatusBar, Image, Dimensions } from "react-native";
import { Text } from "react-native";
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import queryOverpass from "@derhuerst/query-overpass";
import { CustomMarker } from "./CustomMarker";
import { LocationContext } from "../../context/locationContext";

// const { width, height } = Dimensions.get("window");

export const OpenStreetMapScreen = () => {
  const { region, setRegion, location, hasLocationPermissions } =
    useContext(LocationContext);
  const _map = useRef(null);

  const [boundingBox, setBoundingBox] = useState({
    westLng: 0,
    southLat: 0,
    eastLng: 0,
    northLat: 0,
  });
  const [osmData, setOsmData] = useState([]);
  const [ready, setReady] = useState(true);

  // console.log("my region --", region);

  const getBoundingBox = async (region, scale = 1) => {
    /*
     * Latitude : max/min +90 to -90
     * Longitude : max/min +180 to -180
     */
    // Of course we can do it mo compact but it wait is more obvious
    const calcMinLatByOffset = (lng, offset) => {
      const factValue = lng - offset;
      if (factValue < -90) {
        return (90 + offset) * -1;
      }
      return factValue;
    };

    const calcMaxLatByOffset = (lng, offset) => {
      const factValue = lng + offset;
      if (90 < factValue) {
        return (90 - offset) * -1;
      }
      return factValue;
    };

    const calcMinLngByOffset = (lng, offset) => {
      const factValue = lng - offset;
      if (factValue < -180) {
        return (180 + offset) * -1;
      }
      return factValue;
    };

    const calcMaxLngByOffset = (lng, offset) => {
      const factValue = lng + offset;
      if (180 < factValue) {
        return (180 - offset) * -1;
      }
      return factValue;
    };

    const latOffset = (region.latitudeDelta / 2) * scale;
    const lngD =
      region.longitudeDelta < -180
        ? 360 + region.longitudeDelta
        : region.longitudeDelta;
    const lngOffset = (lngD / 2) * scale;

    return {
      minLat: calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
      minLng: calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
      maxLat: calcMaxLatByOffset(region.latitude, latOffset), // northLat - max lat
      maxLng: calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
    };
  };

  const onRegionChangeComplete = async (region) => {
    let boundingBox = await getBoundingBox(region);
    if (ready) {
      setRegion(region);
    }
    setBoundingBox(boundingBox);
  };

  const fetchOsmData = async () => {
    const coordString = Object.values(boundingBox).join(",");

    try {
      const response = await queryOverpass(`
           [out:json][timeout:25];
        node
          [amenity=toilets]
          (${coordString});
        out body;
      `);
      if (response) {
        // console.log("query response", response);
        setOsmData(response);
        return;
      }
    } catch (error) {
      console.log("query error", error);
    }
  };

  const onMapReady = (e) => {
    if (!ready) {
      setReady(true);
    }
  };

  useEffect(() => {
    fetchOsmData();
  }, [region]);

  // console.log("osm data ", osmData);
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
        {/* <CustomMarker text={loc.tags?.description} /> */}
      </Marker>
    ));
  };

  if (location === null) {
    return <Text>Finding your current location...</Text>;
  }

  if (hasLocationPermissions === false) {
    return <Text>Location permissions are not granted.</Text>;
  }

  if (region === null) {
    return <Text>Map region doesn't exist.</Text>;
  }

  return (
    <>
      <View style={styles.wrapper}>
        <MapView
          ref={_map}
          showsMyLocationButton
          onMapReady={onMapReady}
          region={region}
          initialRegion={{
            latitude: 39.97343096953564,
            latitudeDelta: 0.0922,
            longitude: -75.12520805829233,
            longitudeDelta: 0.0421,
          }}
          // onRegionChange={(region) => setRegion(region)}
          onRegionChangeComplete={(region) => onRegionChangeComplete(region)}
          provider={PROVIDER_GOOGLE}
          // mapType={MAP_TYPES.STANDARD}
          style={styles.map}
          zoom={1}
          followsUserLocation
          showsUserLocation
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
    // display: "flex",
    // alignContent: "center",
    // justifyContent: "center",
    width: 300,
    // height: 400,
    flex: 1,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
