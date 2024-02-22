import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useBecomeListenerContext } from "../BecomeListenerContext";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const BecomeListenerScreen5 = () => {
  const navigation = useNavigation();
  const { becomeListenerData, setBecomeListenerData } =
    useBecomeListenerContext();
  const handleContinue = () => {
    navigation.navigate("BecomeListener6");
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
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
            navigation.navigate("BecomeListener4");
          }}
        >
          <Entypo name="chevron-left" size={30} color={"white"} />
        </TouchableOpacity>
        <Image
          source={require("../assets/BL5.png")}
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
          <TextInput
            placeholder="Ecris ici"
            textAlignVertical="center"
            value={becomeListenerData.firstName}
            onChangeText={(text) =>
              setBecomeListenerData({ ...becomeListenerData, firstName: text })
            }
            style={{
              position: "relative",
              fontSize: 24,
              width: "90%",
              height: height * 0.09,
              paddingHorizontal: 20,
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
            onPress={handleContinue}
          >
            <Entypo name="chevron-right" color={"white"} size={50} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BecomeListenerScreen5;
