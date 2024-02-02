import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
const InfosScreen = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const data = [
    {
      id: 1,
      name: "Violences conjugales",
      number: "3919",
    },
    { id: 2, name: "Harcèlement scolaire", number: "3020" },
    { id: 3, name: "Enfants maltraités", number: "119" },
    { id: 4, name: "Prévention suicide", number: "3114" },
    { id: 5, name: "Drogues info service", number: "08 00 23 13 13" },
    { id: 6, name: "Cyberharcèlement", number: "3018" },
    { id: 7, name: "Joueurs info services", number: "0974751313" },
    { id: 8, name: "Alcool info services", number: "0980980930" },
    { id: 9, name: "Tabac info services", number: "3989" },
    { id: 10, name: "Fil santé jeunes", number: "0800235236" },
    { id: 11, name: "SOS homophobie", number: "0148064241" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.number}>
        <Entypo name="phone" size={15} /> {item.number}
      </Text>
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
    inputRange: [0, height - listHeight],
    outputRange: [0, height * 0.23],
    extrapolate: "clamp",
  });
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ height: height * 0.3 }}>
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
          height: height * 0.3,
          width: width * 0.04,
          backgroundColor: "#5C71B14D",
          position: "absolute",
          top: 0,
          right: width * 0.1,
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
      <Image
        source={require("../assets/infosEdia.png")}
        style={{
          resizeMode: "contain",
          height: height * 0.5,
          marginTop: -height * 0.05,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  number: {
    fontSize: 16,
    textAlign: "center",
  },
});
export default InfosScreen;
