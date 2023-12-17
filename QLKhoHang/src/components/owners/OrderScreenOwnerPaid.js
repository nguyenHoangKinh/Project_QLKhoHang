import AppStyle from "../../theme";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import {ORDER_URL } from "../../config";
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

export default function OrderScreenOwnerPaid({ navigation }) {
  const {
    ListOrderOwner2,
    ListOrderOwnerStatus2,
    ListOrderOwnerStatus3,
    logout,
    userInfo,
  } = useContext(AuthContext);
useEffect(() => {
  ListOrderOwnerStatus2()
}, []);
const DeleteOrderOwner = (idOrder) => {
  if (idOrder) {
    axios
      .delete(
        ORDER_URL +
          `/order/deleteOrderByOwner?id_order=${idOrder}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        ListOrderOwnerStatus2();
        ListOrderOwnerStatus3();
      })
      .catch((e) => {
        if (e.response.data.success === false) {
          alert("bạn đã hết hạng đăng nhập");
          logout();
        }
      });
  } else {
    alert("xoa that bai!");
  }
};
  const FlatListData = (item) => {
    if (item.status == 2) {
      return (
        <Pressable
          className="shadow-2xl mt-1 bg-white m-2"
          onPress={() => {
            navigation.navigate("DetailOrderOwner", { idDetai: item._id });
          }}
        >
          <View className="" style={AppStyle.StyleOderList.item}>
            <View className="mt-3">
            <View className="flex flex-row">
                <Text
                  className="flex-initial"
                  style={AppStyle.StyleOderList.text}
                >
                  Mã hóa đơn:
                </Text>
                <Text className="flex-initial  text-base">
                  {" "}
                  {item._id}
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
                <Text className="flex-initial  text-base">{item.rentalTime} tháng</Text>
              </View>
            </View>
          </View>
          {/* <Pressable
            onPress={() => {
              Alert.alert(
                "",
                "bạn muốn hủy đơn hàng này?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>
                      DeleteOrderOwner( item._id),
                  },
                ],
                { cancelable: false }
              );
            }}
            className="absolute right-16 top-10 "
          >
            <MaterialIcons name="delete" size={34} color="red" />
          </Pressable> */}
        </Pressable>
      );
    }
  };

  return (
    <>
    {ListOrderOwner2 != "" ? 
    <FlatList
        data={ListOrderOwner2}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => FlatListData(item)}
      />
      : 
      <Text className="flex text-center text-lg font-bold top-1/2" style={{color:"#16247d"}}>Không có Dơn Hàng!</Text>
    }
    </>
  );
}
