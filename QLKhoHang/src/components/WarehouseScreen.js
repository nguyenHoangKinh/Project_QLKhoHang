import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { uuid } from "react-native-uuid";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AppStyle from '../theme';

const TodoScreen = ({ navigation }) => {
  // Init local states
  const [warehouse, setWarehouse] = useState({});
  const [searchWarehouse, setSearchWarehouse] = useState({});
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    axios
    .get(`https://warehouse-management-api.vercel.app/v1/warehouse/list`,
      {
        headers:
        {
          Authorization: `Bearer ${userInfo.accessToken}`
        },
        params:
        {
          id_owner: userInfo.others._id
        },
      })
    .then((res) => {
      let warehouses = res.data;
      // console.log(warehouses)
      setWarehouse(warehouses);
      setSearchWarehouse(warehouses)
    })
    .catch((e) => {
      console.log(`get warehouse error ${e.res}`);
    });
  }, []);

  // Handle Delete
  const handleDeleteTodo = (id) => {
    axios
      .delete(`https://warehouse-management-api.vercel.app/v1/warehouse/deleteWarehouse/${id}`,
        {
          headers:
          {
            Authorization: `Bearer ${userInfo.accessToken}`
          },
          params:
          {
            id_owner: userInfo.others._id
          },
        })
      .then((res) => {
        console.log(res.data)
        navigation.navigate("Home")
      })
      .catch((e) => {
        console.log(`delete warehouse error ${e.res}`);
      });
  };

  // Render items
  const renderTodos = ({ item, index }) => {
    return (
      <View style={AppStyle.StyleWarehouse.warehouse_view}>
        <TouchableOpacity
          style={AppStyle.StyleWarehouse.name_warehouse}
          onPress={() => navigation.navigate("DetailWarehouseScreem", { idWarehouse: item._id })}>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Tên Kho Hàng: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.wareHouseName}
            </Text>
          </Text>
          <Text style={AppStyle.StyleWarehouse.tittle_warehouse}>
            Loại kho: <></>
            <Text style={AppStyle.StyleWarehouse.name_warehouse}>
              {item.category.name}
            </Text>
          </Text>
        </TouchableOpacity>

        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => {
            navigation.navigate("UpdateWarehouseScreen", { idWarehouse: item._id })
          }}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item._id)}
        />
      </View>
    );
  };

  const handleSearch = (text) => {
    if (text) {
      let searchList = warehouse.filter((searchWarehouse) =>
        searchWarehouse.wareHouseName.toLowerCase().includes(text.toLowerCase())
      );
 
      setSearchWarehouse(searchList)
    } else {
      setSearchWarehouse(warehouse)
    }
  }

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <TextInput
        style={AppStyle.StyleWarehouse.search}
        placeholder="Tìm kiếm"
        // value={userInput}
        onChangeText={(text) => {
          handleSearch(text);
        }}
      />

      <TouchableOpacity
        style={AppStyle.StyleWarehouse.btn_add}
        onPress={() => navigation.navigate("AddWarehouseScreen")}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          Thêm Kho Hàng
        </Text>
      </TouchableOpacity>

      {/* Render todo list */}
      <FlatList data={searchWarehouse} renderItem={renderTodos} />
    </View>
  );
};

export default TodoScreen;