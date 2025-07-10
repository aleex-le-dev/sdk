import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import MarkerItem from "./MarkerItem";

export default function Map() {
  const initialRegion = {
    latitude: 50.552690015432,
    longitude: 2.418493974217,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [markers, setMarkers] = useState([
    {
      coordinate: { latitude: 50.552690015432, longitude: 2.418493974217 },
      isDragging: false,
    },

  ]);

  const addMarker = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers((current) => [...current, { coordinate, isDragging: false }]);
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
          onDragEnd={() => endStart(index)}
        >
          <MarkerItem isDragging={marker.isDragging} />
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
