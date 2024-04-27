import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { isValidEmail, isValidObjectForm, updateError } from "../utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";

import client from "../api/client";
import { useLogin } from "../context/LoginProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  // const { email, password } = userInfo;

  // const [error, setError] = useState("");

  // const isValidateForm = () => {
  //   if (!isValidObjectForm(userInfo)) {
  //     return updateError("Please fill out all fields", setError);
  //   }
  //   if (!isValidEmail(email)) {
  //     return updateError("Invalid email address", setError);
  //   }
  //   if (password.length < 6) {
  //     return updateError("Password must be at least 6 characters", setError);
  //   }

  //   return true;
  // };

  const submitForm = async (values, formikActions) => {
    try {
      const response = await client.post("/userSignIn", { ...values });

      if (response.data.success === true) {
        setProfile(response.data.user);
        setIsLoggedIn(true);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      formikActions.setSubmitting(false);
    }
  };

  // const handleOnChangeText = (text, key) => {
  //   setUserInfo({ ...userInfo, [key]: text });
  // };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          const { email, password } = values;
          return (
            <>
              <FormInput
                value={email}
                error={touched.email && errors.email}
                placeholder="Email"
                title="Email"
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                onChangeText={handleChange("email")}
              />
              <FormInput
                value={password}
                placeholder="Password"
                title="Password"
                error={touched.password && errors.password}
                onBlur={handleBlur("password")}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("password")}
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Login"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
