import {
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Footer = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("home");
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#5C71B1",
        borderRadius: 20,
        height: height * 0.1,
        paddingBottom: height * 0.015,
        width: width,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Infos");
          setActiveScreen("infos");
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo
            name="info-with-circle"
            size={40}
            color={activeScreen === "infos" ? "#E5A7D3" : "#FFE5E7"}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          setActiveScreen("home");
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo
            name="home"
            size={40}
            color={activeScreen === "home" ? "#E5A7D3" : "#FFE5E7"}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Location");
          setActiveScreen("location");
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo
            name="clipboard"
            size={40}
            color={activeScreen === "location" ? "#E5A7D3" : "#FFE5E7"}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Messages");
          setActiveScreen("messages");
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo
            name="message"
            size={40}
            color={activeScreen === "messages" ? "#E5A7D3" : "#FFE5E7"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
