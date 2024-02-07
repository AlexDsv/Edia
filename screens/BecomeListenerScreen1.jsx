import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const BecomeListenerScreen1 = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#5C71B1",
          borderRadius: 100,
          padding: 5,
          width: 40,
          height: 40,
          position: "absolute",
          left: 20,
          top: 30,
          zIndex: 1000,
        }}
        onPress={() => {
          navigation.navigate("Messages");
        }}
      >
        <Entypo name="chevron-left" size={30} color={"white"} />
      </TouchableOpacity>
      <Image
        source={require("../assets/BL1.png")}
        style={{ resizeMode: "contain", height: height * 0.6 }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#5C71B1",
          shadowColor: "#000",
          paddingVertical: 20,

          width: "70%",
          alignItems: "center",
          borderRadius: 100,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => {
          navigation.navigate("BecomeListener2");
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Démarrer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BecomeListenerScreen1;
