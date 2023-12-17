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

export default function OrderScreenUserInvoice({ navigation }) {
  const {
    orderListUser,
    ListOrderTrue,
    ListOrder,
    setIsLoading,
    userInfo,
    SearchOrder,
    DeleteOrderUser,
  } = useContext(AuthContext);
  const [ListOrderUser3, setListOrderUser3] = useState({});
  useEffect(() => {
      setIsLoading(true);
      if (userInfo.accessToken) {
        axios
          .get(
            `${ORDER_URL}/order/listOrderByUser?status=3`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          )
          .then((res) => {
            if (res && res.data) {
              let order = res.data.data;
              setListOrderUser3(order);
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
  }, []);

  const FlatListData = (item) => {
    if (item.status == 3) {
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
        </Pressable>
      );
    } 
  };

  return (
    <>
      {ListOrderUser3 != "" ? (
        <FlatList
          data={ListOrderUser3}
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
