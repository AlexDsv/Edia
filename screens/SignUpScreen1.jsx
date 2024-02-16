import { View, Text, TextInput } from "react-native";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import FIREBASE_DB from "../FirebaseConfig";

const SignUpScreen1 = () => {
  const db = FIREBASE_DB;
  return (
    <View>
      <Text>Prénom</Text>
      <TextInput placeholder="Prénom" />
    </View>
  );
};

export default SignUpScreen1;
