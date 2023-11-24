import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const ListComments = ({ route, navigation }) => {
    const { ListCommentsBlog } = useContext(AuthContext);
  //   const { itemId } = route.params;
  // console.log(itemId);
    useEffect(() => {
      //call api
      ListCommentsBlog();
    }, []);
  const comments = (item) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <View style={{ height: 500, width: "100%", alignItems: "center" }}>
      <FlatList
        data={detailBlog.images}
        horizontal
        // keyExtractor={(item) => String(item)}
        renderItem={({ item, index }) => comments(item, index)}
      />
    </View>
  );
};

export default ListComments;
