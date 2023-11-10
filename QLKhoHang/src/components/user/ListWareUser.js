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

let owners = [];

export default function ListWareUser() {
  const [list, setList] = useState({});
  const { userInfo } = useContext(AuthContext);

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
      })
      .catch((e) => {
        console.log(`get warehouseUser error ${e.res}`);
      });
  }, []);
  
  for (let i = 0; i < list.length; i++) {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/auth/account-by-id`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
          params: {
            id: list[i].owner,
          },
        }
      )
      .then((res) => {
        let owner = res.data.others.username;
        // console.log(owner)
        owners.push(<Text key={i}>{owner}</Text>);
      })
      .catch((e) => {
        console.log(`get owner error ${e.res}`);
      });
  }

  console.log(owners)
  // Render todo
  const renderTodos = ({ item, index }) => {
    
    return (
      <Pressable>
        <View style={AppStyle.StyleOderList.item}>
          <View style={AppStyle.StyleOderList.rightItem}>
            {/* <View className="flex flex-row justify-between"> */}
            <View>
              <Text style={AppStyle.StyleOderList.text}>
                Tên:
                {item.wareHouseName}
              </Text>
              <Text style={AppStyle.StyleOderList.text}>
                Địa chỉ:{item.address}
              </Text>
              <Text style={AppStyle.StyleOderList.text}>
                Danh mục: {item.category}
              </Text>
              <Text style={AppStyle.StyleOderList.text}>
                Gia :{item.monney}
              </Text>
              <Text style={AppStyle.StyleOderList.text}>
                Chủ kho:
                {owners[index]}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList data={list} renderItem={renderTodos} />
    </View>
  );
}

const styles = StyleSheet.create({});
