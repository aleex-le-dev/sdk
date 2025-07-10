import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import MarkerItem from "./MarkerItem";
import * as ImagePicker from "expo-image-picker";

export default function Map() {
  const [libraryStatus, requestLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const initialRegion = {
    latitude: 50.552690015432,
    longitude: 2.418493974217,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [markers, setMarkers] = useState([
    // {
    //   coordinate: { latitude: 50.552690015432, longitude: 2.418493974217 },
    //   isDragging: false,
    //   imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqNqnr8-J5enuQU81PuPhc_qIMSi9cIDXlQ&s"
    // },
  ]);

  const addMarker = async (event) => {
    event.persist();
    if (!libraryStatus?.granted) {
      await requestLibraryPermission();
    }

    if (libraryStatus?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.5,
      });

      if (!result.canceled) {
        const { coordinate } = event.nativeEvent;
        setMarkers((current) => [...current, { coordinate, isDragging: false, imageSource:result.assets[0].uri}]);
      }
    }
  };

  const dragstart = (index) => {
    const MarkersCopy = [...markers];
    MarkersCopy[index].isDragging = true;
    setMarkers(MarkersCopy);
  };

  const endStart = (index) => {
    const MarkersCopy = [...markers];
    MarkersCopy[index].isDragging = false;
    setMarkers(MarkersCopy);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      zoomControlEnabled
      onPress={addMarker}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          draggable
          stopPropagation
          onDragStart={() => dragstart(index)}
          onDragEnd={() => endStart(index)}>
          <MarkerItem isDragging={marker.isDragging} imageSource={marker.imageSource} />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
