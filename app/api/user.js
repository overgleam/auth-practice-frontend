import AsyncStorage from "@react-native-async-storage/async-storage";

export const userSignIn = async (email, password) => {
  try {
    setLoginPending(true);
    const responsePromise = client.post("/userSignIn", {
      email,
      password,
    });

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 10000); // Replace YOUR_TIMEOUT_DURATION with the desired timeout duration in milliseconds
    });

    const response = await Promise.race([responsePromise, timeoutPromise]);

    if (response.data.success === true) {
      const token = response.data.token;
      await AsyncStorage.setItem("token", response.data.token);
    } else {
      Alert.alert(response.data.message);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  } finally {
    formikActions.setSubmitting(false);
  }
  setLoginPending(false);
};
