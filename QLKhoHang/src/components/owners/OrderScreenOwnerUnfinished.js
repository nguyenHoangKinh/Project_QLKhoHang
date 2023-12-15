import AppStyle from "../../theme";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
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

export default function OrderScreenOwnerUnfinished({ navigation }) {
  const {
    orderListOwner,
    ListOrder,
    setIdOrder,
    userInfo,
    SearchOrder,
    DeleteOrderOwner,
  } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   orderListOwner(userInfo.accessToken);
  // }, []);

  const FlatListData = (item) => {
    if (item.isActive == false) {
      return (
        <Pressable
          className="shadow-2xl mt-1 bg-white m-2"
          onPress={() => {
            navigation.navigate("DetailOrderOwner", { idDetai: item._id });
          }}
        >
          <View className="" style={AppStyle.StyleOderList.item}>
            <View className="mt-3">
              {/* <View className="flex flex-row">
                <Text
                  className="flex-initial"
                  style={AppStyle.StyleOderList.text}
                >
                  Tên Đơn Hàng:
                </Text>
                <Text className="flex-initial text-base"> {item.name}</Text>
              </View> */}
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
                <Text className="flex-initial  text-base">{item.rentalTime}</Text>
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
                      DeleteOrderOwner(userInfo.others._id, item._id),
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
    }else {
      return (
        <Text
          className="flex text-center text-lg font-bold mt-10"
          style={{ color: "#16247d" }}
        >
          Không có đơn hàng nào!
        </Text>
      );
    }
  };

  return (
    <>
    {ListOrder != "" ? 
    <FlatList
        data={ListOrder}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => FlatListData(item)}
      />
      : 
      <Text className="flex text-center text-lg font-bold top-1/2" style={{color:"#16247d"}}>Không có Dơn Hàng!</Text>
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
