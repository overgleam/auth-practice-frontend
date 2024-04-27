import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { isValidEmail, isValidObjectForm, updateError } from "../utils/methods";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

import client from "../api/client";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().min(3, "Invalid Name").required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const SignUpForm = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [error, setError] = useState("");

  // const submitForm = () => {
  //   if (isValidateForm()) {
  //     console.log(userInfo);
  //   }
  // };

  // const isValidateForm = () => {
  //   if (!isValidObjectForm(userInfo)) {
  //     return updateError("Please fill out all fields", setError);
  //   }

  //   if (!name.trim() || name.length < 3) {
  //     return updateError("Name must be at least 3 characters", setError);
  //   }

  //   if (!isValidEmail(email)) {
  //     return updateError("Invalid email address", setError);
  //   }

  //   if (password.length < 6) {
  //     return updateError("Password must be at least 6 characters", setError);
  //   }

  //   if (password !== confirmPassword) {
  //     return updateError("Passwords do not match", setError);
  //   }

  //   return true;
  // };

  const signUp = async (values, formikActions) => {
    // // setTimeout(() => {
    // console.log(values);
    // const res = await client.post("/createUser", { ...values });
    // console.log(res.data);
    // formikActions.resetForm();
    // formikActions.setSubmitting(false);
    // // }, 3000);
    try {
      const response = await client.post("/createUser", { ...values });

      if (response.data.success) {
        const signIn = await client.post("/userSignIn", {
          email: values.email,
          password: values.password,
        });
        if (signIn.data.success) {
          navigation.dispatch(
            StackActions.replace("ImageUpload", {
              token: signIn.data.token,
            })
          );
        }
      }
      if (!response.data.success) {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleSubmit,
        }) => {
          const { name, email, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={name}
                error={touched.name && errors.name}
                onBlur={handleBlur("name")}
                placeholder="Name"
                title="Name"
                onChangeText={handleChange("name")}
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onBlur={handleBlur("email")}
                placeholder="Email"
                title="Email"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onBlur={handleBlur("password")}
                placeholder="Password"
                title="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                placeholder="Confirm Password"
                title="Confirm Password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign Up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default SignUpForm;
