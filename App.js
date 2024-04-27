import "react-native-gesture-handler";

import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MainNavigator from "./app/utils/MainNavigator";
import DrawerNavigator from "./app/utils/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LoginProvider from "./app/context/LoginProvider";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
