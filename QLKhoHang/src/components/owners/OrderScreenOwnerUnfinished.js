import AppStyle from "../../theme";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, SafeAreaView, Text, TextInput, View, Image, Alert, Pressable, Modal, TouchableOpacity } from "react-native";
import axios from "axios";

export default function OrderScreenOwnerUnfinished({ navigation }) {
  const { orderListOwner, ListOrder, setIdOrder, userInfo, SearchOrder, DeleteOrderOwner } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [listOrder, setListOrder] = useState();

  useEffect(() => {
    axios.get(`https://warehouse-management-api.vercel.app/v1/order/listOrderByOwner`, {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      params: {
        id_owner: userInfo.others._id,
      },
    }).then((res) => {
      let listOrder = res.data;
      setListOrder(listOrder);
    }).catch((e) => {
      console.log(`get order error ${e.res}`);
    });
  }, []);

  const FlatListData = (item) => {
    if (item.status === 0) {
      return (
        <Pressable
          className="shadow-2xl mt-1 bg-white m-2"
          onPress={() => {
            navigation.navigate("DetailOrderOwner", { idDetai: item._id });
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
                <Text className="flex-initial text-base"> {item._id}</Text>
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
                <Text className="flex-initial  text-base">{item.rentalTime} Tháng</Text>
              </View>
            </View>
          </View>
        </Pressable>
      );
    }
  };

  return (
    <>
      {listOrder ?
        <FlatList
          data={listOrder}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListData(item)}
        />
        :
        <Text className="flex text-center text-lg font-bold top-1/2" style={{ color: "#16247d" }}>Không có Dơn Hàng!</Text>
      }
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
