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
import { SignUpProvider } from "./SignUpContext";
import SignUpScreen3 from "./screens/SignUpScreen3";
import { BecomeListenerProvider } from "./BecomeListenerContext";
import BecomeListenerScreen8 from "./screens/BecomeListenerScreen8";
import DiagnosticScreen1 from "./screens/DiagnosticScreen1";
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
    <SignUpProvider>
      <BecomeListenerProvider>
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
                options={{ gestureEnabled: false }}
              />
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ gestureEnabled: false }}
              />
            )}
            <Stack.Screen
              name="SignUp1"
              component={SignUpScreen1}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="SignUp2"
              component={SignUpScreen2}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="SignUp3"
              component={SignUpScreen3}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Infos"
              component={InfosScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Messages"
              component={MessagesScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener1"
              component={BecomeListenerScreen1}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener2"
              component={BecomeListenerScreen2}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener3"
              component={BecomeListenerScreen3}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener4"
              component={BecomeListenerScreen4}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener5"
              component={BecomeListenerScreen5}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener6"
              component={BecomeListenerScreen6}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener7"
              component={BecomeListenerScreen7}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BecomeListener8"
              component={BecomeListenerScreen8}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="DiagnosticScreen1"
              component={DiagnosticScreen1}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ gestureEnabled: false }}
            />
          </Stack.Navigator>
          {user ? <Footer /> : null}
        </NavigationContainer>
      </BecomeListenerProvider>
    </SignUpProvider>
  );
}
