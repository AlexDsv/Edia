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
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const MessagesScreen = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      name: "Manon",
      picture: require("../assets/pro5.png"),
      lastMessage: "De nouveau depuis notre dernier échange ?",
      lastMessageTime: "18:12",
    },
    {
      id: 2,
      name: "Ecoutant anonyme",
      picture: require("../assets/pro6.png"),
      lastMessage:
        "Depuis 2 semaines je me sens vraiment mieux, merci beaucoup à vous <3",
      lastMessageTime: "22:31",
    },
    {
      id: 3,
      name: "Eva",
      picture: require("../assets/pro7.png"),
      lastMessage:
        "Merci beaucoup pour vos conseils, je vais essayer de les appliquer !",
      lastMessageTime: "09:41",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat");
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
            <Image source={item.picture} style={styles.picture} />
          </View>
          <View style={styles.infos}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
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
        <View
          style={{
            marginRight: 5,
            width: 15,
            height: 15,
            borderRadius: 100,
            backgroundColor: "#4EAC2C",
          }}
        ></View>
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
          data={data}
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
    width: "90%",
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
  },
  lastMessage: {
    fontSize: 14,
  },
  infos: {
    display: "flex",
    width: "60%",
  },
});

export default MessagesScreen;
