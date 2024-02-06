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
import Header from "./components/Header";
import Footer from "./components/Footer";
import InfosScreen from "./screens/InfosScreen";
import LocationScreen from "./screens/LocationScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ChatScreen from "./screens/ChatScreen";
const Stack = createNativeStackNavigator();
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "#FFF0E5" } }}>
      <Header />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Infos" component={InfosScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}
