import React, { useContext } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  return (
    <View style={{ marginHorizontal: 16, marginTop: 20 }}>
      <TouchableOpacity
        style={AppStyle.StyleProfile.btn_logout}
        onPress={() => navigation.navigate("ListBlogOwner")}
      >
        <Text style={{ color: "#fff" }}>Danh sách bài viết</Text>
        <MaterialIcons name="navigate-next" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={AppStyle.StyleHome.warehouse_view}>
        <View style={AppStyle.StyleHome.name_warehouse}>
          <Text style={AppStyle.StyleHome.tittle_warehouse}>
            Tổng số kho hàng: <></>
            <Text style={AppStyle.StyleHome.name_warehouse}></Text>
          </Text>
        </View>
      </View>
      <View style={AppStyle.StyleHome.warehouse_view}>
        <View style={AppStyle.StyleHome.name_warehouse}>
          <Text style={AppStyle.StyleHome.tittle_warehouse}>
            Tổng số kho lạnh: <></>
            <Text style={AppStyle.StyleHome.name_warehouse}></Text>
          </Text>
        </View>
      </View>
      <View style={AppStyle.StyleHome.warehouse_view}>
        <View style={AppStyle.StyleHome.name_warehouse}>
          <Text style={AppStyle.StyleHome.tittle_warehouse}>
            Tổng số kho ngoài trời: <></>
            <Text style={AppStyle.StyleHome.name_warehouse}></Text>
          </Text>
        </View>
      </View>
      <View style={AppStyle.StyleHome.warehouse_view}>
        <View style={AppStyle.StyleHome.name_warehouse}>
          <Text style={AppStyle.StyleHome.tittle_warehouse}>
            Tổng số kho nhiều chỗ: <></>
            <Text style={AppStyle.StyleHome.name_warehouse}></Text>
          </Text>
        </View>
      </View>
      <View style={AppStyle.StyleHome.warehouse_view}>
        <View style={AppStyle.StyleHome.name_warehouse}>
          <Text style={AppStyle.StyleHome.tittle_warehouse}>
            Tổng số hóa đơn hiện có: <></>
            <Text style={AppStyle.StyleHome.name_warehouse}></Text>
          </Text>
        </View>
      </View>
      <View style={AppStyle.StyleHome.warehouse_view}>
        <View style={AppStyle.StyleHome.name_warehouse}>
          <Text style={AppStyle.StyleHome.tittle_warehouse}>
            Tổng số khách hàng thuê kho: <></>
            <Text style={AppStyle.StyleHome.name_warehouse}></Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
