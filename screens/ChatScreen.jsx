import React, { useState, useRef } from "react";
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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Bonjour, comment ça va ?", sender: "received" },
    { id: "2", text: "Salut ! Ça va bien, merci ! Et toi ?", sender: "sent" },
  ]);

  const navigation = useNavigation();
  const [inputText, setInputText] = useState("");

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

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
          source={require("../assets/pro5.png")}
          style={{
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 100,
            height: 60,
            width: 60,
          }}
        />
        <Text style={{ fontWeight: "bold" }}>Manon</Text>
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
                item.sender === "sent"
                  ? styles.messageSent
                  : styles.messageReceived,
              ]}
            >
              <Text style={{ color: "white" }}>{item.text}</Text>
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
});

export default ChatScreen;
