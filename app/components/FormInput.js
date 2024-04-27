import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const FormInput = (props) => {
  const { title, error } = props;
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
      <TextInput
        {...props}
        style={{
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        }}
      />
    </>
  );
};

export default FormInput;
