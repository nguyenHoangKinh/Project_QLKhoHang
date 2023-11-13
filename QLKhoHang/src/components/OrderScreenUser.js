import AppStyle from "../theme";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  const { orderListUser, ListOrder, setIdOrder, userInfo } =
    useContext(AuthContext);
    console.log(ListOrder);
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
        onPress={() => {
          navigation.navigate("SeeOrderDetails"), setIdOrder(item._id);
        }}
        style={AppStyle.StyleOderList.boxesList}
      >
        <View style={AppStyle.StyleOderList.item}>
          {/* <View style={AppStyle.StyleOderList.leftItem}>
              <Text style={AppStyle.StyleOderList.text}>{item.TenKhoHang}</Text>
              <Image
                source={{ uri: item.AnhKhoHang }}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
            </View> */}
          <View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Ten Chu Kho:
              </Text>
              <Text className="flex-initial">{item.owner}</Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Ten Khach Hang:{" "}
              </Text>
              <Text className="flex-initial">{item.user}</Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Thoi Gian Thue:{" "}
              </Text>
              <Text className="flex-initial">{item.rentalTime}</Text>
            </View>
            {/* <Text style={AppStyle.StyleOderList.text}>LuuLuong: {item.LuuLuongHangHoa}</Text> */}
          </View>
        </View>
      </Pressable>
    );
    // }
  };

  return (
    <View style={AppStyle.StyleOderList.container}>
      {/* <View className="flex-initial" style={AppStyle.StyleOderList.header}>
      <View style={AppStyle.StyleOderList.searchBar}>
        <Ionicons
          style={AppStyle.StyleOderList.iconSearch}
          name="search"
          size={23}
          color="#000"
        />
        <TextInput
          placeholder="nhap ten kho "
          clearButtonMode="always"
          style={AppStyle.StyleOderList.search}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setUserInput(text);
          }}
        />
      </View>
      <Pressable style={AppStyle.StyleOderList.listFilter}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={AppStyle.StyleOderList.centeredView}>
            <Pressable
              style={[AppStyle.StyleOderList.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons
                name="close-outline"
                size={35}
                color="#000"
                style={AppStyle.StyleOderList.textStyle}
              />
            </Pressable>
            <View style={AppStyle.StyleOderList.modalView}>
              <View style={AppStyle.StyleOderList.modalView_1}>
                <Text>Loc Don Hang Theo Kho Hang</Text>
                <FlatList
                  data={warehouseList}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onChange={() => {
                        warehouseFilter(item.id);
                      }}
                      style={[AppStyle.StyleOderList.text, { margin: 5 }]}
                    >
                      <Text>{AppStyle.StyleOderList.kho}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={AppStyle.StyleOderList.modalView_2}>
                <Text>Loc Don Hang Theo Thang - tuan</Text>

                <TouchableOpacity>
                  <Text
                    style={AppStyle.StyleOderList.Fliter}
                    >Loc Theo Thang</Text>
                </TouchableOpacity>

                <TouchableOpacity style={AppStyle.StyleOderList.Fliter}>
                  <Text>Loc Theo Tuan </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Ionicons
          style={AppStyle.StyleOderList.iconFilter}
          name="options-outline"
          size={30}
          color="#000"
          onPress={() => setModalVisible(true)}
        />
      </Pressable>
    </View>
    <View className="flex-initial" style={AppStyle.StyleOderList.boxes}>
      <Pressable
        accessibilityRole="search"
        style={AppStyle.StyleOderList.button}
        onPress={() => Alert.alert("Left button pressed")}
      >
        <Text style={AppStyle.StyleOderList.text}>Don Chua Hoang Thanh</Text>
      </Pressable>
      <Text style={{ borderWidth: 0.5 }}></Text>
      <Pressable
        style={AppStyle.StyleOderList.button}
        onPress={() => Alert.alert("Left button pressed")}
      >
        <Text style={AppStyle.StyleOderList.text}>Don Da Hoang Thanh</Text>
      </Pressable>
    </View> */}
      <View
        className="flex-initial top-10"
        style={AppStyle.StyleOderList.boxesList}
      >
        <FlatList
          data={ListOrder}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => FlatListData(item)}
        />
      </View>
    </View>
  );
}
