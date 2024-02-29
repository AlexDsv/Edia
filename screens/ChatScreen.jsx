import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ChatScreen = ({ route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    photo: require("../assets/mascot.png"),
  });
  const [inputText, setInputText] = useState("");
  const userId = FIREBASE_AUTH.currentUser.uid;
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchMessagesAndUserDetails = async () => {
      try {
        // Récupérer le document de la conversation depuis Firestore
        const conversationDocRef = doc(
          FIRESTORE_DB,
          "conversations",
          conversationId
        );
        const conversationDocSnapshot = await getDoc(conversationDocRef);
        const conversationData = conversationDocSnapshot.data();
        console.log(conversationData.messages);
        // Vérifier si le document de la conversation existe
        if (conversationDocSnapshot.exists()) {
          // Récupérer les messages de la conversation depuis le champ 'messages'
          const messagesData = conversationData.messages || []; // Si le champ 'messages' est vide, utilisez un tableau vide par défaut
          setMessages(messagesData);

          // Vérifier et déterminer les détails de l'utilisateur
          if (conversationData.userId === userId) {
            setUserDetails({
              name: conversationData.userName,
              photo: conversationData.userPhoto
                ? { uri: conversationData.userPhoto }
                : require("../assets/mascot.png"),
            });
          } else {
            setUserDetails({
              name: conversationData.listenerName,
              photo: conversationData.listenerPhoto
                ? { uri: conversationData.listenerPhoto }
                : require("../assets/mascot.png"),
            });
          }
        } else {
          console.log("Document de conversation non trouvé.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des messages et des détails de l'utilisateur:",
          error
        );
      }
    };

    fetchMessagesAndUserDetails();
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    // Envoi du message à Firestore
    // ...

    // Mise à jour de l'état local avec le nouveau message
    setMessages([
      ...messages,
      { id: (messages.length + 1).toString(), text: inputText, sender: "sent" },
    ]);

    setInputText("");
    // Faire défiler vers le bas pour afficher le dernier message
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFD3E4",
        display: "flex",
        justifyContent: "space-between",
        borderWidth: 8,
        borderColor: "#5C71B1",
        borderTopLeftRadius: 25,
        paddingBottom: height * 0.1,
        borderTopRightRadius: 25,
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
          navigation.navigate("Messages");
        }}
      >
        <Entypo name="chevron-left" size={30} color={"white"} />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          marginTop: height * 0.01,
        }}
      >
        <Image
          source={userDetails.photo} // À adapter selon la structure de vos données utilisateur
          style={{
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 100,
            height: 60,
            width: 60,
          }}
        />
        <Text style={{ fontWeight: "bold" }}>{userDetails.name}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Ajustement pour iOS
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.senderId === userId
                  ? styles.messageSent
                  : styles.messageReceived,
              ]}
            >
              <Text style={styles.messagesText}>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ecrire un message..."
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#5C71B1",
              borderRadius: 100,
              padding: 5,
            }}
            onPress={sendMessage}
          >
            <Entypo name="chevron-right" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#FFF0E5",
    borderWidth: 2,
    borderColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.63,
  },
  messageReceived: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: "#26252A",
    maxWidth: "80%",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageSent: {
    alignSelf: "flex-end",
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: "#009EF6",
    maxWidth: "80%",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0E5",
    paddingVertical: 18,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#5C71B1",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  messagesText: {
    color: "white",
    fontSize: 16,
  },
});

export default ChatScreen;
