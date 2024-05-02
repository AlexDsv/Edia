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
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
export default function HomeScreen() {
  const userId = FIREBASE_AUTH.currentUser.uid;

  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [availableListenersCount, setAvailableListenersCount] = useState(0);

  const getListenersCount = async () => {
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

    const listenersCollection = collection(FIRESTORE_DB, "listeners");
    const querySnapshot = await getDocs(listenersCollection);

    let availableListeners = [];
    let conversationId;

    querySnapshot.forEach((listenerDoc) => {
      const availabilities = listenerDoc.data().availabilities || [];
      availabilities.forEach((availability) => {
        if (
          availability.jour === currentDay &&
          availability.plage.name === plageHoraire
        ) {
          availableListeners.push({
            id: listenerDoc.id,
            firstName: listenerDoc.data().firstName,
          });
        }
      });
    });
    setAvailableListenersCount(availableListeners.length);
    console.log(availableListenersCount);
    if (availableListeners.length === 0) {
      throw new Error("Aucun écoutant disponible pour le moment.");
    }
  };
  useEffect(() => {
    getListenersCount();
  });
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

      const listenersCollection = collection(FIRESTORE_DB, "listeners");
      const querySnapshot = await getDocs(listenersCollection);

      let availableListeners = [];
      let conversationId;

      querySnapshot.forEach((listenerDoc) => {
        const availabilities = listenerDoc.data().availabilities || [];
        availabilities.forEach((availability) => {
          if (
            availability.jour === currentDay &&
            availability.plage.name === plageHoraire
          ) {
            availableListeners.push({
              id: listenerDoc.id,
              firstName: listenerDoc.data().firstName,
            });
          }
        });
      });

      if (availableListeners.length === 0) {
        throw new Error("Aucun écoutant disponible pour le moment.");
      }

      // Sélectionnez un écoutant disponible au hasard
      const randomIndex = Math.floor(Math.random() * availableListeners.length);
      const selectedListener = availableListeners[randomIndex];

      // Utilisez selectedListener.id pour obtenir l'ID de l'écoutant sélectionné
      const listenerId = selectedListener.id;
      const listenerName = selectedListener.firstName;

      // Recherchez une conversation existante entre l'utilisateur et l'écoutant
      const conversationsCollection = collection(FIRESTORE_DB, "conversations");
      const conversationQuerySnapshot = await getDocs(conversationsCollection);
      conversationQuerySnapshot.forEach((conversationDoc) => {
        if (
          (conversationDoc.data().listener === listenerId &&
            conversationDoc.data().user === userId) ||
          (conversationDoc.data().listener === userId &&
            conversationDoc.data().user === listenerId)
        ) {
          // Une conversation existe entre l'utilisateur et l'écoutant
          conversationId = conversationDoc.id;
        }
      });

      // Si une conversation existe, mettez à jour cette conversation en ajoutant le nouveau message
      if (conversationId) {
        await updateDoc(doc(FIRESTORE_DB, "conversations", conversationId), {
          messages: arrayUnion({
            content: messageContent,
            senderId: userId,
            timestamp: currentDate,
          }),
        });
        console.log("Message ajouté à la conversation existante !");
      } else {
        // Sinon, créez une nouvelle conversation avec le nouveau message
        const conversationRef = await addDoc(conversationsCollection, {
          listener: listenerId,
          listenerName: listenerName,
          user: userId,
          messages: [
            {
              content: messageContent,
              senderId: userId,
              timestamp: currentDate,
            },
          ],
        });
        console.log(
          "Nouvelle conversation créée avec succès ! ID:",
          conversationRef.id
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
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
              {availableListenersCount}{" "}
              {availableListenersCount === 1
                ? "écoutant est actuellement connecté et prêt à t’aider"
                : "écoutants sont actuellement connectés et prêts à t’aider"}
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
