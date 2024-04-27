import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLogin } from "../context/LoginProvider";
import client from "../api/client";

const Drawer = createDrawerNavigator();

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Text>Open Drawer</Text>
      </Pressable>
      <Text>Home</Text>
    </View>
  );
};

const Task = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Task</Text>
    </View>
  );
};

const logout = async () => {
  try {
    const response = await client.post("/userSignOut");
  } catch (error) {}
};

const CustomDrawer = (props) => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            backgroundColor: "red",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.name}</Text>
            <Text>{profile.email}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar ||
                "https://res.cloudinary.com/duskrzpbj/image/upload/v1714147272/662bcec43af35230f3298d2d_profile.jpg?fbclid=IwZXh0bgNhZW0CMTAAAR2to9UObN0iMv94fVjrkpVCow-uNzashLR0D5oJejEKSqkMuF2EeP8ISpY_aem_AZnOssMXTRp8xDWlgXWQnpw2EhgIpRH5yLTSXMivVdnNlwlYJlhnhGGbK7uA1Z3UTN1W6U3l3TVj4Nw_1Sh-x_8W",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.logoutBtn,
          {
            top: pressed ? 4 : 0,
            left: pressed ? 4 : 0,
            shadowOpacity: pressed ? 0 : 1,
            backgroundColor: pressed ? "#FF474C" : "#efdddd",
          },
        ]}
        onPress={() => setIsLoggedIn(false)}
      >
        <MaterialCommunityIcons
          style={styles.logoutIcon}
          name="logout"
          size={20}
          color="red"
        />
        <Text style={{ color: "red", fontSize: 16 }}>Logout</Text>
      </Pressable>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerType: "slide",
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Task" component={Task} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#f0dddb80",
    shadowOffset: { width: 4, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,

    backgroundColor: "#efdddd",
    borderWidth: 1.5,
    borderBlockColor: "black",
    borderRadius: 15,
    padding: 20,
    margin: 20,
  },
});
