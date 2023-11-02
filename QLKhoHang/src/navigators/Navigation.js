import React, { useContext } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import LoginScreen from "../components/LoginScreen";
import SignUpScreen from "../components/SignUpScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import SplashScreen from "../components/SplashScreen";
import { AuthContext } from "../context/AuthContext";
import HomeNavigation from "./HomeNavigation";
import EditProfileScreen from '../components/EditProfileScreen';
import ProfileScreen from "../components/ProfileScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);
  // console.log(">>> hello",userInfo.accessToken);
  return (
    <NavigationContainer>
      {/* initialRouteName='Welcome' */}
      <Stack.Navigator initialRouteName='Home'>
        {userInfo.accessToken ? (
          <Stack.Screen name="HomeNavigation" component={HomeNavigation} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
