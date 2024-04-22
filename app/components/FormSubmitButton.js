import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const FormSubmitButton = (props) => {
  const { title, submitting } = props;
  const backgroundColor = submitting ? "gray" : "blue";
  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          width: "100%",
          backgroundColor: backgroundColor,
          padding: 20,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({});
