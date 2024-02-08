import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const BecomeListenerScreen6 = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: "Sélectionnez vos disponibilités...",
    value: null,
  };

  const options = [
    { label: "Lundi", value: "Lundi" },
    { label: "Mardi", value: "Mardi" },
    { label: "Mercredi", value: "Mercredi" },
    { label: "Jeudi", value: "Jeudi" },
    { label: "Vendredi", value: "Vendredi" },
    { label: "Samedi", value: "Samedi" },
    { label: "Dimanche", value: "Dimanche" },
  ];
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/BL6.png")}
        style={{ resizeMode: "contain", height: height * 0.6 }}
      />
      <View>
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
          style={pickerSelectStyles}
        />
        {selectedValue && <Text>Selected: {selectedValue}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "red",
  },
  selectedOption: {
    marginTop: 20,
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: "#5C71B1",
    borderRadius: 50,
    backgroundColor: "white",
    color: "white",
    paddingRight: 30,
    marginTop: -50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default BecomeListenerScreen6;
