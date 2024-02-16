import * as React from "react";
import { useState, useEffect } from "react";
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
import BecomeListenerScreen7 from "./screens/BecomeListenerScreen7";
import LoginScreen from "./screens/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import SignUpScreen1 from "./screens/SignUpScreen1";
import SettingsScreen from "./screens/SettingsScreen";
import SignUpScreen2 from "./screens/SignUpScreen2";
const Stack = createNativeStackNavigator();
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log(user);
    });
  }, []);
  return (
    <NavigationContainer theme={{ colors: { background: "#FFF0E5" } }}>
      <Header />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ user }}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen name="SignUp1" component={SignUpScreen1} />
        <Stack.Screen name="SignUp2" component={SignUpScreen2} />
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
        <Stack.Screen
          name="BecomeListener7"
          component={BecomeListenerScreen7}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      {user ? <Footer /> : null}
    </NavigationContainer>
  );
}
