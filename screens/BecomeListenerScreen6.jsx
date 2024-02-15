import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importer les icônes Ionicons depuis Expo
import { useNavigation } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";

const joursSemaine = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const plagesDispo = [
  { name: "Matin", icon: "sunrise", plage: "8h-13h" },
  { name: "Après-midi", icon: "sun", plage: "13h-18h" },
  { name: "Soirée", icon: "sunset", plage: "18h-23h" },
  { name: "Nuit", icon: "moon", plage: "23h-8h" },
];

const BecomeListenerScreen6 = () => {
  const [disponibilites, setDisponibilites] = useState([]);
  const navigation = useNavigation();

  const toggleSlot = (jour, plage) => {
    const updatedDisponibilites = [...disponibilites];
    const index = updatedDisponibilites.findIndex(
      (dispo) => dispo.jour === jour && dispo.plage.name === plage.name
    );
    if (index !== -1) {
      updatedDisponibilites.splice(index, 1);
    } else {
      updatedDisponibilites.push({ jour, plage: { name: plage.name } });
    }
    setDisponibilites(updatedDisponibilites);
    console.log(updatedDisponibilites);
  };

  const isSlotSelected = (jour, plage) => {
    return disponibilites.some(
      (dispo) => dispo.jour === jour && dispo.plage.name === plage.name
    );
  };

  const handleContinue = () => {
    navigation.navigate("BecomeListener7");
  };

  const renderTable = () => {
    return joursSemaine.map((jour, index) => (
      <View key={jour} style={styles.row}>
        {<Text style={styles.rowText}>{jour}</Text>}
        {plagesDispo.map((plage) => (
          <TouchableOpacity
            key={`${plage.name}_${plage.icon}_${index}`}
            onPress={() => toggleSlot(jour, plage)}
            style={[
              styles.cell,
              isSlotSelected(jour, plage) && styles.selectedSlot,
            ]}
          >
            <Ionicons
              name={
                isSlotSelected(jour, plage)
                  ? "checkmark-circle-outline"
                  : "close-circle-outline"
              }
              size={25}
              color={isSlotSelected(jour, plage) ? "#5C71B1" : "#FFF0E5"}
            />
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
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
          navigation.navigate("BecomeListener5");
        }}
      >
        <Entypo name="chevron-left" size={30} color={"white"} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Disponibilités</Text>
      <View style={styles.header}>
        <View style={styles.emptyHeaderCell} />
        {plagesDispo.map((plage, index) => (
          <View
            key={`${plage.name}_${plage.icon}_${index}`}
            style={styles.headerCell}
          >
            <Text style={{ fontSize: 12 }}>{plage.plage}</Text>
            <Text style={styles.headerCellText}>{plage.name}</Text>
            <Feather name={plage.icon} size={20} color="black" />
          </View>
        ))}
      </View>
      <View>{renderTable()}</View>
      <TouchableOpacity
        style={{
          marginTop: 5,
          backgroundColor: "#5C71B1",
          shadowColor: "#000",
          paddingVertical: 20,
          width: "80%",
          alignItems: "center",
          borderRadius: 100,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={handleContinue}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 15,
  },
  emptyHeaderCell: {
    width: 45,
  },
  headerCell: {
    flexDirection: "column-reverse",
    alignItems: "center",
    width: 82,
  },
  headerCellText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rowText: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    width: 70,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 100,
    backgroundColor: "#5C71B1",
  },
  selectedSlot: {
    backgroundColor: "#94F4F4",
  },
});

export default BecomeListenerScreen6;
