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

  const data = [
    {
      id: 1,
      name: "Julier BERGER",
      picture: require("../assets/pro1.png"),
      job: "Psychologuqe",
    },
    {
      id: 2,
      name: "Mathilde BLANCHARD",
      picture: require("../assets/pro2.png"),
      job: "Assistance sociale",
    },
    {
      id: 3,
      name: "Bruno SAUNIER",
      picture: require("../assets/pro3.png"),
      job: "Psychothérapeute",
    },
    {
      id: 4,
      name: "Noëlle PLESSIS",
      picture: require("../assets/pro4.png"),
      job: "Psychiatre",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <View>
          <Image source={item.picture} style={styles.picture} />
        </View>
        <View style={styles.infos}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.job}>{item.job}</Text>
        </View>
      </View>
      <View style={{ marginRight: 5 }}>
        <Entypo name="forward" size={30} />
      </View>
    </View>
  );

  const [scrollY] = useState(new Animated.Value(0));
  const [listHeight, setListHeight] = useState(0);

  const handleListLayout = (event) => {
    setListHeight(event.nativeEvent.layout.height);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const indicatorStyle = {
    height: height * 0.08,
    backgroundColor: "#5C71B1",
    width: width * 0.04,
    position: "absolute",
    top: 0,
    borderRadius: 50,
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, listHeight],
    outputRange: [0, listHeight],
    extrapolate: "clamp",
  });
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
      <View style={{ height: height }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          onLayout={handleListLayout}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          height: height * 0.4,
          width: width * 0.04,
          backgroundColor: "#5C71B14D",
          position: "absolute",
          top: height * 0.15,
          right: width * 0.04,
          borderRadius: 50,
        }}
      >
        <Animated.View
          style={[
            indicatorStyle,
            {
              transform: [{ translateY }],
            },
          ]}
        />
      </View>
      <View></View>
    </View>
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

export default LocationScreen;
