import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppStyle from "../../theme";
import StyleListWareHouse from "../../theme/StyleListWareHouse";

export default function ListWareUser({navigation}) {
  const [list, setList] = useState({});
  const { userInfo,setListWare } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/warehouse/listWarehouseUser`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let warehouseUser = res.data.warehouse;
        setList(warehouseUser);
        //console.log(res.data.warehouse);
      })
      .catch((e) => {
        console.log(`get warehouseUser error ${e.res}`);
      });
  }, []);

  // Render todo
  const renderTodos = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {navigation.navigate("DetailWareHouseUser"),setListWare(item._id)}}
      >
        {/* <Pressable> */}
          <View style={AppStyle.StyleOderList.item}>
            <View style={AppStyle.StyleOderList.rightItem}>
              {/* <View className="flex flex-row justify-between"> */}
              <View>
                <Text style={AppStyle.StyleOderList.text}>
                  Tên:
                  {item.wareHouseName}
                </Text>
                <Text style={AppStyle.StyleOderList.text_address}>
                  Địa chỉ:{item.address}
                </Text>
                <Text style={AppStyle.StyleOderList.text}>
                  Danh mục: {item.category.name}
                </Text>
                <Text style={AppStyle.StyleOderList.text}>
                  Gia :{item.monney}
                </Text>
                <Text style={AppStyle.StyleOderList.text}>
                  Chủ kho: {item.owner.username}
                </Text>
                {/* <Text
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  View
                </Text> */}
              </View>
            </View>
          </View>
        {/* </Pressable> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList data={list} renderItem={renderTodos} />
    </View>
  );
}

const styles = StyleSheet.create({});
