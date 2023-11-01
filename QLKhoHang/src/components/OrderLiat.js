import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
// import styles from "../theme/StyleOderList";
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
// import { Button } from "@rneui/base";

//du lieu gia
const DATA = [
  {
    MaDonHang: "1",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 1",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-01-20",
    id: "1",
  },
  {
    MaDonHang: "2",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 2",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-02-20",
    id: "1",
  },
  {
    MaDonHang: "3",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 3",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-02-20",
    id: "2",
  },
  {
    MaDonHang: "4",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 4",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-03-20",
    id: "2",
  },
  {
    MaDonHang: "5",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 5",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-03-20",
    id: "3",
  },
  {
    MaDonHang: "6",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 6",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-04-20",
    id: "3",
  },
  {
    MaDonHang: "7",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 7",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-04-20",
    id: "4",
  },
  {
    MaDonHang: "8",
    MaKhachHang: "kh1",
    TenKhachHang: "khach hang 1",
    TenKhoHang: "kho 8",
    AnhKhoHang:
      "https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg",
    DiaChiKhachHang: "HCM CT",
    LuuLuongHangHoa: "300 met",
    NgayThang: "2023-05-20",
    id: "4",
  },
];

const ordersData = [
  { id: "1", month: "1" },
  { id: "2", month: "2" },
  { id: "3", month: "3" },
  { id: "4", month: "4" },
  { id: "5", month: "5" },
  { id: "6", month: "6" },
  { id: "7", month: "7" },
  { id: "8", month: "8" },
  { id: "9", month: "9" },
  { id: "10", month: "10" },
  { id: "11", month: "11" },
  { id: "12", month: "12" },
];

const LocKho = [
  {
    id: "1",
    kho: "kho 1",
  },
  {
    id: "2",
    kho: "kho 2",
  },
  {
    id: "3",
    kho: "kho 3",
  },
  {
    id: "3",
    kho: "kho 3",
  },
];

const OrderLiat = () => {
  //const navigation = useNavigation();
  const [userInput, setUserInput] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const [warehouseList, setWarehouseList] = useState(LocKho);
  const [ordersDatas, setordersDatas] = useState("");

  //fliter month func
  // const setordersDatas = () => {
  //   return (

  //   );
  // };
  const fliterMonth = () => {
    return <View>hello</View>;
  };

  // FlatList func

  const FlatListData = (item) => {
    if (
      userInput === "" ||
      item.TenKhoHang.toLowerCase().includes(userInput.toLowerCase())
    ) {
      return (
        <Pressable style={styles.boxesList}>
          <View style={styles.item}>
            <View style={styles.leftItem}>
              <Text style={styles.text}>{item.TenKhoHang}</Text>
              <Image
                source={{ uri: item.AnhKhoHang }}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
            </View>
            <View style={styles.rightItem}>
              <Text style={styles.text}>MaKho: {item.MaDonHang}</Text>
              <Text style={styles.text}>TenKH: {item.TenKhachHang}</Text>
              <Text style={styles.text}>DiaChi: {item.DiaChiKhachHang}</Text>
              <Text style={styles.text}>LuuLuong: {item.LuuLuongHangHoa}</Text>
            </View>
          </View>
        </Pressable>
      );
    }
  };

  return (
    <View  style={styles.container}>

      <View className="flex-initial" style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons
            style={styles.iconSearch}
            name="search"
            size={23}
            color="#000"
          />
          <TextInput
            placeholder="nhap ten kho "
            clearButtonMode="always"
            style={styles.search}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setUserInput(text);
            }}
          />
        </View>
        <Pressable style={styles.listFilter}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons
                  name="close-outline"
                  size={35}
                  color="#000"
                  style={styles.textStyle}
                />
              </Pressable>
              <View style={styles.modalView}>
                <View style={styles.modalView_1}>
                  <Text>Loc Don Hang Theo Kho Hang</Text>
                  <FlatList
                    data={warehouseList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onChange={() => {
                          warehouseFilter(item.id);
                        }}
                        style={[styles.text, { margin: 5 }]}
                      >
                        <Text>{item.kho}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View style={styles.modalView_2}>
                  <Text>Loc Don Hang Theo Thang - tuan</Text>

                  <TouchableOpacity>
                    <Text
                      style={styles.Fliter}
                      >Loc Theo Thang</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.Fliter}>
                    <Text>Loc Theo Tuan </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Ionicons
            style={styles.iconFilter}
            name="options-outline"
            size={30}
            color="#000"
            onPress={() => setModalVisible(true)}
          />
        </Pressable>
      </View>
      <View className="flex-initial" style={styles.boxes}>
        <Pressable
          accessibilityRole="search"
          style={styles.button}
          onPress={() => Alert.alert("Left button pressed")}
        >
          <Text style={styles.text}>Don Chua Hoang Thanh</Text>
        </Pressable>
        <Text style={{ borderWidth: 0.5 }}></Text>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert("Left button pressed")}
        >
          <Text style={styles.text}>Don Da Hoang Thanh</Text>
        </Pressable>
      </View>
      <View className="flex-initial"  style={styles.boxesList}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.MaDonHang}
          renderItem={({ item, index }) => FlatListData(item)}
        />
      </View>
    </View>
  );
};


export default OrderLiat;
