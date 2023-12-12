import React, { useContext } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import LoginScreen from "../components/LoginScreen";
import SignUpScreen from "../components/SignUpScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import AddOrderScreen from "../components/user/AddOrderScreen";
import DetailOrderUser from "../components/user/DetailOrderUser";
import DetailOrderOwner from "../components/owners/DetailOrderOwner";
import TabOrderUser from "./TabOrderUser";
import ChangePasswordScreen from "../components/ChangePasswordScreen";
import { AuthContext } from "../context/AuthContext";
import HomeNavigationOwner from "./HomeNavigationOwner";
import EditProfileScreen from "../components/EditProfileScreen";
import ProfileScreen from "../components/ProfileScreen";
import DetaiBlogUser from "../components/user/DetaiBlogUser";
import OrderScreenUser1 from "../components/user/OrderScreenUserUnfinished";
import OrderScreenUser2 from "../components/user/OrderScreenUserComplete";
import SeeWarehouseDetails from "../components/user/DetailOrderUser";
import HomeNavigationUser from "../navigators/HomeNavigationUser";
import AddWarehouseScreen from "../components/AddWarehouseScreen";
import UpdateWarehouseScreen from "../components/UpdateWarehouseScreen";
import DetailWarehouseScreem from "../components/DetailWarehouseScreem";
import DetailWarehouseUserScreen from "../components/user/DetailWareHouseUser";
import WarehouseScreem from "../components/WarehouseScreen";
import ListAccountActive from "../components/Admin/ListAccountActive";
import HomeNavigationAdmin from "../navigators/HomeNavigationAdmin";
import UploadImageProfile from "../components/UploadImageProfile";
import Button from "../components/Button";
import DetailAcount from "../components/Admin/DetailAccount";
import ListBlogOwner from "../components/ListBlogOwner";
import UpdateBlog from "../components/UpdateBlog";
import AddPostOwner from "../components/AddPostOwner";
import UpdatePostOwner from "../components/UpdatePostOwner";
import UserChat from "../components/user/UserChat";
import OwnerChat from "../components/owners/OwnerChat";
import ChatMessagesScreen from "../components/ChatMessagesScreen";

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
            name="HomeNavigationOwner"
            component={HomeNavigationOwner}
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
        <Stack.Screen
          name="TabOrderUser"
          component={TabOrderUser}
          options={{ headerShown: false }}
        />
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
          name="UploadImageProfile"
          component={UploadImageProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Button"
          component={Button}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddOrderScreen"
          component={AddOrderScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="SeeOrderDetails"
          component={SeeOrderDetails}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="DetailOrderUser"
          component={DetailOrderUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailOrderOwner"
          component={DetailOrderOwner}
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
        <Stack.Screen
          name="DetailAcount"
          component={DetailAcount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListBlogOwner"
          component={ListBlogOwner}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="UpdateBlog"
          component={UpdateBlog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetaiBlogUser"
          component={DetaiBlogUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPostOwner"
          component={AddPostOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePostOwner"
          component={UpdatePostOwner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderScreenUser1"
          component={OrderScreenUser1}
          options={{ tabBarLabel: "Đơn Hoàng Thành" }}
        />
        <Stack.Screen
          name="OrderScreenUser2"
          component={OrderScreenUser2}
          options={{ tabBarLabel: "Đơn Chưa Hoàng Thành" }}
        />
        <Stack.Screen
          name="UserChat"
          component={UserChat}
          options={{ tabBarLabel: "Đơn Chưa Hoàng Thành" }}
        />
        <Stack.Screen
          name="OwnerChat"
          component={OwnerChat}
          options={{ tabBarLabel: "Đơn Chưa Hoàng Thành" }}
        />
        <Stack.Screen
          name="ChatMessagesScreen"
          component={ChatMessagesScreen}
          options={{ tabBarLabel: "Đơn Chưa Hoàng Thành" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
