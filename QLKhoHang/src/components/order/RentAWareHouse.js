import React from "react";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

let percents = [
  {
    id: 0,
    percent: "0%",
  },
  {
    id: 1,
    percent: "25%",
  },
  {
    id: 2,
    percent: "50%",
  },
  {
    id: 3,
    percent: "75%",
  },
  {
    id: 4,
    percent: "100%",
  }
]

const RentAWareHouse = ({ route, navigation }) => {
  //const { warehouseId } = route.params;
  const [capacity, setCapacity] = useState("");
  const [rentalTime, setRentalTime] = useState("");
  const { userInfo, logout, ListAccOwners, account, setAccount } =
    useContext(AuthContext);
  const { id_warehouse } = route.params;

  const handleRentWarehouse = () => {
    if (!id_warehouse) {
      console.error("Lỗi: Thiếu ID kho");
      return;
    }
    axios
      .post(
        `https://warehouse-management-api.vercel.app/v1/order/create`,
        {
          capacity: capacity,
          rentalTime: rentalTime,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          params: {
            id_warehouse: id_warehouse,
          },
        }
      )
      .then((res) => {
        //console.log(res.data.data);  // In ra dữ liệu trả về từ API để kiểm tra cấu trúc
        let capacity = res.data;
        // console.log(userInfo.accessToken);
        const orderId = res.data.data._id.toString(); // Chuyển đổi thành chuỗi nếu cần
        // // Sử dụng orderId mà không gặp lỗi
        alert("gui thanh cong");
      })
      .catch((e) => {
        console.log(`error ${e.response.data.message}`);
      });
    // Sau khi xử lý, bạn có thể quay trở lại màn hình trước đó
    //navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Dropdown
        // style={AppStyle.StyleListProduct.dropdown}
        // placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
        // selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
        // inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
        // iconStyle={AppStyle.StyleListProduct.iconStyle}
        data={percents}
        maxHeight={300}
        labelField="percent"
        valueField="id"
        placeholder="Chọn dung tích"
        searchPlaceholder="Search..."
        // value={userInfo.others.warehouses}
        onChange={(item) => {
          setCapacity(item.percent);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Thoi gian Thue"
        value={rentalTime}
        onChangeText={(text) => setRentalTime(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRentWarehouse}>
          <Text style={{ color: "#fff" }}>Gửi yêu cầu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DetailWareHouseUser")}
        >
          <Text style={{ color: "#fff" }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center", // Căn giữa theo chiều dọc
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center", // Căn giữa theo chiều ngang
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
});

export default RentAWareHouse;
