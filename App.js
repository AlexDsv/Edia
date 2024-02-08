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
import BecomeListenerScreen1 from "./screens/BecomeListenerScreen1";
import BecomeListenerScreen2 from "./screens/BecomeListenerScreen2";
import BecomeListenerScreen3 from "./screens/BecomeListenerScreen3";
import BecomeListenerScreen4 from "./screens/BecomeListenerScreen4";
import BecomeListenerScreen5 from "./screens/BecomeListenerScreen5";
import BecomeListenerScreen6 from "./screens/BecomeListenerScreen6";
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
        <Stack.Screen
          name="BecomeListener1"
          component={BecomeListenerScreen1}
        />
        <Stack.Screen
          name="BecomeListener2"
          component={BecomeListenerScreen2}
        />
        <Stack.Screen
          name="BecomeListener3"
          component={BecomeListenerScreen3}
        />
        <Stack.Screen
          name="BecomeListener4"
          component={BecomeListenerScreen4}
        />
        <Stack.Screen
          name="BecomeListener5"
          component={BecomeListenerScreen5}
        />
        <Stack.Screen
          name="BecomeListener6"
          component={BecomeListenerScreen6}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}
