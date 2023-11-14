import React from "react";
import { Text, Platform, View } from "react-native";
import HomeScreen from "../components/HomeScreen";
import ProfileScreen from "../components/ProfileScreen";
import OrderScreen from "../components/OrderScreen";
import StatisticsScreen from "../components/StatisticsScreen";
import WarehouseScreen from "../components/WarehouseScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ListWareUser from '../components/user/ListWareUser';
import ProfileUserScreen from "../components/user/FrofileUser";

const HomeNavigationUser = () => {
    const Tab = createBottomTabNavigator()
    const screenOptions = {
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
            bckground: "#fff"
        }
    }
    return (
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen                                 
                    name="ListWareUser"
                    component={ListWareUser}
                    // name="Warehouse"
                    // component={WarehouseScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <FontAwesome5 name="warehouse" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Warehouse</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Order"
                    component={OrderScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Entypo name="text-document" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Order</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
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
                                        borderRadius: Platform.OS == "ios" ? 25 : 30
                                    }}
                                >
                                    <Entypo name="home" size={24} color={focused ? "#111" : "#fff"} />
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Statistics"
                    component={StatisticsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    {/* <Ionicons name="stats-chart" size={24} color={focused ? "#16247d" : "#111"} /> */}
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Statistics</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Entypo name="user" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Profile</Text> 
                                </View>
                            )
                        }
                    }}
                />
            </Tab.Navigator>
    )
}

export default HomeNavigationUser;