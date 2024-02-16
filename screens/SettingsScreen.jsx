import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FIREBASE_AUTH from "../FirebaseConfig";

const SettingsScreen = () => {
  const logout = async () => {
    FIREBASE_AUTH.signOut();
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
