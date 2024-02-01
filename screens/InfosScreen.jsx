import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";

const InfosScreen = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const data = [
    {
      name: "Violences conjugales",
      number: "3919",
    },
    {
      name: "Harcèlement scolaire",
      number: "3020",
    },
    {
      name: "Enfants maltraités",
      number: "119",
    },
    {
      name: "Prévention suicide",
      number: "3114",
    },
    {
      name: "Drogues info service",
      number: "08 00 23 13 13",
    },
    {
      name: "Cyberharcèlement",
      number: "3018",
    },
    {
      name: "Joueurs info services",
      number: "0974751313",
    },
    {
      name: "Alcool info services",
      number: "0980980930",
    },
    {
      name: "Tabac info services",
      number: "3989",
    },
    {
      name: "Fil santé jeunes",
      number: "0800235236",
    },
    {
      name: "SOS homophobie",
      number: "0148064241",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.number}>{item.number}</Text>
    </View>
  );
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
      <Image
        source={require("../assets/infosEdia.png")}
        style={{
          resizeMode: "contain",
          height: height * 0.6,
          marginTop: -height * 0.06,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  number: {
    fontSize: 16,
  },
});
export default InfosScreen;
