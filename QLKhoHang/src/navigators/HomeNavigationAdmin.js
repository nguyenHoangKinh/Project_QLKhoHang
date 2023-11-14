import React from "react";
import { Text, Platform, View } from "react-native";
import HomeScreen from "../components/HomeScreen";
import ProfileScreen from "../components/ProfileScreen";
import ListAccountNotActive from "../components/Admin/ListAccountNotActive";
import StatisticsScreen from "../components/StatisticsScreen";
import ListAccountActive from "../components/Admin/ListAccountActive";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeNavigation = () => {
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
                    name="ListAccountActive"
                    component={ListAccountActive}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialCommunityIcons name="account-check" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Acc Active</Text>
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
                    name="ListAccountNotActive"
                    component={ListAccountNotActive}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialCommunityIcons name="account-cancel" size={24} color={focused ? "#16247d" : "#111"} />
                                    <Text style={{ fontSize: 12, color: "#16247d" }}>Acc Not Active</Text>
                                </View>
                            )
                        }
                    }}
                />
            </Tab.Navigator>
    )
}

export default HomeNavigation;