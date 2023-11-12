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
import EditProfileScreen from "../components/EditProfileScreen";
import ProfileScreen from "../components/ProfileScreen";
import TotalProductScreen from "../components/TotalProductScreen";
import ListProduct from "../components/ListProduct";
import HomeNavigationUser from "../navigators/HomeNavigationUser";
import EditProfileUser from "../components/user/EditProfileUser";
//import ListWareHouse from "../components/owners/ListWareHouse";
import DetailWarehouseUserScreen from "../components/user/DetailWareHouseUser";
import ListWareUser from "../components/user/ListWareUser";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo, checkSignUp, splashLoading } = useContext(AuthContext);
  // console.log(">>> hello",userInfo.accessToken);
  return (
    <NavigationContainer>
      {/* initialRouteName='Welcome' */}
      <Stack.Navigator initialRouteName="Home">
        {userInfo.accessToken && userInfo.others.isOwner ? (
          <Stack.Screen
            name="HomeNavigation"
            component={HomeNavigation}
            options={{ headerShown: false }}
          />
        ) : userInfo.accessToken && userInfo.others.isActive ? (
          <Stack.Screen
            name="HomeNavigationUser"
            component={HomeNavigationUser}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        {checkSignUp ? (
          <></>
        ) : (
          <>
            <Stack.Screen
              name="Register"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        {/* <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="AuthContext"
          component={AuthContext}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="TotalProductScreen"
          component={TotalProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListProduct"
          component={ListProduct}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EditProfileUser"
          component={EditProfileUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailWareHouseUser"
          component={DetailWarehouseUserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListWareUser"
          component={ListWareUser}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
