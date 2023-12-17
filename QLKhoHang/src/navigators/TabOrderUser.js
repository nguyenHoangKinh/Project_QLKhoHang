import { Pressable, Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderScreenUser1 from "../components/user/OrderScreenUserComplete";
import OrderScreenUser2 from "../components/user/OrderScreenUserUnfinished";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
const Tab = createMaterialTopTabNavigator();

export default TabOrderUser = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { orderListUser, userInfo, SearchOrder } = useContext(AuthContext);
  useEffect(() => {
    // call api
    orderListUser(userInfo.accessToken);
  }, []);
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
            onChangeText={(text) => {
              if (text.length > 0) {
                SearchOrder(text);
              } else {
                orderListUser(userInfo.accessToken);
              }
            }}
          />
        </View>
        <Pressable style={AppStyle.StyleOderList.listFilter}>
          <Ionicons
            style={AppStyle.StyleOderList.iconFilter}
            name="options-outline"
            size={30}
            color="#16247d"
            onPress={() => setModalVisible(true)}
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
          name="OrderScreenUser1"
          component={OrderScreenUser1}
          options={{ tabBarLabel: "Đơn Hoàng Thành" }}
        />
        <Tab.Screen
          name="OrderScreenUser2"
          component={OrderScreenUser2}
          options={{ tabBarLabel: "Đơn Chưa Hoàng Thành" }}
        />
      </Tab.Navigator>
    </>
  );
};
