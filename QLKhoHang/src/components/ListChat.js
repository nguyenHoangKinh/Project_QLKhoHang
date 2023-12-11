import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import UserChat from "./user/UserChat";
import axios from "axios";
const ListChat = () => {
  const { ListChats, acceptedFriends } = useContext(AuthContext);
  // console.log(acceptedFriends.members);
  useEffect(() => {
    ListChats();
  }, []);
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    //   <Pressable>
    //     {/* {acceptedFriends.map((item, index) => ( */}
    //       <UserChat />
    //     {/* ))} */}
    //   </Pressable>
    // </ScrollView>
    <View className="flex bg-slate-500">
      {/* {acceptedFriends.map((item, index) => (
        <Text>{item}</Text>
      ))} */}
    </View>
  );
};

export default ListChat;
