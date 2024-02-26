import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/mascot.png")}
        style={{
          resizeMode: "contain",
          height: height * 0.4,
          marginBottom: -height * 0.16,
          marginTop: -height * 0.03,
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
        <ActivityIndicator size="large" color="#5C71B1" />
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
            onPress={signIn}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp1");
            }}
            style={{ marginTop: height * 0.02 }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "black",
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              Pas encore de compte ? Clique-ici pour t'inscrire rapidement
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

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
