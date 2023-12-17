import { Pressable, Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderScreenUserUnfinished from "../components/user/OrderScreenUserUnfinished";
import OrderScreenUserUnpaid from "../components/user/OrderScreenUserUnpaid"; 
import OrderScreenUserPaid from "../components/user/OrderScreenUserPaid"; 
import OrderScreenUserInvoice from "../components/user/OrderScreenUserInvoice";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
const Tab = createMaterialTopTabNavigator();
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

export default TabOrderUser = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  const { userInfo, SearchOrder } = useContext(AuthContext);
  return (
    <>
      <View className="w-full mb-5" style={AppStyle.StyleOderList.header}>
        <View className="h-8 " style={AppStyle.StyleOderList.searchBar}>
          <Ionicons
            style={AppStyle.StyleOderList.iconSearch}
            name="search"
            size={23}
            color="black"
          />
          <TextInput
            placeholder="nhap ten kho "
            clearButtonMode="always"
            style={AppStyle.StyleOderList.search}
            autoCapitalize="none"
            autoCorrect={false}
            // onChangeText={(text) => {
            //   if (text.length > 0) {
            //     SearchOrder(text);
            //   } else {
            //     orderListUser(userInfo.accessToken);
            //   }
            // }}
          />
        </View>
        <Pressable style={AppStyle.StyleOderList.listFilter}>
          <Ionicons
            style={AppStyle.StyleOderList.iconFilter}
            name="options-outline"
            size={30}
            color="#16247d"
            // onPress={() => setModalVisible(true)}
          />
        </Pressable>
      </View>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: "#16247d",
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#fff" },
        }}
      >
        <Tab.Screen
          name="chưa xác nhận"
          component={OrderScreenUserUnfinished}
          options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={20}
                  color={focused ? "#16247d" : "#16247d"}
                />
              </View>
            );
          },
          tabBarLabelStyle: { fontSize: 8,fontWeight:"800" },
        }}
        />
        <Tab.Screen
          name="chưa thanh toán"
          component={OrderScreenUserUnpaid}
          options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="cart-minus"
                  size={20}
                  color={focused ? "#16247d" : "#16247d"}
                />
              </View>
            );
          },
          tabBarLabelStyle: { fontSize: 8,fontWeight:"800" },
        }}
        />
        <Tab.Screen
          name="đã thanh toán"
          component={OrderScreenUserPaid}
          options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="cart-check"
                  size={20}
                  color={focused ? "#16247d" : "#16247d"}
                />
              </View>
            );
          },
          tabBarLabelStyle: { fontSize: 8,fontWeight:"800" },
        }}
        />
        <Tab.Screen
          name="hoá đơn"
          component={OrderScreenUserInvoice}
          options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5
                  name="archive"
                  size={20}
                  color={focused ? "#16247d" : "#16247d"}
                />
              </View>
            );
          },
          tabBarLabelStyle: { fontSize: 8,fontWeight:"800" },
        }}
        />
      </Tab.Navigator>
    </>
  );
};
