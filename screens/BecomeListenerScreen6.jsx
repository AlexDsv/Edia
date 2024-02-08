import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const BecomeListenerScreen6 = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choisissez une option :</Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
        {/* Ajoutez d'autres options au besoin */}
      </Picker>
      <Text style={styles.selectedOption}>
        Option sélectionnée : {selectedOption}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#5C71B1",
    borderRadius: 5,
  },
  selectedOption: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default BecomeListenerScreen6;
