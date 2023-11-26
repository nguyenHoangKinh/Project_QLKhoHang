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
const ListBlogPost = ({ navigation }) => {
  const { ListBlog, listBlog,setShowImgBlog,setIsVisible } = useContext(AuthContext);
  useEffect(() => {
    //call api
    ListBlog();
  }, []);
  const FlatListBlog = (item) => {
    // console.log(item._id);
    return (
      <View className="ml-2 mr-2">
        <Pressable
          className=" border-2 border-indigo-500 rounded"
          style={styles.container}
          onPress={() => {
            navigation.navigate("DetaiBlogPost",{itemId:item._id}),setShowImgBlog([]),setIsVisible(false)
          }}
        >
          {item.images != "" ? (
            <View className="pb-0.5">
              <Image
                source={{
                  uri: `${item.images[0]}`,
                }}
                style={styles.image}
              />
            </View>
          ) : (
            ""
          )}
          <View className="border-2 border-indigo-500  border-t-indigo-500">
            <View className="p-2">
              <Text style={styles.title}>Giá:~{item.description}</Text>
              <View className="flex-row">
                <AntDesign name="star" size={16} color="yellow" />
                <AntDesign name="star" size={16} color="yellow" />
                <AntDesign name="star" size={16} color="yellow" />
                <AntDesign name="staro" size={16} color="yellow" />
                <AntDesign name="staro" size={16} color="yellow" />
              </View>
            </View>
            <View className="flex p-2">
              <Text style={styles.title}>Giá:~{item.warehouse.monney}</Text>
              <Text className="pt-1">Diện tích: {item.warehouse.capacity}</Text>
              <View className="flex-row pt-1">
                <TouchableOpacity>
                  <FontAwesome5 name="map-marker-alt" size={24} color="red" />
                </TouchableOpacity>
                <Text className="pl-2">{item.warehouse.address}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View className="flex-auto h-full">
      <View className="w-full mb-3" style={AppStyle.StyleOderList.header}>
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
          <AntDesign
            style={AppStyle.StyleOderList.iconFilter}
            name="shoppingcart"
            size={30}
            color="#000"
            // onPress={() => setModalVisible(true)}
          />
        </Pressable>
      </View>
      <FlatList
        className="mb-6"
        data={listBlog}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => FlatListBlog(item)}
      />
    </View>
  );
};

export default ListBlogPost;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    shadowOpacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#fff",
    marginTop: 10,
  },
  image: {
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  heading: {},
  author: {
    fontWeight: "bold",
    fontSize: 15,
  },
  date: {
    fontWeight: "bold",
    color: "#e63946",
    fontSize: 15,
  },
  source: {
    color: "#e63946",
    fontWeight: "bold",
    fontSize: 18,
  },
  avatar: {
    width: 60,
    height: 60,
  },
});
