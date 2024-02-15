import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const BecomeListenerScreen7 = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image
        source={require("../assets/BL7.png")}
        style={{ resizeMode: "contain", height: height * 0.6 }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#5C71B1",
          shadowColor: "#000",
          paddingVertical: 20,

          width: "80%",
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
          navigation.navigate("Home");
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          Retourner à l'accueil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BecomeListenerScreen7;
