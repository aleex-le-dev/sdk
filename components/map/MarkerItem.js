import { Image, StyleSheet, View } from "react-native";

export default function MarkerItem({ isDragging, imageSource }) {
  return (
    <View>
    {imageSource && ( 
    <Image
      style={[styles.image, { borderColor: isDragging ? "#8a00c9" : "#fff" }]}
      source={{
        uri: imageSource,
      }}
      resizeMode="cover"
    />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 12,
    borderWidth: 1,
  },
});