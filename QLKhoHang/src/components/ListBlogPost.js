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
  const {
    ListBlog,
    listBlog,
    setShowImgBlog,
    setIsVisible,
    setDetailBlogListCommnetsId,
    setModalVisibleComment,
    setModalVisibleUpdateTextComment,
  } = useContext(AuthContext);
  useEffect(() => {
    //call api
    ListBlog();
  }, [listBlog]);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",listBlog);
  const FlatListBlog = (item) => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",item);
    return (
      <View className="pl-3 pr-3 mb-3 shadow-2xl ">
        <Pressable
          className=" rounded "
          style={styles.container}
          onPress={() => {
            navigation.navigate("DetaiBlogPost"),
              setDetailBlogListCommnetsId(item._id),
              setModalVisibleComment(false),
              setShowImgBlog([]),
              setIsVisible(false),
              setModalVisibleUpdateTextComment(false);
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
          <View className=" pl-2 pr-2">
            <View className="p-2">
              <Text style={styles.title}>Mô tả: {item.description}</Text>
              <View className="flex-row">
                <AntDesign name="star" size={20} color="yellow" />
                <AntDesign name="star" size={20} color="yellow" />
                <AntDesign name="star" size={20} color="yellow" />
                <AntDesign name="staro" size={20} color="yellow" />
                <AntDesign name="staro" size={20} color="yellow" />
              </View>
            </View>
            <View className="flex p-2">
            <Text className="pt-1 text-base">
                  Diện tích: {item.warehouse.capacity}
                </Text>
              <View className="flex-row">
                <Text className="pt-1 text-base">
                {item.warehouse.capacity}
                </Text>
                <View className="flex-row pt-1 absolute right-0">
                  <TouchableOpacity>
                    <FontAwesome5 name="map-marker-alt" size={24} color="red" />
                  </TouchableOpacity>
                  <Text className="pl-2">{item.warehouse.address}</Text>
                </View>
              </View>
              <Text className="text-red-600 text-lg" style={styles.title}>
                Giá:~{item.warehouse.monney}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View className="flex h-full">
      <View className="w-full mb-3" style={AppStyle.StyleOderList.header}>
        <View className="h-8" style={AppStyle.StyleOderList.searchBar}>
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
      {listBlog != "" ? (
        <FlatList
          className="mb-6"
          data={listBlog}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListBlog(item)}
        />
      ) : (
        <Text
          className="flex text-center text-lg font-bold top-1/2"
          style={{ color: "#16247d" }}
        >
          Không có Dơn Hàng!
        </Text>
      )}
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
    fontSize: 19,
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
