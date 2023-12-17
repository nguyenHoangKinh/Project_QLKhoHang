import React, { useContext, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Pressable, FlatList, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";
import { AntDesign, FontAwesome5, MaterialIcons} from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
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
    ListBlog();
  }, [listBlog]);

  const FlatListBlog = (item) => {
    return (
      <View className="pl-3 pr-3 mb-3 shadow-2xl ">
        <Pressable
          className=" rounded "
          style={styles.container}
          onPress={() => {
            navigation.navigate("DetaiBlogUser"),
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
    <View style={{ marginBottom: 100 }}>
      <View style={{ marginBottom: -60 }}>
        <TouchableOpacity
          style={AppStyle.StyleProfile.btn_logout}
          onPress={() => navigation.navigate("ListBlogOwner")}
        >
          <Text style={{ color: "#fff" }}>Quản lý bài viết</Text>
          <MaterialIcons name="navigate-next" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View className="flex h-full">
        <View className="w-full" style={AppStyle.StyleOderList.header}>
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
            Không có Bài đăng!
          </Text>
        )}
      </View>
    </View>
  );
};

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
