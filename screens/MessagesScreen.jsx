import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE_DB } from "../FirebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

const MessagesScreen = () => {
  const [conversations, setConversations] = useState([]);
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();

  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversationsCollection = collection(
          FIRESTORE_DB,
          "conversations"
        );
        const querySnapshot = await getDocs(conversationsCollection);
        const conversationsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const messages = data.messages || [];
          const sortedMessages = messages.sort(
            (a, b) => b.timestamp - a.timestamp
          );
          const lastMessage =
            sortedMessages.length > 0 ? sortedMessages[0].content : "";
          const lastMessageTime =
            sortedMessages.length > 0
              ? formatTime(sortedMessages[0].timestamp.toDate())
              : null;

          return {
            id: doc.id,
            listenerName: doc.listenerName,
            lastMessage,
            lastMessageTime,
            ...data,
          };
        });
        setConversations(conversationsData);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat", { conversationId: item.id });
      }}
    >
      <View style={styles.item}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../assets/mascot.png")}
              style={styles.picture}
            />
          </View>
          <View style={styles.infos}>
            <Text style={styles.name} numberOfLines={1}>
              {item.listenerName}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text numberOfLines={1} style={styles.lastMessage}>
                {item.lastMessage}
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {item.lastMessageTime}
              </Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 100,
            backgroundColor: "#4EAC2C",
          }}
        ></View> */}
      </View>
    </TouchableOpacity>
  );

  const [scrollY] = useState(new Animated.Value(0));
  const [listHeight, setListHeight] = useState(0);

  const handleListLayout = (event) => {
    setListHeight(event.nativeEvent.layout.height);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const indicatorStyle = {
    height: height * 0.08,
    backgroundColor: "#5C71B1",
    width: width * 0.04,
    position: "absolute",
    top: 0,
    borderRadius: 50,
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, listHeight],
    outputRange: [0, listHeight],
    extrapolate: "clamp",
  });
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Conversations</Text>
      <View style={{ width: width, marginTop: height * 0.02 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: width * 0.14,
            marginTop: height * 0.01,
          }}
        ></View>
      </View>
      <View style={{ height: height }}>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          onLayout={handleListLayout}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          height: height * 0.4,
          width: width * 0.04,
          backgroundColor: "#5C71B14D",
          position: "absolute",
          top: height * 0.15,
          right: width * 0.04,
          borderRadius: 50,
        }}
      >
        <Animated.View
          style={[
            indicatorStyle,
            {
              transform: [{ translateY }],
            },
          ]}
        />
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    width: "93%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    width: 160,
  },
  picture: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  lastMessage: {
    fontSize: 14,
  },
  infos: {
    display: "flex",
    width: "70%",
  },
});

export default MessagesScreen;
