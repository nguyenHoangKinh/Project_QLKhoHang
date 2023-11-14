import React, { useContext } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import LoginScreen from "../components/LoginScreen";
import SignUpScreen from "../components/SignUpScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import AddOrderScreen from "../components/AddOrderScreen";
import SeeOrderDetails from "../components/SeeOrderDetails";
import SplashScreen from "../components/SplashScreen";
import ChangePasswordScreen from "../components/ChangePasswordScreen";
import { AuthContext } from "../context/AuthContext";
import HomeNavigation from "./HomeNavigation";
import EditProfileScreen from "../components/EditProfileScreen";
import ProfileScreen from "../components/ProfileScreen";
import SeeWarehouseDetails from "../components/SeeOrderDetails";
import TotalProductScreen from "../components/TotalProductScreen";
import ListProduct from "../components/ListProduct";
import HomeNavigationUser from "../navigators/HomeNavigationUser";
import AddWarehouseScreen from "../components/AddWarehouseScreen";
import UpdateWarehouseScreen from "../components/UpdateWarehouseScreen";
import DetailWarehouseScreem from "../components/DetailWarehouseScreem";
import DetailWarehouseUserScreen from "../components/User/DetailWareHouseUser";
import WarehouseScreem from "../components/WarehouseScreen";
import ListAccountActive from "../components/Admin/ListAccountActive";
import HomeNavigationAdmin from "../navigators/HomeNavigationAdmin";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo, checkSignUp, splashLoading, getProfile } =
    useContext(AuthContext);
  // console.log(">>> hello",userInfo);
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
        ) : userInfo.accessToken && userInfo.others.isAdmin ? (
          <Stack.Screen
            name="HomeNavigationAdmin"
            component={HomeNavigationAdmin}
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
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
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
          name="AddWarehouseScreen"
          component={AddWarehouseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateWarehouseScreen"
          component={UpdateWarehouseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailWarehouseScreem"
          component={DetailWarehouseScreem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WarehouseScreem"
          component={WarehouseScreem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListAccountActive"
          component={ListAccountActive}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddOrderScreen"
          component={AddOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeeOrderDetails"
          component={SeeOrderDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeeWarehouseDetails"
          component={SeeWarehouseDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailWareHouseUser"
          component={DetailWarehouseUserScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
