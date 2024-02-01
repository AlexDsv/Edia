import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "#FFF0E5" } }}>
      <SafeAreaView
        style={{
          backgroundColor: "#FFF0E5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/Edia.png")}
          style={{ resizeMode: "contain", height: height * 0.08 }}
        />
        <View style={{ width: width, paddingLeft: width * 0.05 }}>
          <TouchableOpacity>
            <Entypo name="cog" size={40} color={"black"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#5C71B1",
          borderRadius: 20,
          height: height * 0.13,
          width: width,
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="info-with-circle" size={50} color={"#FFE5E7"} />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="home" size={50} color={"#FFE5E7"} />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="location" size={50} color={"#FFE5E7"} />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="message" size={50} color={"#FFE5E7"} />
        </View>
      </View>
    </NavigationContainer>
  );
}
