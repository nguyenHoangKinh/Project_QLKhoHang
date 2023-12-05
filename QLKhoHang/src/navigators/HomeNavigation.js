import React from "react";
import { Text, Platform, View } from "react-native";
import HomeScreen from "../components/HomeScreen";
import ProfileScreen from "../components/ProfileScreen";
import OrderScreenOwner from "../components/owners/OrderScreenOwner";
import StatisticsScreen from "../components/StatisticsScreen";
import WarehouseScreen from "../components/WarehouseScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons,MaterialCommunityIcons,FontAwesome5,FontAwesome,Entypo } from "@expo/vector-icons";


export default function HomeNavigation() {
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 50,
      bckground: "#fff", 
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Warehouse"
        component={WarehouseScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5
                  name="warehouse"
                  size={24}
                  color={focused ? "#16247d" : "#16247d"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>
                  Warehouse
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="OrderScreenOwner"
        component={OrderScreenOwner}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name={ focused ? "text-document-inverted" : "text-document"}
                  size={24}
                  color={focused ? "#16247d" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>Order</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#16247d",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                }}
              >
                <Entypo
                  name="home"
                  size={24}
                  color="#fff"
                />
              </View>
            );
          },
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name={ focused ? "message-processing" : "message-processing-outline"}
                  size={24}
                  color={focused ? "#16247d" : "#16247d"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>
                  Statistics
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name={focused ? "user-circle-o" : "user-circle"}
                  size={24}
                  color={focused ? "#16247d" : "#16247d"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>Profile</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
