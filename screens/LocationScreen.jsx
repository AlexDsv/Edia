import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";

const LocationScreen = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Demander la permission de localisation lorsque le composant est monté
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission de localisation refusée");
        return;
      }

      // Obtenir la position de l'utilisateur
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Obtenir l'adresse à partir des coordonnées
      try {
        let geocode = await LocationGeocoding.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        setAddress(geocode[0]);
        console.log(address);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse:", error);
      }
    })();
  }, []);

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Professionnels autour de toi :
      </Text>
      <View style={{ width: width, marginTop: height * 0.02 }}>
        <TextInput
          placeholder="Entrez une adresse ici"
          textAlignVertical="center"
          value={
            address
              ? `${address.streetNumber} ${address.street}, ${address.postalCode} ${address.city}`
              : ""
          }
          style={{
            position: "relative",
            fontSize: 18,
            height: height * 0.055,
            paddingHorizontal: 20,
            borderRadius: 50,
            marginHorizontal: width * 0.05,
            paddingRight: width * 0.15,
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
            top: 5,
            height: height * 0.045,
            width: height * 0.045,
            backgroundColor: "#5C71B1",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="magnifying-glass" color={"white"} size={25} />
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
        ></View>
      </View>
    </View>
  );
};

export default LocationScreen;
