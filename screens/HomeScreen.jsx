import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
export default function HomeScreen() {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  return (
    <View>
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
            height: height * 0.4,
            display: "flex",
          }}
        >
          <TextInput
            placeholder="Ecris ici"
            editable
            style={{
              position: "relative",
              fontSize: 24,
              height: height * 0.09,
              padding: 20,
              borderRadius: 50,
              marginHorizontal: width * 0.05,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          />
          <View
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
          >
            <Entypo name="chevron-right" color={"white"} size={50} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
