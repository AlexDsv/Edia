import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const logout = async () => {
    await FIREBASE_AUTH.signOut();
    navigation.navigate("Login");
  };
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
