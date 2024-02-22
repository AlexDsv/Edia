import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../FirebaseConfig";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const BecomeListenerScreen3 = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const currentUser = FIREBASE_AUTH.currentUser;
  const userId = currentUser.uid;

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.canceled) {
        console.log("Sélection de document réussie :", result.assets[0]);
        setFile(result);
      } else {
        console.log("Sélection de document annulée");
        setFile(null);
      }
    } catch (error) {
      console.log("Erreur lors de la sélection du fichier : ", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la sélection du fichier."
      );
    }
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(FIREBASE_STORAGE, `documents/PP${userId}`);
      try {
        await uploadBytes(storageRef, file.assets[0].uri);
        console.log("Téléchargement réussi !");
        navigation.navigate("BecomeListener4");
      } catch (error) {
        console.error("Erreur lors du téléchargement du fichier :", error);
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors du téléchargement du fichier."
        );
      }
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
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
          navigation.navigate("Home");
        }}
      >
        <Entypo name="chevron-left" size={30} color={"white"} />
      </TouchableOpacity>
      <Image
        source={require("../assets/BL3.png")}
        style={{ resizeMode: "contain", height: height * 0.6 }}
      />
      <View
        style={{
          width: width,
          display: "flex",
          alignItems: "center",
          gap: 15,
          marginTop: -50,
        }}
      >
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
          onPress={pickDocument}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            {!file ? "Télécharger un fichier" : `${file.assets[0].name}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: file ? "#5C71B1" : "#ccc",
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
          onPress={handleUpload}
          disabled={!file}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BecomeListenerScreen3;
