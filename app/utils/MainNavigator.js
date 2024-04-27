import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppForm from "../components/AppForm";
import ImageUpload from "../components/ImageUpload";
import UserProfile from "../components/UserProfile";
import { useLogin } from "../context/LoginProvider";
import DrawerNavigator from "./DrawerNavigator";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AppForm"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AppForm" component={AppForm} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();

  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};

export default MainNavigator;
