import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
export default function HomeScreen() {
  const userId = FIREBASE_AUTH.currentUser.uid;

  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();

  const handleSendMessage = async (userId, messageContent) => {
    try {
      // Obtenez la disponibilité actuelle en fonction de l'heure actuelle
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentDay = currentDate
        .toLocaleDateString("fr-FR", {
          weekday: "short",
        })
        .slice(0, -1);

      let plageHoraire;
      if (currentHour >= 8 && currentHour < 13) {
        plageHoraire = "Matin";
      } else if (currentHour >= 13 && currentHour < 18) {
        plageHoraire = "Après-midi";
      } else if (currentHour >= 18 && currentHour < 23) {
        plageHoraire = "Soirée";
      } else {
        plageHoraire = "Nuit";
      }

      // Recherchez dans tous les documents de la collection "listeners"
      const listenersCollection = collection(FIRESTORE_DB, "listeners");
      const querySnapshot = await getDocs(listenersCollection);

      let listenerId;
      querySnapshot.forEach((doc) => {
        const availabilities = doc.data().availabilities || [];
        availabilities.forEach((availability) => {
          console.log(availability.jour, currentDay);
          console.log(availability.plage.name, plageHoraire);
          if (
            availability.jour === currentDay &&
            availability.plage.name === plageHoraire
          ) {
            console.log(
              `Match dispo trouvé: , ${availability.jour}/${currentDay} et ${availability.plage.name}/${plageHoraire}`
            );
            setDoc(doc(FIRESTORE_DB, "conversations"), {
              listener: listenerId,
              user: userId,
              message: message,
            });
            console.log("Requête créée avec succès !");
            return;
          }
        });
      });

      if (!listenerId) {
        throw new Error("Aucun écoutant disponible pour le moment.");
      }

      // Le reste de votre code pour créer la conversation et rediriger l'utilisateur...
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      // Affichez une alerte ou un message d'erreur à l'utilisateur pour l'informer qu'il y a eu un problème
    }
  };

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (message.trim() !== "") {
      await handleSendMessage(userId, message);
      setMessage("");
    } else {
      Alert.alert(
        "Vous devez écrire un message pour pouvoir être mis en relation avec un écoutant."
      );
    }
  };

  return (
    <View style={{ backgroundColor: "#FFF0E5" }}>
      <View
        style={{
          width: width,
          paddingLeft: width * 0.05,
          backgroundColor: "#FFF0E5",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Entypo name="cog" size={40} color={"black"} />
        </TouchableOpacity>
      </View>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View
          style={{
            height: height * 0.4,
            width: width,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFF0E5",
          }}
        >
          <Image
            source={require("../assets/HomePic.png")}
            style={{
              resizeMode: "contain",
              height: height * 0.6,
              marginTop: -height * 0.06,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#FFF0E5",
          }}
        >
          <TextInput
            placeholder="Ecris ici"
            multiline
            textAlignVertical="center"
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{
              position: "relative",
              fontSize: 24,
              height: height * 0.09,
              paddingHorizontal: 20,
              paddingTop: 20,
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
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 23,
              top: 4,
              height: height * 0.08,
              width: height * 0.08,
              backgroundColor: "#5C71B1",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleSubmit}
          >
            <Entypo name="chevron-right" color={"white"} size={50} />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: width * 0.14,
              marginTop: height * 0.01,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo name="user" size={20} style={{ marginRight: -15 }} />
              <Entypo
                name="dot-single"
                size={50}
                color={"#4EAC2C"}
                style={{ marginRight: -5 }}
              />
            </View>
            <Text style={{ fontSize: 14 }}>
              18 écoutants sont actuellement connectés et prêts à t’aider
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: width * 0.14,
              marginTop: height * 0.035,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BecomeListener1");
              }}
              style={{ paddingHorizontal: 10 }}
            >
              <Text
                style={{ textDecorationLine: "underline", textAlign: "center" }}
              >
                Tu souhaites devenir écoutant ? Clique-ici !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
