import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";

const ImageUpload = (props) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { token } = props.route.params;
  const { setIsLoggedIn, setProfile } = useLogin();

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status == "granted") {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      type: "image/jpeg",
      uri: image,
    });
    try {
      const response = await client.post("/uploadPicture", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "JoeGwapo " + token,
        },
        onUploadProgress: (progress) => {
          const uploadProgress = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setProgress(uploadProgress); // Update the progress state
          console.log("Upload progress:", uploadProgress);
        },
      });

      if (response.data.success) {
        // props.navigation.dispatch(StackActions.replace("UserProfile"));
        setProfile(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadContainer}
        onPress={openImageLibrary}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <Text style={styles.uploadBtn}>Upload Profile Image</Text>
        )}
      </TouchableOpacity>
      <Text onPress={uploadImage} style={styles.skip}>
        Skip
      </Text>
      {image ? (
        <Text onPress={uploadImage} style={[styles.skip, styles.upload]}>
          Upload
        </Text>
      ) : null}
      {progress ? (
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
          {progress}%
        </Text>
      ) : (
        <Text>BOGO</Text>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    height: 150,
    width: 150,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 99,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "black",

    overflow: "hidden",
  },

  uploadBtn: {
    textAlign: "center",
    opacity: 0.5,
    fontSize: 16,
    fontWeight: "bold",
  },
  skip: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.5,
    color: "black",
    marginVertical: 5,
  },
  upload: {
    backgroundColor: "green",
    color: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});
