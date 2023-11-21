import AppStyle from "../../theme";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function OrderScreenUser({ navigation }) {
  const {
    orderListUser,
    ListOrder,
    setIdOrder,
    userInfo,
    SearchOrder,
    DeleteOrderUser,
  } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(userInfo.others._id);
  useEffect(() => {
    //call api
    orderListUser(userInfo.accessToken);
  }, []);

  const FlatListData = (item) => {
    // if (
    //   ListOrder === "" ||
    //   item.TenKhoHang.toLowerCase().includes(ListOrder.toLowerCase())
    // ) {
    return (
      <Pressable
      className="border-2 border-blue-500 mt-1 bg-white m-2"
        onPress={() => {
          setIdOrder(item._id), navigation.navigate("SeeOrderDetails");
        }}
      >
        <View className="" style={AppStyle.StyleOderList.item}>
          <View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Tên Đơn Hàng:
              </Text>
              <Text className="flex-initial text-base">
                {" "}
                {item.name}
              </Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Tên Chủ Kho:
              </Text>
              <Text className="flex-initial  text-base">
                {" "}
                {item.owner.username}
              </Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Tên Khách Hàng:{" "}
              </Text>
              <Text className="flex-initial  text-base">
                {item.user.username}
              </Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Thời Gian Thuê:{" "}
              </Text>
              <Text className="flex-initial  text-base">
                {item.rentalTime}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            Alert.alert(
              "",
              "Are you sure you want to delete?",
              [
                {
                  text: "Cancel", 
                  onPress: () =>navigation.navigate("OrderScreenUser"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => DeleteOrderUser(userInfo.others._id,item._id) },
              ],
              { cancelable: false }
            );
          }}
          className="absolute right-5 top-10"
        >
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={40}
            color="#aa381e"
          />
        </Pressable>
      </Pressable>
    );
    // }
  };

  return (
    <>
      <View className=" flex static ">
        <View className="w-full" style={AppStyle.StyleOderList.header}>
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
              color="#000"
              onPress={() => setModalVisible(true)}
            />
          </Pressable>
        </View>
        <View
          className=" w-full h-12  bg-black"
          style={AppStyle.StyleOderList.boxes}
        >
          <Pressable
            accessibilityRole="search"
            style={AppStyle.StyleOderList.button}
            onPress={() => Alert.alert("Left button pressed")}
          >
            <Text className="text-lg text-black font-bold">
              Đơn chưa hoàn thành
            </Text>
          </Pressable>
          <Text style={{ borderWidth: 0.5 }}></Text>
          <Pressable
            style={AppStyle.StyleOderList.button}
            onPress={() => Alert.alert("Left button pressed")}
          >
            <Text className="text-lg text-black font-bold">
              Đơn đã hoàn thành
            </Text>
          </Pressable>
        </View>
        <View
          className=" flex-auto h-full"
          style={AppStyle.StyleOderList.boxesList}
        >
          <FlatList
            data={ListOrder}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => FlatListData(item)}
          />
        </View>
      </View>
      {/* <TouchableOpacity
        className="absolute bottom-10 right-8 rounded-full"
        onPress={() => {
          navigation.navigate("AddOrderScreen");
        }}
      >
        <AntDesign name="pluscircleo" size={48} color="black" />
      </TouchableOpacity> */}
    </>
  );
}
