import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, style.container]}>
      <LottieView
        style={{ height: 200, width: 200 }}
        source={require("../../assets/Animation.json")}
        autoPlay
        loop
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Loading...
      </Text>
      <LottieView
        style={{ height: 200, width: 200 }}
        source={require("../../assets/loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoader;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 100,
  },
});
