import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import FormHeader from "./app/components/FormHeader";
import FormSelectButton from "./app/components/FormSelectButton";
import LoginForm from "./app/components/LoginForm";
import SignUpForm from "./app/components/SignUpForm";
import { useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const { width } = Dimensions.get("window");

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://192.168.1.16:3000/");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 90],
    extrapolate: "clamp",
  });

  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["#FF0000", "#000000"],
    extrapolate: "clamp",
  });

  const signUpColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["#000000", "#FF0000"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={{ height: 80 }}>
        <FormHeader
          leftHeading="Welcome "
          rightHeading="to Bogog Mama"
          subHeading="Joseph Alforque App"
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
          rightHeaderOpacity={rightHeaderOpacity}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 20 }}>
        <FormSelectButton
          title="Login"
          backgroundColor={loginColorInterpolate}
          onPress={() => scrollView.current.scrollTo({ x: 0 })}
        />
        <FormSelectButton
          title="Register"
          backgroundColor={signUpColorInterpolate}
          onPress={() => scrollView.current.scrollTo({ x: width })}
        />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: animation } },
            },
          ],
          { useNativeDriver: false }
        )}
      >
        <LoginForm />
        <ScrollView>
          <SignUpForm />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
  },
});
