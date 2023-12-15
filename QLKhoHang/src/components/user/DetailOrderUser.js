import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";

export default function SeeOrderDetails({ route, navigation }) {
  const { idDetai } = route.params;
  // console.log(idDetai);
  const {
    OrderDetail,
    DetailOrder,
    setDetailOrder,
    userInfo,
    checkDetail,
    setCheckDetail,
    orderListUser,
  } = useContext(AuthContext);
  // console.log(DetailOrder.Order);
  useEffect(() => {
    OrderDetail(idDetai);
  }, []);
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex h-120">
        <View className="flex-row justify-start top-5">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(),
                orderListUser(userInfo.accessToken),
                setDetailOrder({}),
                // setIdOrder({}),
                setCheckDetail(false);
            }}
            className="bg-blue-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl text-center font-semibold left-28">
            Hóa Đơn
          </Text>
        </View>
        <View
          className="flex-row justify-center mt-3 mb-3"
          style={{ width: 390, height: 70 }}
        >
          {/* <Image
        //   className="bg-slate-950"
            source={require("../assets/images/login.png")}
            style={{ width: 390, height: 360 }}
          /> */}
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8 "
      >
        <View className=" bg-slate-300 top-12">
          <Text className="text-gray-700 ml-2 w-55 text-lg p-2 ">
            Thông Tin Hàng Hóa
          </Text>

          <Text className="text-yellow-950  mr-3 pt-4 pb-4 text-center text-2xl">
            {checkDetail ? DetailOrder.Order.money : ""}VND
          </Text>

          <Text className="text-yellow-950  mr-3 p-4">
            Tên chủ kho: {checkDetail ? DetailOrder.Order.owner.username : ""}
          </Text>
          <Text className="text-yellow-950  mr-3 p-4">
            Diện tích thuê: {checkDetail ? DetailOrder.Order.capacity : ""} %
          </Text>
          <Text className="text-yellow-950  mr-3 p-4">
            Thời gian thuê: {checkDetail ? DetailOrder.Order.rentalTime : ""}
          </Text>
        </View>
        <View className=" bg-slate-300 mt-16">
          <Text className="text-gray-700 ml-2 w-55 text-lg">
            Thông tin bên mua
          </Text>
          <View className="flex flex-row justify-between pt-5 pb-5">
            <Text className="text-gray-700 ml-2 w-55 ">
              Tên khách hàng:{" "}
              {checkDetail ? DetailOrder.Order.user.username : ""}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="py-3 bg-blue-300 rounded-xl top-5"
          // onPress={() => {
          //   OrderDetail()
          // }}
        >
          <Text className="text-xl font-bold text-center text-gray-700">
            Hủy Đơn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
