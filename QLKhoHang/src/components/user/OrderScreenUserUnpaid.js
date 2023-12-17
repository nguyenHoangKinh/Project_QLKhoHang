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

export default function OrderScreenUserUnpaid({ navigation }) {
  const {
    orderListUser,
    ListOrderTrue,
    logout,
    setIsLoading,
    ListOrder,
    userInfo,
    SearchOrder,
  } = useContext(AuthContext);
  const [ListOrderUser1, setListOrderUser1] = useState({});
  const ListOrderUser = () => {
    setIsLoading(true);
    if (userInfo.accessToken) {
      axios
        .get(
          `${ORDER_URL}/order/listOrderByUser?status=1`,
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        )
        .then((res) => {
          if (res && res.data) {
            let order = res.data.data;
            setListOrderUser1(order);
          }
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(`update error ${e.response.data.message}`);
          setIsLoading(false);
          if (e.responsxe.data.success === false) {
            alert(e.response.data.message);
            logout();
          }
        });
    } else {
      alert("error access token undefined");
    }
  };
useEffect(() => {
  ListOrderUser()
}, []);
const DeleteOrderUser = (idOrder) => {
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
        ListOrderUser();
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
    if (item.status == 1) {
      return (
        <Pressable
          className="shadow-2xl mt-1 bg-white m-2"
          onPress={() => {
            navigation.navigate("DetailOrderUser", { idDetai: item._id });
          }}
        >
          <View className="" style={AppStyle.StyleOderList.item}>
            <View className="mt-3">
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
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>
                    DeleteOrderUser(item._id),
                  },
                ],
                { cancelable: false }
              );
            }}
            className="absolute right-5 top-10"
          >
            <MaterialIcons name="delete" size={34} color="red" />
          </Pressable>
        </Pressable>
      );
    } 
  };

  return (
    <>
      {ListOrderUser1 != "" ? (
        <FlatList
          data={ListOrderUser1}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListData(item)}
        />
      ) : (
        <Text
          className="flex text-center text-lg font-bold top-1/2"
          style={{ color: "#16247d" }}
        >
          Không có Dơn Hàng!
        </Text>
      )}
    </>
  );
}
