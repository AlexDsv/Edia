import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function HomeScreen() {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#FFF0E5" }}>
      <View
        style={{
          width: width,
          paddingLeft: width * 0.05,
          backgroundColor: "#FFF0E5",
        }}
      >
        <TouchableOpacity>
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
              style={{ padding: 5 }}
            >
              <Text
                style={{ textDecorationLine: "underline", textAlign: "center" }}
              >
                Tu souhaites devenir aidant ? Clique-ici pour nous contacter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
