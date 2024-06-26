import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const Header = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF0E5",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/Edia.png")}
        style={{
          resizeMode: "contain",
          height: height * 0.06,
          marginBottom: height * 0.03,
        }}
      />
    </SafeAreaView>
  );
};

export default Header;
