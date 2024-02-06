import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const ChatScreen = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  return (
    <View
      style={{
        backgroundColor: "#5C71B1",
        height: height,
        width: width,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        display: "flex",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#FFD3E4",
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          width: width * 0.97,
          height: height,
          marginTop: height * 0.01,
          display: "flex",
          alignItems: "center",
          paddingTop: height * 0.01,
        }}
      >
        <View style={{ display: "flex", alignItems: "center" }}>
          <Image
            source={require("../assets/pro5.png")}
            style={{
              height: 70,
              width: 70,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 50,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Manon</Text>
        </View>
        <View
          style={{
            backgroundColor: "#FFE5E7",
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            width: width * 0.97,
            height: height,
            marginTop: height * 0.01,
            borderColor: "white",
            borderWidth: 2,
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 330,
              left: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <TextInput
              placeholder="Ecrire un message..."
              textAlignVertical="center"
              style={{
                position: "relative",
                fontSize: 18,
                height: height * 0.055,
                width: width * 0.92,
                paddingHorizontal: 20,
                borderRadius: 50,
                marginHorizontal: width * 0.02,
                paddingRight: width * 0.15,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#5C71B1",
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 14,
                top: 4.5,
                height: height * 0.045,
                width: height * 0.045,
                backgroundColor: "#5C71B1",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" color={"white"} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
