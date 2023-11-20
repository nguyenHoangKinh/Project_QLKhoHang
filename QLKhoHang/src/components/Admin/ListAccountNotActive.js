import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { uuid } from "react-native-uuid";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppStyle from "../../theme";

const TodoScreen = ({ navigation }) => {
  // Init local states
  const [account, setAccount] = useState({});
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://warehouse-management-api.vercel.app/v1/admin/list-account-not-active`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        }
      )
      .then((res) => {
        let account = res.data.accounts;
        setAccount(account);
      })
      .catch((e) => {
        console.log(`get account error ${e.res}`);
      });
  }, []);

  // Render items
  const renderTodos = ({ item, index }) => {
    return (
      <View style={AppStyle.StyleWarehouse.warehouse_view}>
        <TouchableOpacity
          style={AppStyle.StyleWarehouse.name_warehouse}
          onPress={() =>
            navigation.navigate("DetailAcount", { idWarehouse: item._id })
          }
        >
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Tên Tài Khoản: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.username}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Email: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.email}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  //   const handleSearch = (text) => {
  //     if (text) {
  //       let searchList = warehouse.filter((searchWarehouse) =>
  //         searchWarehouse.wareHouseName.toLowerCase().includes(text.toLowerCase())
  //       );

  //       setSearchWarehouse(searchList)
  //     } else {
  //       setSearchWarehouse(warehouse)
  //     }
  //   }

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40, marginBottom: 60 }}>
      <TextInput
        style={AppStyle.StyleWarehouse.search}
        placeholder="Tìm kiếm"
      />
      <></>
      <FlatList
        data={account}
        renderItem={renderTodos}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default TodoScreen;
