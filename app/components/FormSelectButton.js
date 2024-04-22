import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import React from "react";

const FormSelectButton = ({ title, backgroundColor, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FormSelectButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: "#FFF",
  },
});
