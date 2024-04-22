import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { isValidEmail, isValidObjectForm, updateError } from "../utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const { email, password } = userInfo;

  const [error, setError] = useState("");

  const isValidateForm = () => {
    if (!isValidObjectForm(userInfo)) {
      return updateError("Please fill out all fields", setError);
    }
    if (!isValidEmail(email)) {
      return updateError("Invalid email address", setError);
    }
    if (password.length < 6) {
      return updateError("Password must be at least 6 characters", setError);
    }

    return true;
  };

  const submitForm = () => {
    if (isValidateForm()) {
      console.log(userInfo);
    }
  };

  const handleOnChangeText = (text, key) => {
    setUserInfo({ ...userInfo, [key]: text });
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      ) : null}
      <FormInput
        value={email}
        placeholder="Email"
        title="Email"
        autoCapitalize="none"
        onChangeText={(text) => {
          handleOnChangeText(text, "email");
        }}
      />
      <FormInput
        value={password}
        placeholder="Password"
        title="Password"
        secureTextEntry
        onChangeText={(text) => {
          handleOnChangeText(text, "password");
        }}
      />
      <FormSubmitButton onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
