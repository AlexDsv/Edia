import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";
import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SignUpScreen1 = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      navigation.navigate("SignUp");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.navigate("SignUp2");
    }
  };

  const progress = 33;

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
        source={require("../assets/mascot.png")}
        style={{
          resizeMode: "contain",
          height: height * 0.4,
          marginBottom: -height * 0.16,
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry={true}
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
            onPress={signUp}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Continuer</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SignUpScreen1;

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