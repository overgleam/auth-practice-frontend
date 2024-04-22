import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";

const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX,
  rightHeaderTranslateY,
  rightHeaderOpacity,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.leftHeading,
            { transform: [{ translateX: leftHeaderTranslateX }] },
          ]}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.rightHeading,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTranslateY }],
            },
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftHeading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  rightHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000",
  },
  subHeading: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
