import React, { useContext } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import AppStyle from "../theme";

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  return (
    <View style={{ marginHorizontal: 16, marginTop: 70 }}>
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
