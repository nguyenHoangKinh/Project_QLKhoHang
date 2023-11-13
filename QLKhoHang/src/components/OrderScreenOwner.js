import AppStyle from "../theme";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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

export default function OrderScreenOwner({navigation}) {
  const { orderListOwner, ListOrder,setIdOrder, userInfo,SearchOrder } = useContext(AuthContext);
  // console.log(ListOrder);
  useEffect(() => {
    //call api
    orderListOwner(userInfo.accessToken);
  }, []);

  const FlatListData = (item) => {
    
    // if (
    //   ListOrder === "" ||
    //   item.TenKhoHang.toLowerCase().includes(ListOrder.toLowerCase())
    // ) {
    return (
      <Pressable
        onPress={() => {
          setIdOrder(item._id), navigation.navigate("SeeOrderDetails");
        }}
      >
        {/* <Text>{console.log(item._id)}</Text> */}
        <View  style={AppStyle.StyleOderList.item}>
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
                Tên Đơn Hàng:
              </Text>
              <Text className="flex-initial text-white text-base"> {item.name}</Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Tên Chủ Kho:
              </Text>
              <Text className="flex-initial text-white text-base"> {item.owner.username}</Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Tên Khách Hàng:{" "}
              </Text>
              <Text className="flex-initial text-white text-base">{item.user.username}</Text>
            </View>
            <View className="flex flex-row">
              <Text
                className="flex-initial"
                style={AppStyle.StyleOderList.text}
              >
                Thời Gian Thuê:{" "}
              </Text>
              <Text className="flex-initial text-white text-base">{item.rentalTime}</Text>
            </View>
            {/* <Text style={AppStyle.StyleOderList.text}>LuuLuong: {item.LuuLuongHangHoa}</Text> */}
          </View>
          {/* <TouchableOpacity
            className="top-7 text-center bg-red-600 rounded-xl h-8 p-1"
            // onPress={() => {
            //   deleteOrderListOwner()
            // }}
          >
            <Text className="text-sm font-bold text-white">
              Hủy Don 
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* <Pressable className="absolute right-0 ">
        <MaterialCommunityIcons name="delete-circle-outline" size={24} color="black" />
        </Pressable> */}
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
                if(text.length > 0){
                  SearchOrder(text);
                }else{
                  orderListOwner(userInfo.accessToken);
                }
              }}
            />
          </View>
          {/* <Pressable style={AppStyle.StyleOderList.listFilter}>
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
      </Pressable> */}
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
            <Text className="text-lg text-black font-bold">Đơn chưa hoàn thành</Text>
          </Pressable>
          <Text style={{ borderWidth: 0.5 }}></Text>
          <Pressable
            style={AppStyle.StyleOderList.button}
            onPress={() => Alert.alert("Left button pressed")}
          >
            <Text className="text-lg text-black font-bold">Đơn đã hoàn thành</Text>
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
      <TouchableOpacity
        className="absolute bottom-10 right-8 rounded-full"
        onPress={() => {
          navigation.navigate("AddOrderScreen");
        }}
      >
        <AntDesign name="pluscircleo" size={48} color="black" />
      </TouchableOpacity>
    </>
  );
}
