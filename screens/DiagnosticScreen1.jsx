import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const DiagnosticScreen1 = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  useEffect(() => {
    console.log("Diagnostic start");
  }, []);

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></View>
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
  job: {
    fontSize: 14,
  },
  infos: {
    display: "flex",
  },
});

export default DiagnosticScreen1;
