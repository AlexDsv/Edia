import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSignUpContext } from "../SignUpContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { setDoc } from "firebase/firestore";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SignUpScreen3 = () => {
  const { signUpData, setSignUpData } = useSignUpContext();
  const progress = 66;
  const navigation = useNavigation();

  const signUp = async (email, password, firstName, age) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
        email: email,
        firstName: firstName,
        age: age,
      });
      console.log("Utilisateur créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };
  return (
    <View style={styles.container}>
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
          navigation.navigate("Login");
        }}
      >
        <Entypo name="chevron-left" size={30} color={"white"} />
      </TouchableOpacity>
      <ProgressBar progress={progress} />
      <Image
        source={require("../assets/signUpMascot.png")}
        style={{
          resizeMode: "contain",
          height: height * 0.5,
          marginBottom: -height * 0.06,
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={signUpData.firstName}
        onChangeText={(text) =>
          setFirstName({ ...signUpData, firstName: text })
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
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
            onPress={() => {}}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Continuer</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SignUpScreen3;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  input: {
    overflow: "hidden",
    position: "relative",
    fontSize: 24,
    height: height * 0.09,
    width: width * 0.9,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginHorizontal: width * 0.05,
    paddingRight: width * 0.2,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
});
