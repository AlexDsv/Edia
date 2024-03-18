import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const SettingsScreen = () => {
  const navigation = useNavigation();

  const logout = async () => {
    await FIREBASE_AUTH.signOut();
    navigation.navigate("Login");
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "#5C71B1",
          borderRadius: 100,
          padding: 5,
          width: 40,
          height: 40,
          position: "absolute",
          left: 10,
          top: 35,
          zIndex: 1000,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Entypo name="chevron-left" size={30} color={"white"} />
      </TouchableOpacity>
      <View style={{ marginTop: height * 0.15 }}>
        <TouchableOpacity onPress={logout}>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text style={{ fontSize: 18 }}>Se déconnecter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
