import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";
import axios from "axios";
import ListBlogUser from "./ListBlogUser"

export default function HomeScreen({ navigation }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <View style={{marginBottom: 100}}>
      <View style={{marginBottom: -60}}>
      <TouchableOpacity
        style={AppStyle.StyleProfile.btn_logout}
        onPress={() => navigation.navigate("ListBlogOwner")}
      >
        <Text style={{ color: "#fff" }}>Quản lý bài viết</Text>
        <MaterialIcons name="navigate-next" size={20} color="#fff" />
      </TouchableOpacity>
      </View>
      <ListBlogUser/>
    </View>
  );
};
